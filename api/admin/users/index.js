import { handleAdminUsers } from "../../../lib/api/adminUsers.js";

export default async function handler(req, res) {
  return handleAdminUsers([], req, res);
}

