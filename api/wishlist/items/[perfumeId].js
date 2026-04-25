import { handleWishlist } from "../../../lib/api/wishlist.js";

export default async function handler(req, res) {
  const { perfumeId } = req.query || {};
  const id = Array.isArray(perfumeId) ? perfumeId[0] : perfumeId;
  return await handleWishlist(["items", id], req, res);
}

