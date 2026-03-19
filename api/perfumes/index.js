import { handlePerfumes } from "../../lib/api/perfumes.js";

export default async function handler(req, res) {
  return handlePerfumes([], req, res);
}

