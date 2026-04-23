import { sql } from "../db.js";

export async function handleContact(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });

  try {
    const body = req.body || {};
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Nome, e-mail e mensagem são obrigatórios." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "E-mail inválido." });
    }

    const [row] = await sql`
      INSERT INTO contact_messages (name, email, message)
      VALUES (${name}, ${email}, ${message})
      RETURNING id, created_at
    `;
    return res.status(200).json({ ok: true, id: row?.id, created_at: row?.created_at });
  } catch (err) {
    console.error("POST /api/contact error:", err);
    if (err?.code === "42P01") {
      return res.status(503).json({ error: "Tabela de mensagens não disponível. Execute as migrations." });
    }
    return res.status(500).json({ error: "Erro ao salvar mensagem. Tente novamente mais tarde." });
  }
}

