import { put } from "@vercel/blob";
import { getBearerToken, verifyToken } from "../auth.js";

const MAX_SIZE = 4 * 1024 * 1024; // 4 MB (abaixo do limite de 4.5 MB da Vercel)
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function handleUploadAvatar(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const token = getBearerToken(req);
  const payload = verifyToken(token);
  if (!payload?.userId) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res
      .status(503)
      .json({ error: "Upload não configurado (BLOB_READ_WRITE_TOKEN)" });
  }

  try {
    const body = req.body || {};
    const dataUrl = body.dataUrl || body.image;
    if (!dataUrl || typeof dataUrl !== "string") {
      return res
        .status(400)
        .json({ error: "Envie dataUrl com a imagem em base64" });
    }

    const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      return res.status(400).json({
        error: "Formato inválido. Use data:image/...;base64,...",
      });
    }

    const contentType = match[1].trim().toLowerCase();
    if (!ALLOWED_TYPES.includes(contentType)) {
      return res.status(400).json({
        error: "Tipo de imagem não permitido. Use JPEG, PNG, WebP ou GIF.",
      });
    }

    const base64 = match[2];
    const buffer = Buffer.from(base64, "base64");
    if (buffer.length > MAX_SIZE) {
      return res
        .status(400)
        .json({ error: "Imagem muito grande. Máximo 4 MB." });
    }

    const ext =
      contentType.split("/")[1] === "jpeg"
        ? "jpg"
        : contentType.split("/")[1];
    const pathname = `avatars/${payload.userId}-${Date.now()}.${ext}`;

    const blob = await put(pathname, buffer, {
      access: "public",
      contentType,
      addRandomSuffix: true,
    });

    return res.status(200).json({ url: blob.url });
  } catch (err) {
    console.error("Upload avatar error:", err);
    return res.status(500).json({ error: "Erro ao fazer upload da foto" });
  }
}

