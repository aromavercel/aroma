import { sql } from "../db.js";
import { hashPassword, signToken } from "../auth.js";
import { normalizePhone } from "../phone.js";

export async function handleRegister(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  if (!sql) {
    return res.status(503).json({ error: "Banco de dados não configurado" });
  }

  try {
    const { phone, password, name, email, country } = req.body || {};
    const passwordStr = typeof password === "string" ? password : "";
    const emailTrim =
      typeof email === "string" ? email.trim().toLowerCase() || null : null;
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

    if (passwordStr.length < 6) {
      return res
        .status(400)
        .json({ error: "Senha deve ter no mínimo 6 caracteres" });
    }

    let phoneE164;
    try {
      phoneE164 = normalizePhone(phone, countryCode);
    } catch (err) {
      return res
        .status(400)
        .json({ error: err.message || "Telefone inválido" });
    }

    const existing = await sql`
      SELECT id FROM users WHERE phone = ${phoneE164}
    `;
    if (existing.length > 0) {
      return res.status(409).json({ error: "Este telefone já está em uso" });
    }

    const password_hash = await hashPassword(passwordStr);
    const [user] = await sql`
      INSERT INTO users (phone, password_hash, name, email)
      VALUES (${phoneE164}, ${password_hash}, ${name?.trim() || null}, ${emailTrim})
      RETURNING id, phone, email, name, created_at
    `;

    await sql`
      INSERT INTO carts (user_phone) VALUES (${user.phone})
      ON CONFLICT (user_phone) DO NOTHING
    `;
    await sql`
      INSERT INTO wishlists (user_phone) VALUES (${user.phone})
      ON CONFLICT (user_phone) DO NOTHING
    `;

    const token = signToken({ userId: user.id, phone: user.phone });
    return res.status(201).json({
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email ?? null,
        name: user.name,
        role: "user",
      },
      token,
    });
  } catch (err) {
    if (err?.code === "23505")
      return res
        .status(409)
        .json({ error: "Este telefone já está em uso" });
    console.error("Register error:", err);
    return res.status(500).json({ error: "Erro ao criar conta" });
  }
}

