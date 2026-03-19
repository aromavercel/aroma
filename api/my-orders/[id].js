import { handleMyOrders } from "../../../lib/api/myOrders.js";

export default async function handler(req, res) {
  const { id } = req.query || {};
  const segments = id ? [id] : [];
  return handleMyOrders(segments, req, res);
}

