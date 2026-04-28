import { put } from "@vercel/blob";
import { getBearerToken, verifyToken } from "../auth.js";
import { sql } from "../db.js";

// Base64 aumenta ~33% o tamanho do payload. Mantemos 3MB para evitar 413 na Vercel.
const MAX_SIZE = 3 * 1024 * 1024; // 3 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

async function requireAdmin(req, res) {
  const token = getBearerToken(req);
  const payload = verifyToken(token);
  if (!payload?.userId) {
    res.status(401).json({ error: "Token inválido ou expirado" });
    return null;
  }
  if (!sql) {
    res.status(503).json({ error: "Banco de dados não configurado" });
    return null;
  }
  const rows = await sql`SELECT role FROM users WHERE id = ${payload.userId}`;
  const user = rows?.[0];
  const role = (user?.role || "user").toString().toLowerCase();
  if (role !== "admin") {
    res.status(403).json({ error: "Acesso negado. Apenas administradores." });
    return null;
  }
  return payload;
}

export async function handleUploadPerfumeImage(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const payload = await requireAdmin(req, res);
  if (!payload) return;

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
        .json({ error: "Imagem muito grande. Máximo 3 MB." });
    }

    const ext =
      contentType.split("/")[1] === "jpeg"
        ? "jpg"
        : contentType.split("/")[1];

    const safeName =
      typeof body.filename === "string" && body.filename.trim()
        ? body.filename.trim().slice(0, 80).replace(/[^\w.-]+/g, "-")
        : "perfume";

    const pathname = `perfumes/${safeName}-${Date.now()}.${ext}`;

    // Em produção (Vercel) o Blob Store pode estar configurado como PRIVATE.
    // Nesse caso, "public" falha. Mantemos como "private" e servimos via proxy `/api/perfume-image`.
    const blob = await put(pathname, buffer, {
      access: "private",
      contentType,
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return res.status(200).json({ url: blob.url });
  } catch (err) {
    const status = Number(err?.status || err?.statusCode || 500);
    const code = err?.code ? String(err.code) : "";
    const msg = err?.message ? String(err.message) : "Erro desconhecido";
    console.error("Upload perfume image error:", { status, code, msg, err });
    return res
      .status(Number.isFinite(status) && status >= 400 ? status : 500)
      .json({
        error: `Erro ao fazer upload da imagem${code ? ` (${code})` : ""}: ${msg}`,
      });
  }
}

