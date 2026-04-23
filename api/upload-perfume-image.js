import { handleUploadPerfumeImage } from "../lib/api/uploadPerfumeImage.js";

export default async function handler(req, res) {
  return handleUploadPerfumeImage(req, res);
}

