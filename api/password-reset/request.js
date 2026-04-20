import { handlePasswordResetRequest } from "../../lib/api/passwordResetRequest.js";

export default async function handler(req, res) {
  return handlePasswordResetRequest(req, res);
}

