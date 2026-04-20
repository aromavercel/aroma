import { handleAdminOrders } from "../../../lib/api/adminOrders.js";

export default async function handler(req, res) {
  return handleAdminOrders([], req, res);
}

