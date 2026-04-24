import { sql } from "../db.js";
import { getBearerToken, verifyToken } from "../auth.js";
import { resolveCartsUserPhoneFromCandidates } from "../cartPhoneResolve.js";

/**
 * Resolve usuário autenticado + telefone para carrinho/pedidos (espelha o Express).
 * O telefone do carrinho no banco pode estar em E.164 enquanto users.phone foi salvo só com dígitos;
 * usa candidatos equivalentes para encontrar a linha em carts.
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
  const dbPhone = user.phone != null ? String(user.phone).trim() : "";
  const jwtPhone = payload.phone != null ? String(payload.phone).trim() : "";

  if (!dbPhone && jwtPhone) {
    try {
      await sql`
        UPDATE users SET phone = ${jwtPhone}
        WHERE id = ${user.id} AND (phone IS NULL OR TRIM(phone) = '')
      `;
    } catch {
      // ignora
    }
  }

  const displayForCheck = dbPhone || jwtPhone;
  if (!String(displayForCheck).trim()) {
    res.status(400).json({ error: "Carrinho disponível apenas para usuários com telefone cadastrado" });
    return null;
  }

  const userPhone = await resolveCartsUserPhoneFromCandidates(sql, dbPhone || jwtPhone, jwtPhone);
  if (!userPhone) {
    res.status(400).json({ error: "Carrinho disponível apenas para usuários com telefone cadastrado" });
    return null;
  }

  return { userId: user.id, userPhone };
}
