import { sql } from "../db.js";
import { verifyPassword, signToken } from "../auth.js";
import { normalizePhone } from "../phone.js";

export async function handleLogin(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  if (!sql) {
    return res.status(503).json({ error: "Banco de dados não configurado" });
  }

  try {
    // Garantir body parseado (Vercel pode enviar como objeto ou string)
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }
    body = body || {};
    const phone = body.phone ?? body.telefone;
    const password = body.password;
    const country = body.country;
    const passwordStr = typeof password === "string" ? password : "";
    const countryCode =
      typeof country === "string" && country.trim()
        ? country.trim().toUpperCase().slice(0, 2)
        : "BR";
    const phoneRaw =
      typeof phone === "string" ? phone.trim().replace(/\s/g, "") : "";

    if (!phoneRaw || !passwordStr) {
      return res
        .status(400)
        .json({ error: "Telefone e senha são obrigatórios" });
    }

    let phoneE164;
    try {
      phoneE164 = normalizePhone(phone, countryCode);
    } catch (err) {
      return res
        .status(400)
        .json({ error: err.message || "Telefone inválido" });
    }

    let rows = await sql`
      SELECT id, email, name, phone, password_hash, role FROM users WHERE phone = ${phoneE164}
    `;
    if (rows.length === 0 && phoneRaw !== phoneE164) {
      rows = await sql`
        SELECT id, email, name, phone, password_hash, role FROM users WHERE phone = ${phoneRaw}
      `;
      if (rows.length > 0) {
        await sql`UPDATE users SET phone = ${phoneE164} WHERE id = ${rows[0].id}`;
        await sql`UPDATE carts SET user_phone = ${phoneE164} WHERE user_phone = ${phoneRaw}`;
        await sql`UPDATE wishlists SET user_phone = ${phoneE164} WHERE user_phone = ${phoneRaw}`;
        await sql`
          INSERT INTO carts (user_phone) VALUES (${phoneE164})
          ON CONFLICT (user_phone) DO NOTHING
        `;
        await sql`
          INSERT INTO wishlists (user_phone) VALUES (${phoneE164})
          ON CONFLICT (user_phone) DO NOTHING
        `;
        rows[0].phone = phoneE164;
      }
    }

    if (rows.length === 0) {
      return res.status(401).json({ error: "Telefone ou senha incorretos" });
    }

    const user = rows[0];
    if (!user.password_hash) {
      return res.status(401).json({
        error: "Esta conta usa login com Google ou Facebook.",
      });
    }

    const valid = await verifyPassword(passwordStr, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: "Telefone ou senha incorretos" });
    }

    const token = signToken({ userId: user.id, phone: user.phone ?? phoneE164 });
    return res.status(200).json({
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email ?? null,
        name: user.name,
        role: user.role ?? "user",
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Erro ao fazer login" });
  }
}

