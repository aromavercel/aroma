import { handlePasswordResetConfirm } from "../../lib/api/passwordResetConfirm.js";

export default async function handler(req, res) {
  return handlePasswordResetConfirm(req, res);
}

