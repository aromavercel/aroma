import { sql } from "../db.js";
import { hashResetCode, constantTimeEqualHex } from "../passwordReset.js";
import { hashPassword } from "../auth.js";

function parseBody(req) {
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  return body || {};
}

export async function handlePasswordResetConfirm(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  if (!sql) {
    return res.status(503).json({ error: "Banco de dados não configurado" });
  }

  try {
    const body = parseBody(req);
    const email = body.email ?? body.e_mail;
    const code = body.code ?? body.otp;
    const newPassword = body.newPassword ?? body.password;

    const emailNormalized =
      typeof email === "string" ? email.trim().toLowerCase() : "";

    const codeStr = typeof code === "string" ? code.trim() : String(code ?? "").trim();
    const passwordStr = typeof newPassword === "string" ? newPassword : "";

    if (!emailNormalized) return res.status(400).json({ error: "E-mail é obrigatório" });
    if (!codeStr) return res.status(400).json({ error: "Código é obrigatório" });
    if (!passwordStr) return res.status(400).json({ error: "Nova senha é obrigatória" });
    if (passwordStr.length < 6) {
      return res.status(400).json({ error: "Senha deve ter no mínimo 6 caracteres" });
    }

    // Busca token ativo e não utilizado (apenas pelo e-mail).
    const tokens = await sql`
      SELECT id, token_hash, attempts, user_id
      FROM password_reset_tokens
      WHERE user_email = ${emailNormalized}
        AND used_at IS NULL
        AND expires_at > now()
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (!tokens || tokens.length === 0) {
      return res
        .status(400)
        .json({ error: "Código inválido ou expirado" });
    }

    const token = tokens[0];
    const maxAttempts =
      Number(process.env.PASSWORD_RESET_MAX_ATTEMPTS) || 5;
    const nextAttemptsBase = Number(token.attempts) || 0;

    if (nextAttemptsBase >= maxAttempts) {
      await sql`
        UPDATE password_reset_tokens
        SET used_at = now()
        WHERE id = ${token.id}
      `;
      return res
        .status(400)
        .json({ error: "Código inválido ou expirado" });
    }

    const tokenHashAttempt = hashResetCode(codeStr, emailNormalized);
    const ok = constantTimeEqualHex(tokenHashAttempt, token.token_hash);

    if (!ok) {
      const nextAttempts = nextAttemptsBase + 1;
      if (nextAttempts >= maxAttempts) {
        await sql`
          UPDATE password_reset_tokens
          SET attempts = ${nextAttempts}, used_at = now()
          WHERE id = ${token.id}
        `;
      } else {
        await sql`
          UPDATE password_reset_tokens
          SET attempts = ${nextAttempts}
          WHERE id = ${token.id}
        `;
      }
      return res.status(400).json({ error: "Código inválido ou expirado" });
    }

    // Código válido: atualiza senha do usuário e invalida o token.
    const newHash = await hashPassword(passwordStr);
    await sql`
      UPDATE users
      SET password_hash = ${newHash}, updated_at = now()
      WHERE id = ${token.user_id}
    `;

    await sql`
      UPDATE password_reset_tokens
      SET used_at = now()
      WHERE id = ${token.id}
    `;

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Password reset confirm error:", err);
    return res.status(500).json({ error: "Erro ao redefinir a senha" });
  }
}

