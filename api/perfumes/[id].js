import { handlePerfumes } from "../../lib/api/perfumes.js";

export default async function handler(req, res) {
  const { id } = req.query || {};
  return handlePerfumes([id], req, res);
}

