import { handleContact } from "../lib/api/contact.js";

export default async function handler(req, res) {
  return handleContact(req, res);
}

