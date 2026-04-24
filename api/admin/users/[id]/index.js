import { handleAdminUsers } from "../../../../lib/api/adminUsers.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }
  const raw = req.query?.id;
  const id = Array.isArray(raw) ? raw[0] : raw;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "ID do usuário é obrigatório" });
  }
  return handleAdminUsers([id], req, res);
}
