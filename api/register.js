import { handleRegister } from "../lib/api/register.js";

export default async function handler(req, res) {
  return handleRegister(req, res);
}

