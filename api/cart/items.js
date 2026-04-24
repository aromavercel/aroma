import { handlePostCartItems } from "../../lib/api/cartHandlers.js";

export default async function handler(req, res) {
  return handlePostCartItems(req, res);
}
