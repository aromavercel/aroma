import { handleMe } from "../lib/api/me.js";

export default async function handler(req, res) {
  return handleMe(req, res);
}

