import { handleAdminContactMessages } from "../../../lib/api/adminContactMessages.js";

export default async function handler(req, res) {
  return handleAdminContactMessages([], req, res);
}

