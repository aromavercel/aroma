import { handleSearch } from "../lib/api/search.js";

export default async function handler(req, res) {
  return handleSearch(req, res);
}

