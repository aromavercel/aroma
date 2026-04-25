import { handleWishlist } from "../lib/api/wishlist.js";

export default async function handler(req, res) {
  return await handleWishlist([], req, res);
}

