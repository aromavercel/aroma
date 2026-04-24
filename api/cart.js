import { handleGetCart } from "../lib/api/cartHandlers.js";

export default async function handler(req, res) {
  return handleGetCart(req, res);
}
