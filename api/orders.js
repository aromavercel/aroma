import { handlePostOrders } from "../lib/api/ordersCreate.js";

export default async function handler(req, res) {
  return handlePostOrders(req, res);
}
