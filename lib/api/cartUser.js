import { sql } from "../db.js";
import { getBearerToken, verifyToken } from "../auth.js";

/**
 * Resolve usuário autenticado + telefone para carrinho/pedidos (espelha o Express).
 */
export async function resolveCartUser(req, res) {
  const token = getBearerToken(req);
  const payload = verifyToken(token);
  if (!payload?.userId) {
    res.status(401).json({ error: "Faça login para acessar o carrinho" });
    return null;
  }
  if (!sql) {
    res.status(503).json({ error: "Banco de dados não configurado" });
    return null;
  }
  const [user] = await sql`SELECT id, phone FROM users WHERE id = ${payload.userId}`;
  if (!user) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return null;
  }
  let phone = user.phone != null ? String(user.phone).trim() : "";
  if (!phone && payload.phone) {
    phone = String(payload.phone).trim();
    try {
      await sql`
        UPDATE users SET phone = ${phone}
        WHERE id = ${user.id} AND (phone IS NULL OR TRIM(phone) = '')
      `;
    } catch {
      // ignora
    }
  }
  if (!phone) {
    res.status(400).json({ error: "Carrinho disponível apenas para usuários com telefone cadastrado" });
    return null;
  }
  return { userId: user.id, userPhone: phone };
}
