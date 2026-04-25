import { sql } from "../db.js";
import { normalizePhone } from "../phone.js";

export async function handlePromoAlert(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });

  try {
    const body = req.body || {};
    const rawPhone = typeof body.phone === "string" ? body.phone.trim() : "";
    const country =
      typeof body.country === "string" && body.country.trim()
        ? body.country.trim().toUpperCase().slice(0, 2)
        : "BR";

    if (!rawPhone) {
      return res.status(400).json({ error: "Número de telefone é obrigatório." });
    }

    let phoneE164;
    try {
      phoneE164 = normalizePhone(rawPhone, country);
    } catch (err) {
      return res.status(400).json({ error: err?.message || "Telefone inválido" });
    }

    let userId = null;
    try {
      const [user] = await sql`SELECT id FROM users WHERE phone = ${phoneE164}`;
      if (user) userId = user.id;
    } catch {
      // schema antigo: ignora vínculo com usuário
    }

    const [row] = await sql`
      INSERT INTO promo_alerts (user_phone, user_id)
      VALUES (${phoneE164}, ${userId})
      ON CONFLICT (user_phone)
      DO UPDATE SET
        user_id = COALESCE(promo_alerts.user_id, EXCLUDED.user_id),
        updated_at = now()
      RETURNING id, user_phone, user_id, created_at, updated_at
    `;

    return res.status(200).json({
      ok: true,
      alert: {
        id: row.id,
        phone: row.user_phone,
        user_id: row.user_id ?? null,
        created_at: row.created_at,
        updated_at: row.updated_at,
      },
    });
  } catch (err) {
    console.error("POST /api/promo-alert error:", err);
    return res.status(500).json({ error: "Erro ao registrar alerta de promoções." });
  }
}

