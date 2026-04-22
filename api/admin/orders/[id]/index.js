import { handleAdminOrders } from "../../../../lib/api/adminOrders.js";

export default async function handler(req, res) {
  const { id } = req.query || {};
  const orderId = Array.isArray(id) ? id[0] : id;
  return handleAdminOrders([orderId].filter(Boolean), req, res);
}

