const BLOB_HOST = "blob.vercel-storage.com";

function toError(res, code, msg) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify({ error: msg }));
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET");
    return res.end("Method Not Allowed");
  }

  const rawUrl = typeof req.query?.url === "string" ? req.query.url.trim() : "";
  if (!rawUrl) return toError(res, 400, "Parâmetro url obrigatório");

  let imageUrl;
  try {
    imageUrl = new URL(rawUrl);
  } catch {
    return toError(res, 400, "URL inválida");
  }

  if (
    !imageUrl.hostname.endsWith(BLOB_HOST) &&
    !imageUrl.hostname.includes(BLOB_HOST)
  ) {
    return toError(res, 400, "URL não permitida");
  }

  const token = (process.env.BLOB_READ_WRITE_TOKEN || "").trim();
  try {
    const headers = {
      Accept: "image/*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const imageRes = await fetch(rawUrl, { headers });
    if (!imageRes.ok) {
      res.statusCode = imageRes.status;
      return res.end();
    }

    const contentType = imageRes.headers.get("content-type") || "image/webp";
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=86400");
    const buffer = Buffer.from(await imageRes.arrayBuffer());
    return res.end(buffer);
  } catch (err) {
    console.error("perfume-image proxy error:", err);
    return toError(res, 502, "Erro ao carregar imagem");
  }
}

