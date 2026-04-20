import { handleUploadAvatar } from "../lib/api/uploadAvatar.js";

export default async function handler(req, res) {
  return handleUploadAvatar(req, res);
}

