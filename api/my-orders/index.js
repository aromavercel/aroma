import { handleMyOrders } from "../../lib/api/myOrders.js";

export default async function handler(req, res) {
  // Lista de pedidos do usuário logado
  return handleMyOrders([], req, res);
}

