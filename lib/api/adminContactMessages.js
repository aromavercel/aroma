import { sql } from "../db.js";
import { getBearerToken, verifyToken } from "../auth.js";

async function requireAdmin(req, res) {
  const token = getBearerToken(req);
  const payload = verifyToken(token);
  if (!payload?.userId) {
    res.status(401).json({ error: "Token inválido ou expirado" });
    return null;
  }
  if (!sql) {
    res.status(503).json({ error: "Banco de dados não configurado" });
    return null;
  }
  const rows = await sql`SELECT role FROM users WHERE id = ${payload.userId}`;
  const user = rows?.[0];
  const role = (user?.role || "user").toString().toLowerCase();
  if (role !== "admin") {
    res.status(403).json({ error: "Acesso negado. Apenas administradores." });
    return null;
  }
  return payload;
}

async function handleList(req, res) {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });

  try {
    const limitRaw = typeof req.query?.limit === "string" ? Number(req.query.limit) : 50;
    const offsetRaw = typeof req.query?.offset === "string" ? Number(req.query.offset) : 0;
    const limit = Number.isFinite(limitRaw) ? Math.min(200, Math.max(1, Math.floor(limitRaw))) : 50;
    const offset = Number.isFinite(offsetRaw) ? Math.max(0, Math.floor(offsetRaw)) : 0;

    const rows = await sql`
      SELECT id, name, email, message, created_at
      FROM contact_messages
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
    const [countRow] = await sql`SELECT COUNT(*)::int AS count FROM contact_messages`;
    return res.status(200).json({
      items: (rows || []).map((r) => ({
        id: r.id,
        name: r.name,
        email: r.email,
        message: r.message,
        created_at: r.created_at,
      })),
      total: countRow?.count ?? 0,
      limit,
      offset,
    });
  } catch (err) {
    console.error("GET /api/admin/contact-messages error:", err);
    if (err?.code === "42P01") {
      return res.status(503).json({ error: "Tabela de mensagens não disponível. Execute as migrations." });
    }
    return res.status(500).json({ error: "Erro ao listar mensagens" });
  }
}

export async function handleAdminContactMessages(pathSegments, req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método não permitido" });
  if (pathSegments && pathSegments.length) {
    return res.status(404).json({ error: "Rota não encontrada" });
  }
  return handleList(req, res);
}

