import { sql } from "../db.js";
import { generateOtpCode, hashResetCode } from "../passwordReset.js";
import { sendEmail } from "../email.js";

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

export async function handlePasswordResetRequest(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  if (!sql) {
    return res.status(503).json({ error: "Banco de dados não configurado" });
  }

  try {
    const body = parseBody(req);
    const email = body.email ?? body.e_mail;
    const emailNormalized =
      typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!emailNormalized) {
      return res.status(400).json({ error: "E-mail é obrigatório" });
    }

    // Para não enumerar usuários, a resposta é sempre genérica.
    const responseOk = () => res.status(200).json({ ok: true });

    const rows = await sql`
      SELECT id, email
      FROM users
      WHERE email = ${emailNormalized}
    `;

    if (!rows || rows.length === 0) {
      return responseOk();
    }

    const user = rows[0];
    const userEmail = emailNormalized;

    const cooldownSeconds =
      Number(process.env.PASSWORD_RESET_COOLDOWN_SECONDS) || 60;
    const ttlMinutes = Number(process.env.PASSWORD_RESET_TOKEN_TTL_MINUTES) || 10;

    // Se já existe um token ativo e ainda está no cooldown, não reenviar.
    const active = await sql`
      SELECT id, created_at
      FROM password_reset_tokens
      WHERE user_email = ${userEmail}
        AND used_at IS NULL
        AND expires_at > now()
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (active.length > 0) {
      const createdAtMs = new Date(active[0].created_at).getTime();
      const nowMs = Date.now();
      if (Number.isFinite(createdAtMs) && nowMs - createdAtMs <= cooldownSeconds * 1000) {
        return responseOk();
      }
    }

    // Invalida tokens antigos ativos para este telefone.
    await sql`
      UPDATE password_reset_tokens
      SET used_at = now()
      WHERE user_email = ${userEmail}
        AND used_at IS NULL
        AND expires_at > now()
    `;

    // Gera OTP e salva apenas o hash (nunca o código puro no banco).
    const otpCode = generateOtpCode(6);
    const tokenHash = hashResetCode(otpCode, userEmail);

    const [inserted] = await sql`
      INSERT INTO password_reset_tokens (user_email, user_id, token_hash, expires_at, attempts)
      VALUES (
        ${userEmail},
        ${user.id},
        ${tokenHash},
        now() + (${ttlMinutes} * interval '1 minute'),
        0
      )
      RETURNING id
    `;

    // Envia o OTP por e-mail.
    try {
      await sendEmail({
        to: userEmail,
        subject: "Recuperação de senha - Aroma Expresso",
        text: `Seu código de verificação é ${otpCode}. Ele expira em ${ttlMinutes} minutos.`,
        html: `<p>Seu código de verificação é <strong>${otpCode}</strong>.</p><p>Ele expira em ${ttlMinutes} minutos.</p>`,
      });
    } catch (mailErr) {
      console.error("E-mail send error:", mailErr);
      // Invalida o token para não permitir confirmação sem envio.
      await sql`
        UPDATE password_reset_tokens
        SET used_at = now()
        WHERE id = ${inserted?.id || null}
      `;
      return res.status(503).json({ error: "Não foi possível enviar o e-mail no momento. Tente novamente." });
    }

    return responseOk();
  } catch (err) {
    console.error("Password reset request error:", err);
    return res.status(500).json({ error: "Erro ao solicitar redefinição de senha" });
  }
}

