import { handleMyOrders } from "../../lib/api/myOrders.js";

export default async function handler(req, res) {
  return handleMyOrders([], req, res);
}
