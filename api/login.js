import { handleLogin } from "../lib/api/login.js";

export default async function handler(req, res) {
  return handleLogin(req, res);
}

