import { handleCheckPhone } from "../lib/api/checkPhone.js";

export default async function handler(req, res) {
  return handleCheckPhone(req, res);
}
