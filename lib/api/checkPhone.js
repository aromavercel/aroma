import { sql } from "../db.js";
import { normalizePhone } from "../phone.js";

/** POST /api/check-phone (e /api/auth/check-phone no Express) — indica se já existe usuário com o telefone (E.164). */
export async function handleCheckPhone(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }
  if (!sql) {
    return res.status(503).json({ error: "Banco de dados não configurado" });
  }
  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }
    body = body || {};
    const phone = body.phone;
    const country = body.country;
    const countryCode =
      typeof country === "string" && country.trim()
        ? country.trim().toUpperCase().slice(0, 2)
        : "BR";
    const phoneRaw =
      typeof phone === "string" ? phone.trim().replace(/\s/g, "") : "";
    if (!phoneRaw) {
      return res.status(400).json({ error: "Telefone é obrigatório", exists: false });
    }
    let phoneE164;
    try {
      phoneE164 = normalizePhone(phone, countryCode);
    } catch (err) {
      return res.status(400).json({
        error: err.message || "Telefone inválido",
        exists: false,
      });
    }
    const rows = await sql`SELECT id FROM users WHERE phone = ${phoneE164}`;
    return res.json({ exists: rows.length > 0 });
  } catch (err) {
    console.error("check-phone error:", err);
    return res.status(500).json({ error: "Erro ao verificar telefone" });
  }
}
