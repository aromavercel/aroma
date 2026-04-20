import { handleAdminCheck } from "../lib/api/adminCheck.js";

export default async function handler(req, res) {
  return handleAdminCheck(req, res);
}

