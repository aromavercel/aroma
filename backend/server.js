import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { put } from "@vercel/blob";
import { sql } from "./lib/db.js";
import {
  hashPassword,
  verifyPassword,
  signToken,
  getBearerToken,
  verifyToken,
} from "./lib/auth.js";
import { normalizePhone } from "./lib/phone.js";
import { generateOtpCode, hashResetCode, constantTimeEqualHex } from "../lib/passwordReset.js";

const MAX_AVATAR_SIZE = 4 * 1024 * 1024;
const ALLOWED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
// Base64 aumenta ~33% o tamanho do payload. Mantemos 3MB aqui para evitar 413.
const MAX_PERFUME_IMAGE_SIZE = 3 * 1024 * 1024;
const ALLOWED_PERFUME_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true }));
// Upload via dataURL (base64) precisa de limite maior que o default (~100kb)
app.use(express.json({ limit: "8mb" }));

function getMailTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend Aroma" });
});

app.post("/api/contact", async (req, res) => {
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    const body = req.body || {};
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Nome, e-mail e mensagem são obrigatórios." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "E-mail inválido." });
    }
    const [row] = await sql`
      INSERT INTO contact_messages (name, email, message)
      VALUES (${name}, ${email}, ${message})
      RETURNING id, created_at
    `;
    return res.status(200).json({ ok: true, id: row?.id, created_at: row?.created_at });
  } catch (err) {
    console.error("POST /api/contact error:", err);
    if (err?.code === "42P01") {
      return res.status(503).json({ error: "Tabela de mensagens não disponível. Execute as migrations." });
    }
    return res.status(500).json({ error: "Erro ao salvar mensagem. Tente novamente mais tarde." });
  }
});

app.post("/api/promo-alert", async (req, res) => {
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    const body = req.body || {};
    const rawPhone = typeof body.phone === "string" ? body.phone.trim() : "";
    const country = typeof body.country === "string" && body.country.trim()
      ? body.country.trim().toUpperCase().slice(0, 2)
      : "BR";
    if (!rawPhone) {
      return res.status(400).json({ error: "Número de telefone é obrigatório." });
    }
    let phoneE164;
    try {
      phoneE164 = normalizePhone(rawPhone, country);
    } catch (err) {
      return res.status(400).json({ error: err.message || "Telefone inválido" });
    }

    let userId = null;
    try {
      const [user] = await sql`SELECT id FROM users WHERE phone = ${phoneE164}`;
      if (user) userId = user.id;
    } catch {
      // Se a coluna phone não existir (schema antigo), apenas ignora o vínculo de usuário.
    }

    const [row] = await sql`
      INSERT INTO promo_alerts (user_phone, user_id)
      VALUES (${phoneE164}, ${userId})
      ON CONFLICT (user_phone)
      DO UPDATE SET
        user_id = COALESCE(promo_alerts.user_id, EXCLUDED.user_id),
        updated_at = now()
      RETURNING id, user_phone, user_id, created_at, updated_at
    `;

    return res.status(200).json({
      ok: true,
      alert: {
        id: row.id,
        phone: row.user_phone,
        user_id: row.user_id ?? null,
        created_at: row.created_at,
        updated_at: row.updated_at,
      },
    });
  } catch (err) {
    console.error("POST /api/promo-alert error:", err);
    return res.status(500).json({ error: "Erro ao registrar alerta de promoções." });
  }
});

// Estimativa de entrega Correios (PAC) — envio normal
app.post("/api/shipping-estimate", async (req, res) => {
  try {
    const body = req.body || {};
    const cepDestino = String(body.cep || body.cepDestino || "").replace(/\D/g, "").slice(0, 8);
    if (cepDestino.length < 8) {
      return res.status(400).json({ error: "CEP inválido. Informe 8 dígitos." });
    }
    const cepOrigem = (process.env.CORREIOS_CEP_ORIGEM || "01310100").replace(/\D/g, "").slice(0, 8);
    const pesoKg = (body.peso != null && body.peso !== "") ? String(Math.max(0.1, Number(body.peso) || 1)) : "1";
    let calcularPrecoPrazo;
    try {
      const correios = await import("correios-brasil");
      calcularPrecoPrazo = correios.calcularPrecoPrazo ?? correios.default?.calcularPrecoPrazo;
    } catch (e) {
      console.error("correios-brasil not available:", e.message);
      return res.status(503).json({ error: "Serviço de estimativa de entrega indisponível." });
    }
    if (typeof calcularPrecoPrazo !== "function") {
      return res.status(503).json({ error: "Serviço de estimativa de entrega indisponível." });
    }
    const args = {
      sCepOrigem: cepOrigem,
      sCepDestino: cepDestino,
      nVlPeso: pesoKg,
      nCdFormato: 1,
      nVlComprimento: 20,
      nVlAltura: 20,
      nVlLargura: 20,
      nVlDiametro: 0,
      nCdServico: ["04510"],
    };
    const result = await calcularPrecoPrazo(args);
    const item = Array.isArray(result) ? result[0] : result;
    if (!item) {
      return res.status(400).json({ error: "Não foi possível calcular o prazo para este CEP." });
    }
    const prazoDias = parseInt(item.PrazoEntrega, 10) || 0;
    const valorStr = (item.Valor || "0").replace(",", ".");
    const valor = parseFloat(valorStr) || 0;
    if (prazoDias <= 0 && valor <= 0) {
      const msg = item.MsgErro || "Não foi possível calcular o prazo para este CEP.";
      return res.status(400).json({ error: msg });
    }
    return res.status(200).json({
      servico: "PAC",
      prazoDias,
      valor,
      valorFormatado: `R$ ${valor.toFixed(2).replace(".", ",")}`,
      mensagem: prazoDias > 0
        ? `Entrega em até ${prazoDias} dias úteis`
        : "Consulte o prazo no checkout.",
    });
  } catch (err) {
    console.error("POST /api/shipping-estimate error:", err);
    return res.status(500).json({ error: "Erro ao calcular estimativa de entrega. Tente novamente." });
  }
});

// Proxy de imagens do Blob (evita 403 no browser quando o store é privado)
const BLOB_HOST = "blob.vercel-storage.com";
app.get("/api/perfume-image", async (req, res) => {
  const rawUrl = typeof req.query.url === "string" ? req.query.url.trim() : "";
  if (!rawUrl) return res.status(400).json({ error: "Parâmetro url obrigatório" });
  let imageUrl;
  try {
    imageUrl = new URL(rawUrl);
  } catch {
    return res.status(400).json({ error: "URL inválida" });
  }
  if (!imageUrl.hostname.endsWith(BLOB_HOST) && !imageUrl.hostname.includes(BLOB_HOST)) {
    return res.status(400).json({ error: "URL não permitida" });
  }
  const token = (process.env.BLOB_READ_WRITE_TOKEN || "").trim();
  try {
    const headers = {
      Accept: "image/*",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    const imageRes = await fetch(rawUrl, { headers });
    if (!imageRes.ok) {
      console.warn("Blob fetch failed:", imageRes.status, rawUrl.slice(0, 60));
      return res.status(imageRes.status).sendStatus(imageRes.status);
    }
    const contentType = imageRes.headers.get("content-type") || "image/webp";
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=86400");
    const buffer = Buffer.from(await imageRes.arrayBuffer());
    return res.send(buffer);
  } catch (err) {
    console.error("Perfume image proxy error:", err);
    return res.status(502).json({ error: "Erro ao carregar imagem" });
  }
});

// Normaliza UUID para chave de mapa (evita falha quando driver retorna formato diferente)
function toUuidKey(val) {
  if (val == null) return "";
  const s = String(val).trim().toLowerCase();
  return s.length > 10 ? s : "";
}

// Catálogo de perfumes (do banco) — imagens vêm da tabela perfume_images (perfume_id → url)
// ?catalog=arabe|feminino|normal | ?all=1 (admin: lista todos, inclusive inativos)
// Paginação: ?limit=24&offset=0 (ou ?page=1) | noTotal=1 retorna hasNext e evita COUNT(*)
// Compacto: ?compact=1 evita enviar notes/variants (payload menor)
// Facets: ?facets=1 retorna {brands,total} (para sidebar sem listar tudo)
app.get("/api/perfumes", async (req, res) => {
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    const catalog = typeof req.query.catalog === "string" ? req.query.catalog.trim() : null;
    const facetsOnly = req.query.facets === "1" || req.query.facets === "true";
    const compactOnly = req.query.compact === "1" || req.query.compact === "true";
    const noTotal = req.query.noTotal === "1" || req.query.noTotal === "true";
    const q = typeof req.query.q === "string" ? req.query.q.trim().slice(0, 80) : "";
    const brandKey = typeof req.query.brandKey === "string" ? req.query.brandKey.trim() : "";
    const sort = typeof req.query.sort === "string" ? req.query.sort.trim() : "default";
    const status = typeof req.query.status === "string" ? req.query.status.trim().toLowerCase() : "all";
    const stock = typeof req.query.stock === "string" ? req.query.stock.trim().toLowerCase() : "all";
    const filterActive = status === "active" ? true : status === "inactive" ? false : null;
    const filterOutOfStock = stock === "out_of_stock" ? true : stock === "in_stock" ? false : null;

    const limitRaw = typeof req.query.limit === "string" ? Number(req.query.limit) : (typeof req.query.pageSize === "string" ? Number(req.query.pageSize) : null);
    const offsetRaw = typeof req.query.offset === "string" ? Number(req.query.offset) : null;
    const pageRaw = typeof req.query.page === "string" ? Number(req.query.page) : null;
    const limit = Number.isFinite(limitRaw) ? Math.min(96, Math.max(1, Math.floor(limitRaw))) : null;
    let offset = Number.isFinite(offsetRaw) ? Math.max(0, Math.floor(offsetRaw)) : null;
    if (offset == null && pageRaw != null && limit != null) {
      const page = Math.max(1, Math.floor(pageRaw) || 1);
      offset = (page - 1) * limit;
    }
    const isPaged = limit != null || offset != null || pageRaw != null;

    const allParam = req.query.all === "1" || req.query.all === "true";
    let onlyActive = true;
    if (allParam) {
      const payload = await requireAdmin(req, res);
      if (!payload) return;
      onlyActive = false;
    }

    const filterByCatalog = Boolean(catalog && ["arabe", "feminino", "normal"].includes(catalog));
    const hasQuery = Boolean(q);
    const filterByBrand = Boolean(brandKey);

    if (facetsOnly) {
      // Sidebar: marcas + contagem total (respeita filtros exceto marca)
      const brandsRows = await sql`
        SELECT b.name_key AS key, b.name AS label, COUNT(*)::int AS count
        FROM perfumes p
        LEFT JOIN brands b ON b.id = p.brand_id
        WHERE (${filterByCatalog}::boolean = false OR p.catalog_source = ${catalog})
          AND (${onlyActive}::boolean = false OR COALESCE(p.ativo, true) = true)
          AND (${filterActive}::boolean IS NULL OR COALESCE(p.ativo, true) = ${filterActive})
          AND (${filterOutOfStock}::boolean IS NULL OR COALESCE(p.esgotado, false) = ${filterOutOfStock})
          AND (${hasQuery}::boolean = false OR (
            p.title ILIKE ${"%" + q + "%"}
            OR COALESCE(p.description, '') ILIKE ${"%" + q + "%"}
            OR b.name ILIKE ${"%" + q + "%"}
          ))
          AND b.id IS NOT NULL
        GROUP BY b.name_key, b.name
        ORDER BY b.name
      `;
      const [totalRow] = await sql`
        SELECT COUNT(*)::int AS total
        FROM perfumes p
        LEFT JOIN brands b ON b.id = p.brand_id
        WHERE (${filterByCatalog}::boolean = false OR p.catalog_source = ${catalog})
          AND (${onlyActive}::boolean = false OR COALESCE(p.ativo, true) = true)
          AND (${filterActive}::boolean IS NULL OR COALESCE(p.ativo, true) = ${filterActive})
          AND (${filterOutOfStock}::boolean IS NULL OR COALESCE(p.esgotado, false) = ${filterOutOfStock})
          AND (${hasQuery}::boolean = false OR (
            p.title ILIKE ${"%" + q + "%"}
            OR COALESCE(p.description, '') ILIKE ${"%" + q + "%"}
            OR b.name ILIKE ${"%" + q + "%"}
          ))
      `;
      return res.status(200).json({
        brands: (brandsRows || []).map((r) => ({ key: r.key, label: r.label, count: r.count })),
        total: totalRow?.total ?? 0,
      });
    }

    let rows;
    let total = null;
    const effectiveLimit = isPaged ? (limit ?? 24) : null;
    const effectiveOffset = isPaged ? (offset ?? 0) : null;
    const listLimit = isPaged ? (noTotal ? effectiveLimit + 1 : effectiveLimit) : null;
    // O driver do Neon não suporta bem compor fragments sql`` dentro de outras sql``.
    // Para evitar isso, sempre usamos LIMIT/OFFSET com valores explícitos.
    const finalLimit = isPaged ? listLimit : 5000;
    const finalOffset = isPaged ? effectiveOffset : 0;

    try {
      if (isPaged && !noTotal) {
        const [countRow] = await sql`
          SELECT COUNT(*)::int AS total
          FROM perfumes p
          LEFT JOIN brands b ON b.id = p.brand_id
          WHERE (${filterByCatalog}::boolean = false OR p.catalog_source = ${catalog})
            AND (${onlyActive}::boolean = false OR COALESCE(p.ativo, true) = true)
            AND (${filterActive}::boolean IS NULL OR COALESCE(p.ativo, true) = ${filterActive})
            AND (${filterOutOfStock}::boolean IS NULL OR COALESCE(p.esgotado, false) = ${filterOutOfStock})
            AND (${filterByBrand}::boolean = false OR b.name_key = ${brandKey})
            AND (${hasQuery}::boolean = false OR (
              p.title ILIKE ${"%" + q + "%"}
              OR COALESCE(p.description, '') ILIKE ${"%" + q + "%"}
              OR b.name ILIKE ${"%" + q + "%"}
            ))
        `;
        total = countRow?.total ?? 0;
      }

      const runListQuery = async (isCompact) => {
        // Evita compor fragments (Neon sql tag não suporta bem interpolar sql`` em outros sql``)
        if (sort === "title-asc") {
          return isCompact
            ? await sql`
                SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.image_2_url, p.ativo, p.esgotado,
                       b.name AS brand_name,
                       (
                         SELECT MIN(NULLIF((v->>'price_number')::numeric, 0))
                         FROM jsonb_array_elements(COALESCE(p.variants, '[]'::jsonb)) AS v
                         WHERE (v ? 'price_number') AND (v->>'price_number') ~ '^[0-9]+(\.[0-9]+)?$'
                       ) AS price_min
                FROM perfumes p
                LEFT JOIN brands b ON b.id = p.brand_id
                WHERE (${filterByCatalog}::boolean = false OR p.catalog_source = ${catalog})
                  AND (${onlyActive}::boolean = false OR COALESCE(p.ativo, true) = true)
                  AND (${filterActive}::boolean IS NULL OR COALESCE(p.ativo, true) = ${filterActive})
                  AND (${filterOutOfStock}::boolean IS NULL OR COALESCE(p.esgotado, false) = ${filterOutOfStock})
                  AND (${filterByBrand}::boolean = false OR b.name_key = ${brandKey})
                  AND (${hasQuery}::boolean = false OR (
                    p.title ILIKE ${"%" + q + "%"}
                    OR COALESCE(p.description, '') ILIKE ${"%" + q + "%"}
                    OR b.name ILIKE ${"%" + q + "%"}
                  ))
                ORDER BY p.title ASC
                LIMIT ${finalLimit} OFFSET ${finalOffset}
              `
            : await sql`
                SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants, p.image_2_url, p.ativo, p.esgotado,
                       b.name AS brand_name,
                       (
                         SELECT MIN(NULLIF((v->>'price_number')::numeric, 0))
                         FROM jsonb_array_elements(COALESCE(p.variants, '[]'::jsonb)) AS v
                         WHERE (v ? 'price_number') AND (v->>'price_number') ~ '^[0-9]+(\.[0-9]+)?$'
                       ) AS price_min
                FROM perfumes p
                LEFT JOIN brands b ON b.id = p.brand_id
                WHERE (${filterByCatalog}::boolean = false OR p.catalog_source = ${catalog})
                  AND (${onlyActive}::boolean = false OR COALESCE(p.ativo, true) = true)
                  AND (${filterActive}::boolean IS NULL OR COALESCE(p.ativo, true) = ${filterActive})
                  AND (${filterOutOfStock}::boolean IS NULL OR COALESCE(p.esgotado, false) = ${filterOutOfStock})
                  AND (${filterByBrand}::boolean = false OR b.name_key = ${brandKey})
                  AND (${hasQuery}::boolean = false OR (
                    p.title ILIKE ${"%" + q + "%"}
                    OR COALESCE(p.description, '') ILIKE ${"%" + q + "%"}
                    OR b.name ILIKE ${"%" + q + "%"}
                  ))
                ORDER BY p.title ASC
                LIMIT ${finalLimit} OFFSET ${finalOffset}
              `;
        }
        if (sort === "title-desc") {
          return isCompact
            ? await sql`
                SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.image_2_url, p.ativo, p.esgotado,
                       b.name AS brand_name,
                       (
                         SELECT MIN(NULLIF((v->>'price_number')::numeric, 0))
                         FROM jsonb_array_elements(COALESCE(p.variants, '[]'::jsonb)) AS v
                         WHERE (v ? 'price_number') AND (v->>'price_number') ~ '^[0-9]+(\.[0-9]+)?$'
                       ) AS price_min
                FROM perfumes p
                LEFT JOIN brands b ON b.id = p.brand_id
                WHERE (${filterByCatalog}::boolean = false OR p.catalog_source = ${catalog})
                  AND (${onlyActive}::boolean = false OR COALESCE(p.ativo, true) = true)
                  AND (${filterActive}::boolean IS NULL OR COALESCE(p.ativo, true) = ${filterActive})
                  AND (${filterOutOfStock}::boolean IS NULL OR COALESCE(p.esgotado, false) = ${filterOutOfStock})
                  AND (${filterByBrand}::boolean = false OR b.name_key = ${brandKey})
                  AND (${hasQuery}::boolean = false OR (
                    p.title ILIKE ${"%" + q + "%"}
                    OR COALESCE(p.description, '') ILIKE ${"%" + q + "%"}
                    OR b.name ILIKE ${"%" + q + "%"}
                  ))
                ORDER BY p.title DESC
                LIMIT ${finalLimit} OFFSET ${finalOffset}
              `
            : await sql`
                SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants, p.image_2_url, p.ativo, p.esgotado,
                       b.name AS brand_name,
                       (
                         SELECT MIN(NULLIF((v->>'price_number')::numeric, 0))
                         FROM jsonb_array_elements(COALESCE(p.variants, '[]'::jsonb)) AS v
                         WHERE (v ? 'price_number') AND (v->>'price_number') ~ '^[0-9]+(\.[0-9]+)?$'
                       ) AS price_min
                FROM perfumes p
                LEFT JOIN brands b ON b.id = p.brand_id
                WHERE (${filterByCatalog}::boolean = false OR p.catalog_source = ${catalog})
                  AND (${onlyActive}::boolean = false OR COALESCE(p.ativo, true) = true)
                  AND (${filterActive}::boolean IS NULL OR COALESCE(p.ativo, true) = ${filterActive})
                  AND (${filterOutOfStock}::boolean IS NULL OR COALESCE(p.esgotado, false) = ${filterOutOfStock})
                  AND (${filterByBrand}::boolean = false OR b.name_key = ${brandKey})
                  AND (${hasQuery}::boolean = false OR (
                    p.title ILIKE ${"%" + q + "%"}
                    OR COALESCE(p.description, '') ILIKE ${"%" + q + "%"}
                    OR b.name ILIKE ${"%" + q + "%"}
                  ))
                ORDER BY p.title DESC
                LIMIT ${finalLimit} OFFSET ${finalOffset}
              `;
        }
        if (sort === "price-asc") {
          return isCompact
            ? await sql`
                SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.image_2_url, p.ativo, p.esgotado,
                       b.name AS brand_name,
                       (
                         SELECT MIN(NULLIF((v->>'price_number')::numeric, 0))
                         FROM jsonb_array_elements(COALESCE(p.variants, '[]'::jsonb)) AS v
                         WHERE (v ? 'price_number') AND (v->>'price_number') ~ '^[0-9]+(\.[0-9]+)?$'
                       ) AS price_min
                FROM perfumes p
                LEFT JOIN brands b ON b.id = p.brand_id
                WHERE (${filterByCatalog}::boolean = false OR p.catalog_source = ${catalog})
                  AND (${onlyActive}::boolean = false OR COALESCE(p.ativo, true) = true)
                  AND (${filterActive}::boolean IS NULL OR COALESCE(p.ativo, true) = ${filterActive})
                  AND (${filterOutOfStock}::boolean IS NULL OR COALESCE(p.esgotado, false) = ${filterOutOfStock})
                  AND (${filterByBrand}::boolean = false OR b.name_key = ${brandKey})
                  AND (${hasQuery}::boolean = false OR (
                    p.title ILIKE ${"%" + q + "%"}
                    OR COALESCE(p.description, '') ILIKE ${"%" + q + "%"}
                    OR b.name ILIKE ${"%" + q + "%"}
                  ))
                ORDER BY price_min ASC NULLS LAST, p.title ASC
                LIMIT ${finalLimit} OFFSET ${finalOffset}
              `
            : await sql`
                SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants, p.image_2_url, p.ativo, p.esgotado,
                       b.name AS brand_name,
                       (
                         SELECT MIN(NULLIF((v->>'price_number')::numeric, 0))
                         FROM jsonb_array_elements(COALESCE(p.variants, '[]'::jsonb)) AS v
                         WHERE (v ? 'price_number') AND (v->>'price_number') ~ '^[0-9]+(\.[0-9]+)?$'
                       ) AS price_min
                FROM perfumes p
                LEFT JOIN brands b ON b.id = p.brand_id
                WHERE (${filterByCatalog}::boolean = false OR p.catalog_source = ${catalog})
                  AND (${onlyActive}::boolean = false OR COALESCE(p.ativo, true) = true)
                  AND (${filterActive}::boolean IS NULL OR COALESCE(p.ativo, true) = ${filterActive})
                  AND (${filterOutOfStock}::boolean IS NULL OR COALESCE(p.esgotado, false) = ${filterOutOfStock})
                  AND (${filterByBrand}::boolean = false OR b.name_key = ${brandKey})
                  AND (${hasQuery}::boolean = false OR (
                    p.title ILIKE ${"%" + q + "%"}
                    OR COALESCE(p.description, '') ILIKE ${"%" + q + "%"}
                    OR b.name ILIKE ${"%" + q + "%"}
                  ))
                ORDER BY price_min ASC NULLS LAST, p.title ASC
                LIMIT ${finalLimit} OFFSET ${finalOffset}
              `;
        }
        if (sort === "price-desc") {
          return isCompact
            ? await sql`
                SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.image_2_url, p.ativo, p.esgotado,
                       b.name AS brand_name,
                       (
                         SELECT MIN(NULLIF((v->>'price_number')::numeric, 0))
                         FROM jsonb_array_elements(COALESCE(p.variants, '[]'::jsonb)) AS v
                         WHERE (v ? 'price_number') AND (v->>'price_number') ~ '^[0-9]+(\.[0-9]+)?$'
                       ) AS price_min
                FROM perfumes p
                JOIN brands b ON b.id = p.brand_id
                WHERE (${filterByCatalog}::boolean = false OR p.catalog_source = ${catalog})
                  AND (${onlyActive}::boolean = false OR COALESCE(p.ativo, true) = true)
                  AND (${filterActive}::boolean IS NULL OR COALESCE(p.ativo, true) = ${filterActive})
                  AND (${filterOutOfStock}::boolean IS NULL OR COALESCE(p.esgotado, false) = ${filterOutOfStock})
                  AND (${filterByBrand}::boolean = false OR b.name_key = ${brandKey})
                  AND (${hasQuery}::boolean = false OR (
                    p.title ILIKE ${"%" + q + "%"}
                    OR COALESCE(p.description, '') ILIKE ${"%" + q + "%"}
                    OR b.name ILIKE ${"%" + q + "%"}
                  ))
                ORDER BY price_min DESC NULLS LAST, p.title ASC
                LIMIT ${finalLimit} OFFSET ${finalOffset}
              `
            : await sql`
                SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants, p.image_2_url, p.ativo, p.esgotado,
                       b.name AS brand_name,
                       (
                         SELECT MIN(NULLIF((v->>'price_number')::numeric, 0))
                         FROM jsonb_array_elements(COALESCE(p.variants, '[]'::jsonb)) AS v
                         WHERE (v ? 'price_number') AND (v->>'price_number') ~ '^[0-9]+(\.[0-9]+)?$'
                       ) AS price_min
                FROM perfumes p
                JOIN brands b ON b.id = p.brand_id
                WHERE (${filterByCatalog}::boolean = false OR p.catalog_source = ${catalog})
                  AND (${onlyActive}::boolean = false OR COALESCE(p.ativo, true) = true)
                  AND (${filterActive}::boolean IS NULL OR COALESCE(p.ativo, true) = ${filterActive})
                  AND (${filterOutOfStock}::boolean IS NULL OR COALESCE(p.esgotado, false) = ${filterOutOfStock})
                  AND (${filterByBrand}::boolean = false OR b.name_key = ${brandKey})
                  AND (${hasQuery}::boolean = false OR (
                    p.title ILIKE ${"%" + q + "%"}
                    OR COALESCE(p.description, '') ILIKE ${"%" + q + "%"}
                    OR b.name ILIKE ${"%" + q + "%"}
                  ))
                ORDER BY price_min DESC NULLS LAST, p.title ASC
                LIMIT ${finalLimit} OFFSET ${finalOffset}
              `;
        }
        // default
        return isCompact
          ? await sql`
              SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.image_2_url, p.ativo, p.esgotado,
                     b.name AS brand_name,
                     (
                       SELECT MIN(NULLIF((v->>'price_number')::numeric, 0))
                       FROM jsonb_array_elements(COALESCE(p.variants, '[]'::jsonb)) AS v
                       WHERE (v ? 'price_number') AND (v->>'price_number') ~ '^[0-9]+(\.[0-9]+)?$'
                     ) AS price_min
              FROM perfumes p
              LEFT JOIN brands b ON b.id = p.brand_id
              WHERE (${filterByCatalog}::boolean = false OR p.catalog_source = ${catalog})
                AND (${onlyActive}::boolean = false OR COALESCE(p.ativo, true) = true)
                AND (${filterActive}::boolean IS NULL OR COALESCE(p.ativo, true) = ${filterActive})
                AND (${filterOutOfStock}::boolean IS NULL OR COALESCE(p.esgotado, false) = ${filterOutOfStock})
                AND (${filterByBrand}::boolean = false OR b.name_key = ${brandKey})
                AND (${hasQuery}::boolean = false OR (
                  p.title ILIKE ${"%" + q + "%"}
                  OR COALESCE(p.description, '') ILIKE ${"%" + q + "%"}
                  OR b.name ILIKE ${"%" + q + "%"}
                ))
              ORDER BY p.catalog_source, p.title
              LIMIT ${finalLimit} OFFSET ${finalOffset}
            `
          : await sql`
              SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants, p.image_2_url, p.ativo, p.esgotado,
                     b.name AS brand_name,
                     (
                       SELECT MIN(NULLIF((v->>'price_number')::numeric, 0))
                       FROM jsonb_array_elements(COALESCE(p.variants, '[]'::jsonb)) AS v
                       WHERE (v ? 'price_number') AND (v->>'price_number') ~ '^[0-9]+(\.[0-9]+)?$'
                     ) AS price_min
              FROM perfumes p
              LEFT JOIN brands b ON b.id = p.brand_id
              WHERE (${filterByCatalog}::boolean = false OR p.catalog_source = ${catalog})
                AND (${onlyActive}::boolean = false OR COALESCE(p.ativo, true) = true)
                AND (${filterActive}::boolean IS NULL OR COALESCE(p.ativo, true) = ${filterActive})
                AND (${filterOutOfStock}::boolean IS NULL OR COALESCE(p.esgotado, false) = ${filterOutOfStock})
                AND (${filterByBrand}::boolean = false OR b.name_key = ${brandKey})
                AND (${hasQuery}::boolean = false OR (
                  p.title ILIKE ${"%" + q + "%"}
                  OR COALESCE(p.description, '') ILIKE ${"%" + q + "%"}
                  OR b.name ILIKE ${"%" + q + "%"}
                ))
              ORDER BY p.catalog_source, p.title
              LIMIT ${finalLimit} OFFSET ${finalOffset}
            `;
      };

      rows = await runListQuery(compactOnly);
    } catch (queryErr) {
      // Retrocompatibilidade: se as colunas ativo/esgotado ainda não existem (migration 009 não aplicada),
      // refaz a query sem esses campos e sem filtro de ativo.
      if (queryErr?.code !== "42703") throw queryErr;
      rows = filterByCatalog
        ? await sql`
            SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants, p.image_2_url
            FROM perfumes p
            WHERE p.catalog_source = ${catalog}
            ORDER BY p.title
            LIMIT ${finalLimit} OFFSET ${finalOffset}
          `
        : await sql`
            SELECT id, external_url, title, description, catalog_source, notes, variants, image_2_url
            FROM perfumes
            ORDER BY catalog_source, title
            LIMIT ${finalLimit} OFFSET ${finalOffset}
          `;
      if (isPaged && !noTotal) {
        const [countRow] = await sql`SELECT COUNT(*)::int AS total FROM perfumes`;
        total = countRow?.total ?? 0;
      }
    }

    let hasNext = null;
    let pageRows = rows || [];
    if (isPaged && noTotal) {
      hasNext = pageRows.length > effectiveLimit;
      pageRows = hasNext ? pageRows.slice(0, effectiveLimit) : pageRows;
    }

    const perfumeIds = [...new Set((pageRows || []).map((r) => toUuidKey(r.id)).filter(Boolean))];
    const imagesRows = perfumeIds.length
      ? await sql`
          SELECT perfume_id, url, position
          FROM perfume_images
          WHERE perfume_id = ANY(${perfumeIds})
          ORDER BY perfume_id, position
        `
      : [];
    const imagesByPerfume = new Map();
    for (const img of imagesRows) {
      const pid = toUuidKey(img.perfume_id ?? img.perfumeId);
      if (!pid) continue;
      const url = typeof (img.url ?? img.URL) === "string" ? (img.url ?? img.URL).trim() : "";
      if (!url) continue;
      const list = imagesByPerfume.get(pid) || [];
      const pos = Number(img.position ?? img.Position ?? list.length);
      list.push({ url, position: pos });
      imagesByPerfume.set(pid, list);
    }
    for (const [pid, arr] of imagesByPerfume) {
      arr.sort((a, b) => a.position - b.position);
      imagesByPerfume.set(pid, arr.map((x) => x.url));
    }
    const items = pageRows.map((p) => {
      const perfumeId = toUuidKey(p.id);
      let images = imagesByPerfume.get(perfumeId) ?? [];
      if (images.length === 0) {
        const vars = p.variants ?? [];
        const firstWithImg = vars.find((v) => v && (v.image_url || v.imageUrl));
        const url = firstWithImg && (firstWithImg.image_url ?? firstWithImg.imageUrl);
        if (url) images = [String(url).startsWith("//") ? "https:" + url : url];
      }
      if (images.length === 0 && p.image_2_url) {
        const u = String(p.image_2_url).trim();
        if (u) images = [u.startsWith("//") ? "https:" + u : u];
      }
      return {
        id: p.id,
        url: p.external_url,
        title: p.title,
        description: p.description ?? "",
        catalogSource: p.catalog_source,
        brand: p.brand_name ?? "",
        priceMin: p.price_min != null ? Number(p.price_min) : null,
        notes: compactOnly ? {} : (p.notes ?? {}),
        variants: compactOnly ? [] : (p.variants ?? []),
        images,
        ativo: p.ativo === true || p.ativo == null,
        esgotado: p.esgotado === true,
      };
    });
    if (isPaged) {
      return res.status(200).json({
        items,
        total: noTotal ? null : (total ?? items.length),
        limit: effectiveLimit,
        offset: effectiveOffset,
        hasNext: noTotal ? Boolean(hasNext) : null,
      });
    }
    return res.status(200).json(items);
  } catch (err) {
    console.error("GET /api/perfumes error:", err);
    return res.status(500).json({ error: "Erro ao listar perfumes" });
  }
});

// Busca (página /buscar): top produtos + top marcas + resultados
app.get("/api/search", async (req, res) => {
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    const rawQ = typeof req.query?.q === "string" ? req.query.q.trim() : "";
    const q = rawQ ? rawQ.slice(0, 80) : "";

    const getImagesByPerfumeIds = async (perfumeIds) => {
      if (!perfumeIds.length) return new Map();
      const rows = await sql`
        SELECT perfume_id, url, position
        FROM perfume_images
        WHERE perfume_id = ANY(${perfumeIds})
        ORDER BY perfume_id, position
      `;
      const map = new Map();
      for (const r of rows || []) {
        const pid = toUuidKey(r.perfume_id ?? r.perfumeId);
        if (!pid) continue;
        const url = r.url != null ? String(r.url).trim() : "";
        if (!url) continue;
        const list = map.get(pid) || [];
        list.push(url);
        map.set(pid, list);
      }
      return map;
    };

    const toPerfumeCardRow = (p, imagesByPerfume) => {
      const pid = toUuidKey(p.id);
      let images = imagesByPerfume.get(pid) ?? [];
      if ((!images || images.length === 0) && p.image_2_url) {
        const u = String(p.image_2_url).trim();
        if (u) images = [u.startsWith("//") ? "https:" + u : u];
      }
      return {
        id: pid || String(p.id ?? ""),
        url: p.external_url,
        title: p.title,
        description: p.description ?? "",
        catalogSource: p.catalog_source,
        brand: p.brand_name ?? "",
        notes: p.notes ?? {},
        variants: p.variants ?? [],
        images,
        ativo: p.ativo === true || p.ativo == null,
        esgotado: p.esgotado === true,
      };
    };

    const getTopProducts = async (limit = 4) => {
      try {
        const rows = await sql`
          SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants,
                 p.image_2_url, p.ativo, p.esgotado,
                 b.name AS brand_name,
                 SUM(oi.quantity)::int AS qty
          FROM order_items oi
          JOIN orders o ON o.id = oi.order_id
          JOIN perfumes p ON p.id = oi.perfume_id
          JOIN brands b ON b.id = p.brand_id
          WHERE COALESCE(o.status, '') <> 'canceled'
          GROUP BY p.id, b.name
          ORDER BY qty DESC
          LIMIT ${limit}
        `;
        return rows || [];
      } catch (err) {
        // Se ainda não houver pedidos/tabelas, cai no fallback aleatório
        if (err?.code === "42P01" || err?.code === "42703") return [];
        throw err;
      }
    };

    const getRandomProducts = async (limit = 4, excludeIds = []) => {
      const rows = await sql`
        SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants,
               p.image_2_url, p.ativo, p.esgotado,
               b.name AS brand_name
        FROM perfumes p
        JOIN brands b ON b.id = p.brand_id
        WHERE COALESCE(p.ativo, true) = true
          AND (${excludeIds}::uuid[] IS NULL OR p.id <> ALL(${excludeIds}))
        ORDER BY random()
        LIMIT ${limit}
      `;
      return rows || [];
    };

    const getTopBrands = async (limit = 4) => {
      try {
        const rows = await sql`
          SELECT b.id, b.name, SUM(oi.quantity)::int AS qty
          FROM order_items oi
          JOIN orders o ON o.id = oi.order_id
          JOIN perfumes p ON p.id = oi.perfume_id
          JOIN brands b ON b.id = p.brand_id
          WHERE COALESCE(o.status, '') <> 'canceled'
          GROUP BY b.id, b.name
          ORDER BY qty DESC
          LIMIT ${limit}
        `;
        return rows || [];
      } catch (err) {
        if (err?.code === "42P01" || err?.code === "42703") return [];
        throw err;
      }
    };

    const getRandomBrands = async (limit = 4) => {
      const rows = await sql`
        SELECT id, name
        FROM brands
        ORDER BY random()
        LIMIT ${limit}
      `;
      return rows || [];
    };

    let topProducts = await getTopProducts(4);
    if (topProducts.length < 4) {
      const exclude = topProducts.map((p) => p.id).filter(Boolean);
      const fill = await getRandomProducts(4 - topProducts.length, exclude);
      topProducts = topProducts.concat(fill);
    }

    let topBrands = await getTopBrands(4);
    if (topBrands.length < 4) {
      const fill = await getRandomBrands(4 - topBrands.length);
      topBrands = topBrands.concat(fill);
    }

    let results = [];
    if (q) {
      results = await sql`
        SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants,
               p.image_2_url, p.ativo, p.esgotado,
               b.name AS brand_name
        FROM perfumes p
        JOIN brands b ON b.id = p.brand_id
        WHERE COALESCE(p.ativo, true) = true
          AND (
            p.title ILIKE ${"%" + q + "%"}
            OR COALESCE(p.description, '') ILIKE ${"%" + q + "%"}
            OR b.name ILIKE ${"%" + q + "%"}
          )
        ORDER BY p.title
        LIMIT 48
      `;
    }

    const allForImages = [...topProducts, ...results];
    const ids = [...new Set(allForImages.map((p) => toUuidKey(p.id)).filter(Boolean))];
    const imagesByPerfume = await getImagesByPerfumeIds(ids);

    return res.status(200).json({
      q,
      topBrands: (topBrands || []).map((b) => ({
        id: toUuidKey(b.id) || String(b.id ?? ""),
        name: b.name,
        qty: b.qty ?? null,
      })),
      topProducts: (topProducts || []).map((p) => toPerfumeCardRow(p, imagesByPerfume)),
      results: (results || []).map((p) => toPerfumeCardRow(p, imagesByPerfume)),
    });
  } catch (err) {
    console.error("GET /api/search error:", err);
    if (err?.code === "42P01") {
      return res.status(503).json({ error: "Tabelas não disponíveis. Execute as migrations." });
    }
    return res.status(500).json({ error: "Erro ao carregar busca" });
  }
});

app.get("/api/perfumes/:id", async (req, res) => {
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    const id = req.params.id;
    let p;
    try {
      [p] = await sql`
        SELECT id, external_url, title, description, catalog_source, notes, variants, image_2_url, ativo, esgotado
        FROM perfumes WHERE id = ${id}
      `;
    } catch (queryErr) {
      if (queryErr?.code !== "42703") throw queryErr;
      [p] = await sql`
        SELECT id, external_url, title, description, catalog_source, notes, variants, image_2_url
        FROM perfumes WHERE id = ${id}
      `;
    }
    if (!p) return res.status(404).json({ error: "Perfume não encontrado" });
    const isActive = p.ativo === true || p.ativo == null;
    if (!isActive) {
      const payload = await requireAdmin(req, res);
      if (!payload) return res.status(404).json({ error: "Perfume não encontrado" });
    }
    const imgRows = await sql`
      SELECT url, position FROM perfume_images WHERE perfume_id = ${id} ORDER BY position
    `;
    let images = (imgRows || []).map((i) => (i.url != null ? String(i.url).trim() : "")).filter(Boolean);
    if (images.length === 0) {
      const vars = p.variants ?? [];
      const firstWithImg = vars.find((v) => v && (v.image_url || v.imageUrl));
      const url = firstWithImg && (firstWithImg.image_url ?? firstWithImg.imageUrl);
      if (url) images = [String(url).startsWith("//") ? "https:" + url : url];
    }
    if (images.length === 0 && p.image_2_url) {
      const u = String(p.image_2_url).trim();
      if (u) images = [u.startsWith("//") ? "https:" + u : u];
    }
    return res.status(200).json({
      id: p.id,
      url: p.external_url,
      title: p.title,
      description: p.description ?? "",
      catalogSource: p.catalog_source,
      notes: p.notes ?? {},
      variants: p.variants ?? [],
      images,
      ativo: p.ativo === true || p.ativo == null,
      esgotado: p.esgotado === true,
    });
  } catch (err) {
    console.error("GET /api/perfumes/:id error:", err);
    return res.status(500).json({ error: "Erro ao buscar perfume" });
  }
});

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
  if (!user) {
    res.status(403).json({ error: "Usuário não encontrado" });
    return null;
  }
  const role = (user.role || "user").toString().toLowerCase();
  if (role !== "admin") {
    res.status(403).json({ error: "Acesso negado. Apenas administradores." });
    return null;
  }
  return payload;
}

function normalizeBrandKey(name) {
  return String(name || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function extractBrandFromTitle(title) {
  const t = String(title || "").trim();
  if (!t) return { name: "Sem marca", key: "sem marca" };
  const dashIdx = t.indexOf("-");
  let brand = dashIdx > 0 ? t.slice(0, dashIdx) : t.split(/\s+/)[0];
  brand = String(brand || "").trim();
  if (!brand) brand = "Sem marca";
  const key = normalizeBrandKey(brand);
  return { name: brand, key: key || "sem marca" };
}

async function upsertBrandIdByTitle(title) {
  const brand = extractBrandFromTitle(title);
  const [row] = await sql`
    INSERT INTO brands (name, name_key)
    VALUES (${brand.name}, ${brand.key})
    ON CONFLICT (name_key) DO UPDATE SET name = EXCLUDED.name
    RETURNING id
  `;
  return row?.id ?? null;
}

app.post("/api/perfumes", async (req, res) => {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    const body = req.body || {};
    const title = typeof body.title === "string" ? body.title.trim() : "";
    let externalUrl = typeof body.external_url === "string" ? body.external_url.trim() : (typeof body.url === "string" ? body.url.trim() : "");
    const catalogSource = typeof body.catalog_source === "string" ? body.catalog_source.trim() : "";
    if (!title) return res.status(400).json({ error: "Título é obrigatório" });
    if (!externalUrl) externalUrl = null;
    if (!["arabe", "feminino", "normal"].includes(catalogSource)) {
      return res.status(400).json({ error: "Catálogo deve ser: arabe, feminino ou normal" });
    }
    const description = typeof body.description === "string" ? body.description.trim() || null : null;
    const notes = body.notes && typeof body.notes === "object" ? body.notes : {};
    const variants = Array.isArray(body.variants) ? body.variants : [];
    const rawImages = Array.isArray(body.images) ? body.images : [];
    const images = rawImages.map((u) => (typeof u === "string" ? u.trim() : "")).filter(Boolean);
    const ativo = body.ativo !== false && body.ativo !== "false";
    const esgotado = body.esgotado === true || body.esgotado === "true";

    const brandId = await upsertBrandIdByTitle(title);
    if (!brandId) return res.status(500).json({ error: "Erro ao definir marca" });

    const [inserted] = await sql`
      INSERT INTO perfumes (brand_id, external_url, title, description, catalog_source, notes, variants, ativo, esgotado)
      VALUES (${brandId}, ${externalUrl}, ${title}, ${description}, ${catalogSource}, ${JSON.stringify(notes)}, ${JSON.stringify(variants)}, ${ativo}, ${esgotado})
      RETURNING id, external_url, title, description, catalog_source, notes, variants, ativo, esgotado
    `;
    if (!inserted) return res.status(500).json({ error: "Erro ao criar perfume" });
    const perfumeId = inserted.id;
    for (let i = 0; i < images.length; i++) {
      await sql`INSERT INTO perfume_images (perfume_id, url, position) VALUES (${perfumeId}, ${images[i]}, ${i})`;
    }
    const imgRows = await sql`SELECT url, position FROM perfume_images WHERE perfume_id = ${perfumeId} ORDER BY position`;
    const imagesList = (imgRows || []).map((i) => (i.url != null ? String(i.url).trim() : "")).filter(Boolean);
    return res.status(201).json({
      id: inserted.id,
      url: inserted.external_url,
      title: inserted.title,
      description: inserted.description ?? "",
      catalogSource: inserted.catalog_source,
      notes: inserted.notes ?? {},
      variants: inserted.variants ?? [],
      images: imagesList,
      ativo: inserted.ativo !== false,
      esgotado: inserted.esgotado === true,
    });
  } catch (err) {
    if (err?.code === "23505") return res.status(409).json({ error: "Já existe um perfume com esta URL externa" });
    console.error("POST /api/perfumes error:", err);
    return res.status(500).json({ error: "Erro ao criar perfume" });
  }
});

app.put("/api/perfumes/:id", async (req, res) => {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    const id = req.params.id;
    const [existing] = await sql`SELECT id FROM perfumes WHERE id = ${id}`;
    if (!existing) return res.status(404).json({ error: "Perfume não encontrado" });
    const body = req.body || {};
    const title = typeof body.title === "string" ? body.title.trim() : "";
    let externalUrl = typeof body.external_url === "string" ? body.external_url.trim() : (typeof body.url === "string" ? body.url.trim() : "");
    const catalogSource = typeof body.catalog_source === "string" ? body.catalog_source.trim() : "";
    if (!title) return res.status(400).json({ error: "Título é obrigatório" });
    if (!externalUrl) externalUrl = null;
    if (!["arabe", "feminino", "normal"].includes(catalogSource)) {
      return res.status(400).json({ error: "Catálogo deve ser: arabe, feminino ou normal" });
    }
    const description = typeof body.description === "string" ? body.description.trim() || null : null;
    const notes = body.notes && typeof body.notes === "object" ? body.notes : {};
    const variants = Array.isArray(body.variants) ? body.variants : [];
    const rawImagesPut = Array.isArray(body.images) ? body.images : [];
    const images = rawImagesPut.map((u) => (typeof u === "string" ? u.trim() : "")).filter(Boolean);
    const ativo = body.ativo !== false && body.ativo !== "false";
    const esgotado = body.esgotado === true || body.esgotado === "true";

    const brandId = await upsertBrandIdByTitle(title);
    if (!brandId) return res.status(500).json({ error: "Erro ao definir marca" });

    await sql`
      UPDATE perfumes
      SET brand_id = ${brandId}, external_url = ${externalUrl}, title = ${title}, description = ${description}, catalog_source = ${catalogSource}, notes = ${JSON.stringify(notes)}, variants = ${JSON.stringify(variants)}, ativo = ${ativo}, esgotado = ${esgotado}, updated_at = now()
      WHERE id = ${id}
    `;
    await sql`DELETE FROM perfume_images WHERE perfume_id = ${id}`;
    for (let i = 0; i < images.length; i++) {
      await sql`INSERT INTO perfume_images (perfume_id, url, position) VALUES (${id}, ${images[i]}, ${i})`;
    }
    const [p] = await sql`SELECT id, external_url, title, description, catalog_source, notes, variants, ativo, esgotado FROM perfumes WHERE id = ${id}`;
    const imgRows = await sql`SELECT url, position FROM perfume_images WHERE perfume_id = ${id} ORDER BY position`;
    const imagesList = (imgRows || []).map((i) => (i.url != null ? String(i.url).trim() : "")).filter(Boolean);
    return res.status(200).json({
      id: p.id,
      url: p.external_url,
      title: p.title,
      description: p.description ?? "",
      catalogSource: p.catalog_source,
      notes: p.notes ?? {},
      variants: p.variants ?? [],
      images: imagesList,
      ativo: p.ativo !== false,
      esgotado: p.esgotado === true,
    });
  } catch (err) {
    if (err?.code === "23505") return res.status(409).json({ error: "Já existe um perfume com esta URL externa" });
    console.error("PUT /api/perfumes/:id error:", err);
    return res.status(500).json({ error: "Erro ao atualizar perfume" });
  }
});

app.delete("/api/perfumes/:id", async (req, res) => {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    const id = req.params.id;
    const [existing] = await sql`SELECT id FROM perfumes WHERE id = ${id}`;
    if (!existing) return res.status(404).json({ error: "Perfume não encontrado" });
    await sql`DELETE FROM perfume_images WHERE perfume_id = ${id}`;
    await sql`DELETE FROM perfumes WHERE id = ${id}`;
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/perfumes/:id error:", err);
    return res.status(500).json({ error: "Erro ao excluir perfume" });
  }
});

app.get("/api/admin/users", async (req, res) => {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    let rows;
    try {
      rows = await sql`
        SELECT id, email, name, phone, role, created_at, updated_at, last_activity_at
        FROM users ORDER BY created_at DESC
      `;
    } catch (schemaErr) {
      if (schemaErr?.code !== "42703") throw schemaErr;
      rows = await sql`
        SELECT id, email, name, phone, role, created_at, updated_at
        FROM users ORDER BY created_at DESC
      `;
    }
    const list = (rows || []).map((u) => ({
      id: u.id,
      email: u.email ?? null,
      phone: u.phone ?? null,
      name: u.name ?? null,
      role: u.role ?? "user",
      created_at: u.created_at,
      updated_at: u.updated_at ?? u.created_at,
      last_activity_at: u.last_activity_at ?? u.updated_at ?? u.created_at,
    }));
    return res.status(200).json(list);
  } catch (err) {
    console.error("GET /api/admin/users error:", err);
    return res.status(500).json({ error: "Erro ao listar usuários" });
  }
});

app.get("/api/admin/orders", async (req, res) => {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    const statusParam =
      typeof req.query.status === "string"
        ? req.query.status.trim().toLowerCase()
        : "";
    const allowedStatus = ["pending", "confirmed", "shipped", "completed", "canceled"];
    const hasFilter =
      statusParam && statusParam !== "all" && allowedStatus.includes(statusParam);

    let rows;
    if (hasFilter) {
      rows = await sql`
        SELECT o.id,
               o.user_id,
               o.user_phone,
               o.status,
               o.total,
               o.created_at,
               o.updated_at,
               u.name  AS customer_name,
               u.email AS customer_email
        FROM orders o
        LEFT JOIN users u ON u.id = o.user_id
        WHERE o.status = ${statusParam}
        ORDER BY o.created_at DESC
      `;
    } else {
      rows = await sql`
        SELECT o.id,
               o.user_id,
               o.user_phone,
               o.status,
               o.total,
               o.created_at,
               o.updated_at,
               u.name  AS customer_name,
               u.email AS customer_email
        FROM orders o
        LEFT JOIN users u ON u.id = o.user_id
        ORDER BY o.created_at DESC
      `;
    }

    const list = (rows || []).map((o) => ({
      id: o.id,
      status: o.status,
      total: Number(o.total || 0),
      created_at: o.created_at,
      updated_at: o.updated_at,
      user_id: o.user_id ?? null,
      customer_name: o.customer_name ?? null,
      customer_email: o.customer_email ?? null,
      customer_phone: o.user_phone ?? null,
    }));

    return res.status(200).json(list);
  } catch (err) {
    console.error("GET /api/admin/orders error:", err);
    return res.status(500).json({ error: "Erro ao listar pedidos" });
  }
});

app.patch("/api/admin/orders/:id/status", async (req, res) => {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID do pedido é obrigatório" });

    const allowedStatus = ["pending", "confirmed", "shipped", "completed", "canceled"];
    const body = req.body || {};
    const status =
      typeof body.status === "string"
        ? body.status.trim().toLowerCase()
        : "";

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        error:
          "Status inválido. Use: pending, confirmed, shipped, completed ou canceled.",
      });
    }

    const [existing] =
      await sql`SELECT id FROM orders WHERE id = ${id}`;
    if (!existing) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    const [updated] = await sql`
      UPDATE orders
      SET status = ${status}, updated_at = now()
      WHERE id = ${id}
      RETURNING id, user_id, user_phone, status, total, created_at, updated_at
    `;
    if (!updated) {
      return res.status(500).json({ error: "Erro ao atualizar pedido" });
    }

    return res.status(200).json({
      id: updated.id,
      status: updated.status,
      total: Number(updated.total || 0),
      created_at: updated.created_at,
      updated_at: updated.updated_at,
      user_id: updated.user_id ?? null,
      customer_name: null,
      customer_email: null,
      customer_phone: updated.user_phone ?? null,
    });
  } catch (err) {
    console.error("PATCH /api/admin/orders/:id/status error:", err);
    return res.status(500).json({ error: "Erro ao atualizar status do pedido" });
  }
});

app.get("/api/admin/orders/:id", async (req, res) => {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID do pedido é obrigatório" });

    const [order] = await sql`
      SELECT o.id,
             o.user_id,
             o.user_phone,
             o.status,
             o.subtotal,
             o.discount,
             o.shipping,
             o.tax,
             o.total,
             o.shipping_name,
             o.shipping_address,
             o.shipping_complement,
             o.shipping_city,
             o.shipping_state,
             o.shipping_zipcode,
             o.shipping_country,
             o.shipping_phone,
             o.payment_method,
             o.created_at,
             o.updated_at,
             u.name  AS customer_name,
             u.email AS customer_email
      FROM orders o
      LEFT JOIN users u ON u.id = o.user_id
      WHERE o.id = ${id}
    `;
    if (!order) return res.status(404).json({ error: "Pedido não encontrado" });

    let items;
    try {
      items = await sql`
        SELECT id, order_id, perfume_id, title, quantity, unit_price, total_price
        FROM order_items
        WHERE order_id = ${id}
        ORDER BY title
      `;
    } catch (itemsErr) {
      if (itemsErr?.code !== "42703") throw itemsErr;
      items = await sql`
        SELECT id, order_id, perfume_id, title, quantity
        FROM order_items
        WHERE order_id = ${id}
        ORDER BY title
      `;
    }

    return res.status(200).json({
      order: {
        id: order.id,
        status: order.status,
        subtotal: Number(order.subtotal || 0),
        discount: Number(order.discount || 0),
        shipping: Number(order.shipping || 0),
        tax: Number(order.tax || 0),
        total: Number(order.total || 0),
        shipping_name: order.shipping_name ?? null,
        shipping_address: order.shipping_address ?? null,
        shipping_complement: order.shipping_complement ?? null,
        shipping_city: order.shipping_city ?? null,
        shipping_state: order.shipping_state ?? null,
        shipping_zipcode: order.shipping_zipcode ?? null,
        shipping_country: order.shipping_country ?? null,
        shipping_phone: order.shipping_phone ?? null,
        payment_method: order.payment_method ?? null,
        created_at: order.created_at,
        updated_at: order.updated_at,
        user_id: order.user_id ?? null,
        customer_name: order.customer_name ?? null,
        customer_email: order.customer_email ?? null,
        customer_phone: order.user_phone ?? null,
      },
      items: (items || []).map((i) => ({
        id: i.id,
        perfume_id: i.perfume_id,
        title: i.title,
        quantity: Number(i.quantity || 0),
        unit_price: Number(i.unit_price || 0),
        total_price: Number(i.total_price || 0),
      })),
    });
  } catch (err) {
    console.error("GET /api/admin/orders/:id error:", err);
    return res.status(500).json({ error: "Erro ao buscar pedido" });
  }
});

app.get("/api/admin/access-info", async (req, res) => {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  const proto = req.get("x-forwarded-proto") || req.protocol || "http";
  const host = req.get("x-forwarded-host") || req.get("host") || "";
  const baseUrl = host ? `${proto}://${host}` : "";
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
  return res.status(200).json({
    deployment_url: vercelUrl || baseUrl || null,
    api_url: baseUrl ? `${baseUrl}/api` : null,
    note: "Dados de deploy e variáveis sensíveis estão no dashboard da Vercel (Project Settings > Environment Variables).",
  });
});

app.get("/api/admin/users/:id", async (req, res) => {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "ID do usuário é obrigatório" });
  try {
    let rows;
    try {
      rows = await sql`
        SELECT id, email, name, avatar_url, birth_date, city, state, country,
               phone, role, created_at, updated_at, last_activity_at
        FROM users WHERE id = ${id}
      `;
    } catch (schemaErr) {
      if (schemaErr?.code !== "42703") throw schemaErr;
      rows = await sql`
        SELECT id, email, name, created_at, updated_at
        FROM users WHERE id = ${id}
      `;
      if (rows.length > 0) {
        rows[0].avatar_url = null;
        rows[0].birth_date = null;
        rows[0].city = null;
        rows[0].state = null;
        rows[0].country = null;
        rows[0].phone = null;
        rows[0].role = "user";
        rows[0].last_activity_at = rows[0].updated_at;
      }
    }
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    const u = rows[0];
    return res.status(200).json({
      user: {
        id: u.id,
        email: u.email ?? null,
        name: u.name ?? null,
        avatar_url: u.avatar_url ?? null,
        birth_date: u.birth_date ?? null,
        city: u.city ?? null,
        state: u.state ?? null,
        country: u.country ?? null,
        phone: u.phone ?? null,
        role: u.role ?? "user",
        created_at: u.created_at,
        updated_at: u.updated_at ?? u.created_at,
        last_activity_at: u.last_activity_at ?? u.updated_at ?? u.created_at,
      },
    });
  } catch (err) {
    console.error("GET /api/admin/users/:id error:", err);
    return res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

app.get("/api/admin/contact-messages", async (req, res) => {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    const limitRaw = typeof req.query?.limit === "string" ? Number(req.query.limit) : 50;
    const offsetRaw = typeof req.query?.offset === "string" ? Number(req.query.offset) : 0;
    const limit = Number.isFinite(limitRaw) ? Math.min(200, Math.max(1, Math.floor(limitRaw))) : 50;
    const offset = Number.isFinite(offsetRaw) ? Math.max(0, Math.floor(offsetRaw)) : 0;

    const rows = await sql`
      SELECT id, name, email, message, created_at
      FROM contact_messages
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
    const [countRow] = await sql`SELECT COUNT(*)::int AS count FROM contact_messages`;
    return res.status(200).json({
      items: (rows || []).map((r) => ({
        id: r.id,
        name: r.name,
        email: r.email,
        message: r.message,
        created_at: r.created_at,
      })),
      total: countRow?.count ?? 0,
      limit,
      offset,
    });
  } catch (err) {
    console.error("GET /api/admin/contact-messages error:", err);
    if (err?.code === "42P01") {
      return res.status(503).json({ error: "Tabela de mensagens não disponível. Execute as migrations." });
    }
    return res.status(500).json({ error: "Erro ao listar mensagens" });
  }
});

app.post("/api/admin/users/:id/make-admin", async (req, res) => {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "ID do usuário é obrigatório" });
  try {
    const [current] = await sql`
      SELECT id, role FROM users WHERE id = ${id}
    `;
    if (!current) return res.status(404).json({ error: "Usuário não encontrado" });
    const currentRole = (current.role || "user").toString().toLowerCase();
    if (currentRole === "admin") {
      return res.status(200).json({ ok: true, id, role: "admin", changed: false });
    }
    await sql`
      UPDATE users
      SET role = 'admin', updated_at = now()
      WHERE id = ${id}
    `;
    return res.status(200).json({ ok: true, id, role: "admin", changed: true });
  } catch (err) {
    console.error("POST /api/admin/users/:id/make-admin error:", err);
    return res.status(500).json({ error: "Erro ao tornar usuário administrador" });
  }
});

function oauthCallbackBase(req) {
  const proto = req.get("x-forwarded-proto") || req.protocol || "http";
  const host = req.get("x-forwarded-host") || req.get("host") || "";
  return host ? `${proto}://${host}` : process.env.OAUTH_CALLBACK_BASE || "";
}

app.get("/api/auth-google", (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const base = oauthCallbackBase(req);
  if (!clientId || !base) {
    return res.status(503).json({ error: "Login com Google não configurado." });
  }
  const redirectUri = `${base}/api/auth-google-callback`;
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "email profile");
  res.redirect(302, url.toString());
});

app.get("/api/auth-google-callback", async (req, res) => {
  const code = typeof req.query?.code === "string" ? req.query.code.trim() : "";
  const frontendUrl = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");
  if (!code) return res.redirect(302, `${frontendUrl}?auth_error=missing_code`);
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const base = oauthCallbackBase(req);
  const redirectUri = `${base}/api/auth-google-callback`;
  if (!clientId || !clientSecret || !sql) return res.redirect(302, `${frontendUrl}?auth_error=config`);
  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: "authorization_code" }),
    });
    const tokenData = await tokenRes.json().catch(() => ({}));
    const accessToken = tokenData.access_token;
    if (!accessToken) return res.redirect(302, `${frontendUrl}?auth_error=token`);
    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", { headers: { Authorization: `Bearer ${accessToken}` } });
    const profile = await userRes.json().catch(() => ({}));
    const email = (profile.email || "").trim().toLowerCase();
    const name = (profile.name || "").trim() || null;
    if (!email) return res.redirect(302, `${frontendUrl}?auth_error=no_email`);
    let rows = await sql`SELECT id, email, name, role FROM users WHERE email = ${email}`;
    let user = rows[0];
    if (!user) {
      const [inserted] = await sql`INSERT INTO users (email, password_hash, name) VALUES (${email}, NULL, ${name}) RETURNING id, email, name, role`;
      user = inserted;
    }
    const token = signToken({ userId: user.id, email: user.email });
    res.redirect(302, `${frontendUrl}${frontendUrl.includes("?") ? "&" : "?"}token=${encodeURIComponent(token)}`);
  } catch (err) {
    console.error("Google callback error:", err);
    res.redirect(302, `${frontendUrl}?auth_error=server`);
  }
});

app.get("/api/auth-facebook", (req, res) => {
  const appId = process.env.FACEBOOK_APP_ID;
  const base = oauthCallbackBase(req);
  if (!appId || !base) {
    return res.status(503).json({ error: "Login com Facebook não configurado." });
  }
  const redirectUri = `${base}/api/auth-facebook-callback`;
  const url = new URL("https://www.facebook.com/v21.0/dialog/oauth");
  url.searchParams.set("client_id", appId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", "email,public_profile");
  url.searchParams.set("response_type", "code");
  res.redirect(302, url.toString());
});

app.get("/api/auth-facebook-callback", async (req, res) => {
  const code = typeof req.query?.code === "string" ? req.query.code.trim() : "";
  const frontendUrl = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");
  if (!code) return res.redirect(302, `${frontendUrl}?auth_error=missing_code`);
  const appId = process.env.FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;
  const base = oauthCallbackBase(req);
  const redirectUri = `${base}/api/auth-facebook-callback`;
  if (!appId || !appSecret || !sql) return res.redirect(302, `${frontendUrl}?auth_error=config`);
  try {
    const tokenUrl = new URL("https://graph.facebook.com/v21.0/oauth/access_token");
    tokenUrl.searchParams.set("client_id", appId);
    tokenUrl.searchParams.set("client_secret", appSecret);
    tokenUrl.searchParams.set("redirect_uri", redirectUri);
    tokenUrl.searchParams.set("code", code);
    const tokenRes = await fetch(tokenUrl.toString());
    const tokenData = await tokenRes.json().catch(() => ({}));
    const accessToken = tokenData.access_token;
    if (!accessToken) return res.redirect(302, `${frontendUrl}?auth_error=token`);
    const userUrl = new URL("https://graph.facebook.com/me");
    userUrl.searchParams.set("fields", "id,email,name");
    userUrl.searchParams.set("access_token", accessToken);
    const userRes = await fetch(userUrl.toString());
    const profile = await userRes.json().catch(() => ({}));
    const email = (profile.email || "").trim().toLowerCase();
    const name = (profile.name || "").trim() || null;
    if (!email) return res.redirect(302, `${frontendUrl}?auth_error=no_email`);
    let rows = await sql`SELECT id, email, name, role FROM users WHERE email = ${email}`;
    let user = rows[0];
    if (!user) {
      const [inserted] = await sql`INSERT INTO users (email, password_hash, name) VALUES (${email}, NULL, ${name}) RETURNING id, email, name, role`;
      user = inserted;
    }
    const token = signToken({ userId: user.id, email: user.email });
    res.redirect(302, `${frontendUrl}${frontendUrl.includes("?") ? "&" : "?"}token=${encodeURIComponent(token)}`);
  } catch (err) {
    console.error("Facebook callback error:", err);
    res.redirect(302, `${frontendUrl}?auth_error=server`);
  }
});

app.post("/api/auth/check-phone", async (req, res) => {
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    const { phone, country } = req.body || {};
    const countryCode =
      typeof country === "string" && country.trim() ? country.trim().toUpperCase().slice(0, 2) : "BR";
    const phoneRaw = typeof phone === "string" ? phone.trim().replace(/\s/g, "") : "";
    if (!phoneRaw) {
      return res.status(400).json({ error: "Telefone é obrigatório", exists: false });
    }
    let phoneE164;
    try {
      phoneE164 = normalizePhone(phone, countryCode);
    } catch (err) {
      return res.status(400).json({ error: err.message || "Telefone inválido", exists: false });
    }
    const rows = await sql`SELECT id FROM users WHERE phone = ${phoneE164}`;
    return res.json({ exists: rows.length > 0 });
  } catch (err) {
    console.error("check-phone error:", err);
    return res.status(500).json({ error: "Erro ao verificar telefone" });
  }
});

app.post("/api/register", async (req, res) => {
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    const { phone, password, name, email, country } = req.body || {};
    const passwordStr = typeof password === "string" ? password : "";
    const emailTrim = typeof email === "string" ? email.trim().toLowerCase() || null : null;
    const countryCode = typeof country === "string" && country.trim() ? country.trim().toUpperCase().slice(0, 2) : "BR";
    if (!phone || !passwordStr) {
      return res.status(400).json({ error: "Telefone e senha são obrigatórios" });
    }
    if (passwordStr.length < 6) {
      return res.status(400).json({ error: "Senha deve ter no mínimo 6 caracteres" });
    }
    let phoneE164;
    try {
      phoneE164 = normalizePhone(phone, countryCode);
    } catch (err) {
      return res.status(400).json({ error: err.message || "Telefone inválido" });
    }
    const existing = await sql`SELECT id FROM users WHERE phone = ${phoneE164}`;
    if (existing.length > 0) {
      return res.status(409).json({ error: "Este telefone já está em uso" });
    }
    const password_hash = await hashPassword(passwordStr);
    const [user] = await sql`
      INSERT INTO users (phone, password_hash, name, email)
      VALUES (${phoneE164}, ${password_hash}, ${name?.trim() || null}, ${emailTrim})
      RETURNING id, phone, email, name, created_at
    `;
    await sql`
      INSERT INTO carts (user_phone) VALUES (${user.phone})
      ON CONFLICT (user_phone) DO NOTHING
    `;
    await sql`
      INSERT INTO wishlists (user_phone) VALUES (${user.phone})
      ON CONFLICT (user_phone) DO NOTHING
    `;
    const token = signToken({ userId: user.id });
    return res.status(201).json({
      user: { id: user.id, phone: user.phone, email: user.email ?? null, name: user.name },
      token,
    });
  } catch (err) {
    if (err?.code === "23505") return res.status(409).json({ error: "Este telefone já está em uso" });
    console.error("Register error:", err);
    return res.status(500).json({ error: "Erro ao criar conta" });
  }
});

app.post("/api/login", async (req, res) => {
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    const { phone, password, country } = req.body || {};
    const passwordStr = typeof password === "string" ? password : "";
    const countryCode = typeof country === "string" && country.trim() ? country.trim().toUpperCase().slice(0, 2) : "BR";
    const phoneRaw = typeof phone === "string" ? phone.trim().replace(/\s/g, "") : "";
    if (!phoneRaw || !passwordStr) {
      return res.status(400).json({ error: "Telefone e senha são obrigatórios" });
    }
    let phoneE164;
    try {
      phoneE164 = normalizePhone(phone, countryCode);
    } catch (err) {
      return res.status(400).json({ error: err.message || "Telefone inválido" });
    }
    let rows = await sql`
      SELECT id, email, name, phone, password_hash, role FROM users WHERE phone = ${phoneE164}
    `;
    if (rows.length === 0 && phoneRaw !== phoneE164) {
      rows = await sql`
        SELECT id, email, name, phone, password_hash, role FROM users WHERE phone = ${phoneRaw}
      `;
      if (rows.length > 0) {
        await sql`UPDATE users SET phone = ${phoneE164} WHERE id = ${rows[0].id}`;
        await sql`UPDATE carts SET user_phone = ${phoneE164} WHERE user_phone = ${phoneRaw}`;
        await sql`UPDATE wishlists SET user_phone = ${phoneE164} WHERE user_phone = ${phoneRaw}`;
        await sql`
          INSERT INTO carts (user_phone) VALUES (${phoneE164})
          ON CONFLICT (user_phone) DO NOTHING
        `;
        await sql`
          INSERT INTO wishlists (user_phone) VALUES (${phoneE164})
          ON CONFLICT (user_phone) DO NOTHING
        `;
        rows[0].phone = phoneE164;
      }
    }
    if (rows.length === 0) {
      return res.status(401).json({ error: "Telefone ou senha incorretos" });
    }
    const user = rows[0];
    if (!user.password_hash) {
      return res.status(401).json({ error: "Esta conta usa login com Google ou Facebook." });
    }
    const valid = await verifyPassword(passwordStr, user.password_hash);
    if (!valid) return res.status(401).json({ error: "Telefone ou senha incorretos" });

    // Atualiza última atividade no momento do login (se a coluna existir)
    try {
      await sql`UPDATE users SET last_activity_at = now() WHERE id = ${user.id}`;
    } catch (activityErr) {
      if (activityErr?.code !== "42703") {
        console.error("Erro ao atualizar last_activity_at no login:", activityErr);
      }
    }

    const token = signToken({ userId: user.id });
    return res.status(200).json({
      user: { id: user.id, phone: user.phone, email: user.email ?? null, name: user.name, role: user.role ?? "user" },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Erro ao fazer login" });
  }
});

function parseReqBody(req) {
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  return body || {};
}

app.post("/api/password-reset/request", async (req, res) => {
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });

  try {
    const body = parseReqBody(req);
    const email = body.email ?? body.e_mail;
    const emailNormalized =
      typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!emailNormalized) {
      return res.status(400).json({ error: "E-mail é obrigatório" });
    }

    // Não enumerar usuários: em caso de telefone não existir, responde ok.
    const ok = () => res.status(200).json({ ok: true });

    const rows = await sql`SELECT id, email FROM users WHERE email = ${emailNormalized}`;

    if (rows.length === 0) {
      return ok();
    }

    const user = rows[0];

    const cooldownSeconds =
      Number(process.env.PASSWORD_RESET_COOLDOWN_SECONDS) || 60;
    const ttlMinutes = Number(process.env.PASSWORD_RESET_TOKEN_TTL_MINUTES) || 10;

    const active = await sql`
      SELECT id, created_at
      FROM password_reset_tokens
      WHERE user_email = ${emailNormalized}
        AND used_at IS NULL
        AND expires_at > now()
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (active.length > 0) {
      const createdAtMs = new Date(active[0].created_at).getTime();
      const nowMs = Date.now();
      if (
        Number.isFinite(createdAtMs) &&
        nowMs - createdAtMs <= cooldownSeconds * 1000
      ) {
        return ok();
      }
    }

    await sql`
      UPDATE password_reset_tokens
      SET used_at = now()
      WHERE user_email = ${emailNormalized}
        AND used_at IS NULL
        AND expires_at > now()
    `;

    const otpCode = generateOtpCode(6);
    const tokenHash = hashResetCode(otpCode, emailNormalized);

    const [inserted] = await sql`
      INSERT INTO password_reset_tokens (user_email, user_id, token_hash, expires_at, attempts)
      VALUES (
        ${emailNormalized},
        ${user.id},
        ${tokenHash},
        now() + (${ttlMinutes} * interval '1 minute'),
        0
      )
      RETURNING id
    `;

    try {
      const transport = getMailTransport();
      if (!transport) {
        return res.status(503).json({ error: "Envio de e-mail não está configurado no servidor." });
      }

      const from = (process.env.SMTP_FROM || process.env.SMTP_USER || "").trim();
      if (!from) {
        return res.status(503).json({ error: "SMTP_FROM/SMTP_USER não definido no servidor." });
      }

      await transport.sendMail({
        from,
        to: emailNormalized,
        subject: "Recuperação de senha - Aroma Expresso",
        text: `Seu código de verificação é ${otpCode}. Ele expira em ${ttlMinutes} minutos.`,
        html: `<p>Seu código de verificação é <strong>${otpCode}</strong>.</p><p>Ele expira em ${ttlMinutes} minutos.</p>`,
      });
    } catch (mailErr) {
      console.error("E-mail send error:", mailErr);
      await sql`
        UPDATE password_reset_tokens
        SET used_at = now()
        WHERE id = ${inserted?.id || null}
      `;
      return res.status(503).json({ error: "Não foi possível enviar o e-mail no momento. Tente novamente." });
    }

    return ok();
  } catch (err) {
    console.error("Password reset request error:", err);
    return res
      .status(500)
      .json({ error: "Erro ao solicitar redefinição de senha" });
  }
});

app.post("/api/password-reset/confirm", async (req, res) => {
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });

  try {
    const body = parseReqBody(req);
    const email = body.email ?? body.e_mail;
    const code = body.code ?? body.otp;
    const newPassword = body.newPassword ?? body.password;

    const emailNormalized =
      typeof email === "string" ? email.trim().toLowerCase() : "";

    const codeStr =
      typeof code === "string" ? code.trim() : String(code ?? "").trim();
    const passwordStr = typeof newPassword === "string" ? newPassword : "";

    if (!emailNormalized) return res.status(400).json({ error: "E-mail é obrigatório" });
    if (!codeStr) return res.status(400).json({ error: "Código é obrigatório" });
    if (!passwordStr) return res.status(400).json({ error: "Nova senha é obrigatória" });
    if (passwordStr.length < 6) {
      return res
        .status(400)
        .json({ error: "Senha deve ter no mínimo 6 caracteres" });
    }

    const tokens = await sql`
      SELECT id, token_hash, attempts, user_id
      FROM password_reset_tokens
      WHERE user_email = ${emailNormalized}
        AND used_at IS NULL
        AND expires_at > now()
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (!tokens || tokens.length === 0) {
      return res.status(400).json({ error: "Código inválido ou expirado" });
    }

    const token = tokens[0];
    const maxAttempts =
      Number(process.env.PASSWORD_RESET_MAX_ATTEMPTS) || 5;
    const attempts = Number(token.attempts) || 0;

    if (attempts >= maxAttempts) {
      await sql`
        UPDATE password_reset_tokens
        SET used_at = now()
        WHERE id = ${token.id}
      `;
      return res.status(400).json({ error: "Código inválido ou expirado" });
    }

    const tokenHashAttempt = hashResetCode(codeStr, emailNormalized);
    const ok = constantTimeEqualHex(tokenHashAttempt, token.token_hash);

    if (!ok) {
      const nextAttempts = attempts + 1;
      if (nextAttempts >= maxAttempts) {
        await sql`
          UPDATE password_reset_tokens
          SET attempts = ${nextAttempts}, used_at = now()
          WHERE id = ${token.id}
        `;
      } else {
        await sql`
          UPDATE password_reset_tokens
          SET attempts = ${nextAttempts}
          WHERE id = ${token.id}
        `;
      }
      return res.status(400).json({ error: "Código inválido ou expirado" });
    }

    const newHash = await hashPassword(passwordStr);
    await sql`
      UPDATE users
      SET password_hash = ${newHash}, updated_at = now()
      WHERE id = ${token.user_id}
    `;

    await sql`
      UPDATE password_reset_tokens
      SET used_at = now()
      WHERE id = ${token.id}
    `;

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Password reset confirm error:", err);
    return res.status(500).json({ error: "Erro ao redefinir a senha" });
  }
});

app.get("/api/me", async (req, res) => {
  const token = getBearerToken(req);
  const payload = verifyToken(token);
  if (!payload?.userId) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    let rows;
    try {
      rows = await sql`
        SELECT id, email, name, avatar_url, birth_date, city, state, country, phone, address, address_complement, zipcode, role, created_at, updated_at, last_activity_at
        FROM users WHERE id = ${payload.userId}
      `;
    } catch (schemaErr) {
      if (schemaErr?.code !== "42703") throw schemaErr;
      rows = await sql`
        SELECT id, email, name, created_at, updated_at
        FROM users WHERE id = ${payload.userId}
      `;
      if (rows.length > 0) {
        rows[0].avatar_url = null;
        rows[0].birth_date = null;
        rows[0].city = null;
        rows[0].state = null;
        rows[0].country = null;
        rows[0].phone = null;
        rows[0].address = null;
        rows[0].address_complement = null;
        rows[0].zipcode = null;
        rows[0].role = "user";
        rows[0].last_activity_at = rows[0].updated_at;
      }
    }
    if (!rows || rows.length === 0) return res.status(404).json({ error: "Usuário não encontrado" });
    const u = rows[0];
    return res.status(200).json({
      user: {
        id: u.id,
        email: u.email,
        name: u.name ?? null,
        avatar_url: u.avatar_url ?? null,
        birth_date: u.birth_date ?? null,
        city: u.city ?? null,
        state: u.state ?? null,
        country: u.country ?? null,
        phone: u.phone ?? null,
        address: u.address ?? null,
        address_complement: u.address_complement ?? null,
        zipcode: u.zipcode ?? null,
        role: u.role ?? "user",
        created_at: u.created_at,
        updated_at: u.updated_at ?? u.created_at,
        last_activity_at: u.last_activity_at ?? u.updated_at ?? u.created_at,
      },
    });
  } catch (err) {
    console.error("Me error:", err);
    const message =
      process.env.NODE_ENV !== "production" ? err.message : "Erro ao buscar usuário";
    return res.status(500).json({ error: message });
  }
});

app.patch("/api/me", async (req, res) => {
  const token = getBearerToken(req);
  const payload = verifyToken(token);
  if (!payload?.userId) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    let current;
    try {
      [current] = await sql`
        SELECT id, email, name, avatar_url, birth_date, city, state, country, phone, address, address_complement, zipcode, role, created_at, updated_at
        FROM users WHERE id = ${payload.userId}
      `;
    } catch (schemaErr) {
      if (schemaErr?.code !== "42703") throw schemaErr;
      [current] = await sql`
        SELECT id, email, name, avatar_url, birth_date, city, state, country, phone, role, created_at, updated_at
        FROM users WHERE id = ${payload.userId}
      `;
      if (current) {
        current.address = null;
        current.address_complement = null;
        current.zipcode = null;
      }
    }
    if (!current) return res.status(404).json({ error: "Usuário não encontrado" });
    const body = req.body || {};
    const name = typeof body.name === "string" ? body.name.trim() || null : current.name;
    const avatar_url = body.avatar_url !== undefined ? (typeof body.avatar_url === "string" ? body.avatar_url.trim() || null : null) : current.avatar_url;
    const birth_date = body.birth_date !== undefined ? (body.birth_date === "" || body.birth_date === null ? null : body.birth_date) : current.birth_date;
    const city = body.city !== undefined ? (typeof body.city === "string" ? body.city.trim() || null : null) : current.city;
    const state = body.state !== undefined ? (typeof body.state === "string" ? body.state.trim() || null : null) : current.state;
    const country = body.country !== undefined ? (typeof body.country === "string" ? body.country.trim() || null : null) : current.country;
    const email = body.email !== undefined ? (typeof body.email === "string" ? body.email.trim().toLowerCase() || null : null) : current.email;
    const address = body.address !== undefined ? (typeof body.address === "string" ? body.address.trim() || null : null) : current.address;
    const address_complement = body.address_complement !== undefined ? (typeof body.address_complement === "string" ? body.address_complement.trim() || null : null) : current.address_complement;
    const zipcode = body.zipcode !== undefined ? (typeof body.zipcode === "string" ? body.zipcode.trim() || null : null) : current.zipcode;
    let updated;
    try {
      [updated] = await sql`
        UPDATE users
        SET name = ${name}, avatar_url = ${avatar_url}, birth_date = ${birth_date},
            city = ${city}, state = ${state}, country = ${country}, email = ${email},
            address = ${address}, address_complement = ${address_complement}, zipcode = ${zipcode},
            updated_at = now()
        WHERE id = ${payload.userId}
        RETURNING id, email, name, avatar_url, birth_date, city, state, country, phone, address, address_complement, zipcode, role, created_at, updated_at
      `;
    } catch (updateErr) {
      if (updateErr?.code !== "42703") throw updateErr;
      [updated] = await sql`
        UPDATE users
        SET name = ${name}, avatar_url = ${avatar_url}, birth_date = ${birth_date},
            city = ${city}, state = ${state}, country = ${country}, email = ${email},
            updated_at = now()
        WHERE id = ${payload.userId}
        RETURNING id, email, name, avatar_url, birth_date, city, state, country, phone, role, created_at, updated_at
      `;
      if (updated) {
        updated.address = address ?? null;
        updated.address_complement = address_complement ?? null;
        updated.zipcode = zipcode ?? null;
      }
    }
    const u = updated;
    return res.status(200).json({
      user: {
        id: u.id,
        email: u.email,
        name: u.name ?? null,
        avatar_url: u.avatar_url ?? null,
        birth_date: u.birth_date ?? null,
        city: u.city ?? null,
        state: u.state ?? null,
        country: u.country ?? null,
        phone: u.phone ?? null,
        address: u.address ?? null,
        address_complement: u.address_complement ?? null,
        zipcode: u.zipcode ?? null,
        role: u.role ?? "user",
        created_at: u.created_at,
        updated_at: u.updated_at ?? u.created_at,
      },
    });
  } catch (err) {
    console.error("Me PATCH error:", err);
    return res.status(500).json({ error: "Erro ao atualizar perfil" });
  }
});

// --- Carrinho: identificado pelo telefone do usuário (um carrinho por usuário) ---
async function getCartUser(req, res) {
  const token = getBearerToken(req);
  const payload = verifyToken(token);
  if (!payload?.userId) {
    res.status(401).json({ error: "Faça login para acessar o carrinho" });
    return null;
  }
  if (!sql) {
    res.status(503).json({ error: "Banco de dados não configurado" });
    return null;
  }
  const [user] = await sql`SELECT id, phone FROM users WHERE id = ${payload.userId}`;
  if (!user) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return null;
  }
  const phone = user.phone != null ? String(user.phone).trim() : "";
  if (!phone) {
    res.status(400).json({ error: "Carrinho disponível apenas para usuários com telefone cadastrado" });
    return null;
  }
  return { userId: user.id, userPhone: phone };
}

app.get("/api/cart", async (req, res) => {
  const cartUser = await getCartUser(req, res);
  if (!cartUser) return;
  try {
    let [cart] = await sql`SELECT id FROM carts WHERE user_phone = ${cartUser.userPhone}`;
    if (!cart) {
      return res.status(200).json({ items: [] });
    }
    const items = await sql`
      SELECT ci.id AS cart_item_id, ci.perfume_id, ci.variant_option, ci.unit_price, ci.quantity, p.title, p.variants
      FROM cart_items ci
      JOIN perfumes p ON p.id = ci.perfume_id
      WHERE ci.cart_id = ${cart.id}
    `;
    if (items.length === 0) return res.status(200).json({ items: [] });
    const perfumeIds = items.map((i) => i.perfume_id ?? i.perfumeId).filter(Boolean);
    const imgRows = await sql`
      SELECT DISTINCT ON (perfume_id) perfume_id, url
      FROM perfume_images
      WHERE perfume_id = ANY(${perfumeIds})
      ORDER BY perfume_id, position
    `;
    const imageByPerfume = new Map();
    for (const row of imgRows || []) {
      const pid = row.perfume_id ?? row.perfumeId;
      const url = row.url != null ? String(row.url).trim() : "";
      if (pid && url && !imageByPerfume.has(pid)) imageByPerfume.set(pid, url);
    }
    const out = items.map((i) => {
      const pid = i.perfume_id ?? i.perfumeId;
      const variants = i.variants || [];
      const selectedOpt = (i.variant_option ?? "").toString();
      const match = selectedOpt
        ? variants.find((v) => v && String(v.option0 || "").trim() === selectedOpt)
        : variants.find((v) => v && (v.price_number != null || v.price_short));
      const dbUnit = i.unit_price != null ? Number(i.unit_price) : null;
      const priceNumber = dbUnit != null && !Number.isNaN(dbUnit)
        ? dbUnit
        : match?.price_number != null
          ? Number(match.price_number)
          : 0;
      const priceShort = match?.price_short ?? (priceNumber ? `R$ ${Number(priceNumber).toFixed(2)}` : "");
      return {
        id: i.cart_item_id ?? pid,
        perfume_id: pid,
        variant_option: selectedOpt || null,
        quantity: Number(i.quantity) || 1,
        title: i.title ?? "",
        imageUrl: imageByPerfume.get(pid) ?? null,
        priceShort,
        price: priceNumber != null ? Number(priceNumber) : 0,
      };
    });
    return res.status(200).json({ items: out });
  } catch (err) {
    console.error("GET /api/cart error:", err);
    return res.status(500).json({ error: "Erro ao carregar carrinho" });
  }
});

app.post("/api/cart/items", async (req, res) => {
  const cartUser = await getCartUser(req, res);
  if (!cartUser) return;
  try {
    const body = req.body || {};
    const perfumeId = (body.perfume_id ?? body.perfumeId ?? "").toString().trim();
    const quantity = Math.max(1, parseInt(body.quantity, 10) || 1);
    const variantOption = typeof body.variant_option === "string" ? body.variant_option.trim() : "";
    const unitPrice = body.unit_price != null && !Number.isNaN(Number(body.unit_price)) ? Number(body.unit_price) : 0;
    if (!perfumeId) return res.status(400).json({ error: "perfume_id é obrigatório" });
    const [perfume] = await sql`SELECT id FROM perfumes WHERE id = ${perfumeId}`;
    if (!perfume) return res.status(404).json({ error: "Perfume não encontrado" });
    let [cart] = await sql`SELECT id FROM carts WHERE user_phone = ${cartUser.userPhone}`;
    if (!cart) {
      const [created] = await sql`
        INSERT INTO carts (user_phone) VALUES (${cartUser.userPhone})
        RETURNING id
      `;
      cart = created;
    }
    await sql`
      INSERT INTO cart_items (cart_id, perfume_id, variant_option, unit_price, quantity)
      VALUES (${cart.id}, ${perfumeId}, ${variantOption}, ${unitPrice}, ${quantity})
      ON CONFLICT (cart_id, perfume_id, variant_option)
      DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity,
                    unit_price = EXCLUDED.unit_price
    `;
    const [updated] = await sql`
      SELECT id, quantity FROM cart_items WHERE cart_id = ${cart.id} AND perfume_id = ${perfumeId} AND variant_option = ${variantOption}
    `;
    await sql`UPDATE carts SET updated_at = now() WHERE id = ${cart.id}`;
    return res.status(200).json({ id: updated?.id, perfume_id: perfumeId, variant_option: variantOption || null, quantity: updated?.quantity ?? quantity });
  } catch (err) {
    if (err?.code === "23503") return res.status(404).json({ error: "Perfume não encontrado" });
    console.error("POST /api/cart/items error:", err);
    return res.status(500).json({ error: "Erro ao adicionar ao carrinho" });
  }
});

app.patch("/api/cart/items/:id", async (req, res) => {
  const cartUser = await getCartUser(req, res);
  if (!cartUser) return;
  try {
    const id = (req.params.id ?? "").toString().trim();
    const body = req.body || {};
    const quantity = Math.max(0, parseInt(body.quantity, 10));
    if (!id) return res.status(400).json({ error: "id é obrigatório" });
    const [cart] = await sql`SELECT id FROM carts WHERE user_phone = ${cartUser.userPhone}`;
    if (!cart) return res.status(200).json({ ok: true });
    if (quantity === 0) {
      await sql`DELETE FROM cart_items WHERE cart_id = ${cart.id} AND id = ${id}`;
    } else {
      await sql`
        UPDATE cart_items SET quantity = ${quantity}
        WHERE cart_id = ${cart.id} AND id = ${id}
      `;
    }
    await sql`UPDATE carts SET updated_at = now() WHERE id = ${cart.id}`;
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("PATCH /api/cart/items error:", err);
    return res.status(500).json({ error: "Erro ao atualizar carrinho" });
  }
});

app.delete("/api/cart/items/:id", async (req, res) => {
  const cartUser = await getCartUser(req, res);
  if (!cartUser) return;
  try {
    const id = (req.params.id ?? "").toString().trim();
    if (!id) return res.status(400).json({ error: "id é obrigatório" });
    const [cart] = await sql`SELECT id FROM carts WHERE user_phone = ${cartUser.userPhone}`;
    if (cart) {
      await sql`DELETE FROM cart_items WHERE cart_id = ${cart.id} AND id = ${id}`;
      await sql`UPDATE carts SET updated_at = now() WHERE id = ${cart.id}`;
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/cart/items error:", err);
    return res.status(500).json({ error: "Erro ao remover do carrinho" });
  }
});

// --- Pedidos: criar pedido a partir do carrinho e zerar o carrinho ---
app.post("/api/orders", async (req, res) => {
  const cartUser = await getCartUser(req, res);
  if (!cartUser) return;
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    const [cart] = await sql`SELECT id FROM carts WHERE user_phone = ${cartUser.userPhone}`;
    if (!cart) return res.status(400).json({ error: "Carrinho vazio" });
    const cartItems = await sql`
      SELECT ci.perfume_id, ci.variant_option, ci.unit_price, ci.quantity, p.title, p.variants
      FROM cart_items ci
      JOIN perfumes p ON p.id = ci.perfume_id
      WHERE ci.cart_id = ${cart.id}
    `;
    if (!cartItems || cartItems.length === 0) return res.status(400).json({ error: "Carrinho vazio" });

    const body = req.body || {};
    const shippingName = typeof body.shipping_name === "string" ? body.shipping_name.trim() || null : null;
    const shippingAddress = typeof body.shipping_address === "string" ? body.shipping_address.trim() || null : null;
    const shippingComplement = typeof body.shipping_complement === "string" ? body.shipping_complement.trim() || null : null;
    const shippingCity = typeof body.shipping_city === "string" ? body.shipping_city.trim() || null : null;
    const shippingState = typeof body.shipping_state === "string" ? body.shipping_state.trim() || null : null;
    const shippingZipcode = typeof body.shipping_zipcode === "string" ? body.shipping_zipcode.trim() || null : null;
    const shippingCountry = typeof body.shipping_country === "string" ? body.shipping_country.trim() || null : null;
    const shippingPhone = typeof body.shipping_phone === "string" ? body.shipping_phone.trim() || null : null;
    const paymentMethod = typeof body.payment_method === "string" ? body.payment_method.trim() || null : null;
    const subtotal = Number(body.subtotal);
    const discount = Number(body.discount) || 0;
    const shipping = Number(body.shipping) || 0;
    const tax = Number(body.tax) || 0;
    const total = Number(body.total);
    if (Number.isNaN(subtotal) || subtotal < 0) return res.status(400).json({ error: "Subtotal inválido" });
    if (Number.isNaN(total) || total < 0) return res.status(400).json({ error: "Total inválido" });

    let orderId;
    try {
      const [order] = await sql`
        INSERT INTO orders (user_id, user_phone, status, subtotal, discount, shipping, tax, total,
          shipping_name, shipping_address, shipping_complement, shipping_city, shipping_state, shipping_zipcode, shipping_country, shipping_phone, payment_method)
        VALUES (${cartUser.userId}, ${cartUser.userPhone}, 'pending', ${subtotal}, ${discount}, ${shipping}, ${tax}, ${total},
          ${shippingName}, ${shippingAddress}, ${shippingComplement}, ${shippingCity}, ${shippingState}, ${shippingZipcode}, ${shippingCountry}, ${shippingPhone}, ${paymentMethod})
        RETURNING id
      `;
      orderId = order?.id;
      if (!orderId) throw new Error("Falha ao criar pedido");
    } catch (orderErr) {
      if (orderErr?.code === "42P01") return res.status(503).json({ error: "Tabela de pedidos não disponível. Execute as migrations." });
      throw orderErr;
    }

    for (const item of cartItems) {
      const perfumeId = item.perfume_id ?? item.perfumeId;
      const quantity = Number(item.quantity) || 1;
      const variants = item.variants || [];
      const selectedOpt = (item.variant_option ?? "").toString();
      const match = selectedOpt
        ? variants.find((v) => v && String(v.option0 || "").trim() === selectedOpt)
        : variants.find((v) => v && (v.price_number != null || v.price_short));
      const dbUnit = item.unit_price != null ? Number(item.unit_price) : null;
      const unitPrice =
        dbUnit != null && !Number.isNaN(dbUnit)
          ? dbUnit
          : match?.price_number != null
            ? Number(match.price_number)
            : 0;
      const totalPrice = unitPrice * quantity;
      const title = (item.title ?? "").toString() || "Produto";
      await sql`
        INSERT INTO order_items (order_id, perfume_id, title, variant_option, quantity, unit_price, total_price)
        VALUES (${orderId}, ${perfumeId}, ${title}, ${selectedOpt || null}, ${quantity}, ${unitPrice}, ${totalPrice})
      `;
    }

    await sql`DELETE FROM cart_items WHERE cart_id = ${cart.id}`;
    await sql`UPDATE carts SET updated_at = now() WHERE id = ${cart.id}`;

    return res.status(201).json({ orderId, ok: true });
  } catch (err) {
    console.error("POST /api/orders error:", err);
    return res.status(500).json({ error: "Erro ao finalizar pedido" });
  }
});

// Lista os pedidos do usuário autenticado (cada usuário só enxerga seus próprios pedidos)
app.get("/api/my-orders", async (req, res) => {
  const token = getBearerToken(req);
  const payload = verifyToken(token);
  if (!payload?.userId) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
  if (!sql) {
    return res.status(503).json({ error: "Banco de dados não configurado" });
  }
  try {
    const rows = await sql`
      SELECT id, user_id, user_phone, status, total, created_at, updated_at
      FROM orders
      WHERE user_id = ${payload.userId}
      ORDER BY created_at DESC
    `;
    const list = (rows || []).map((o) => ({
      id: o.id,
      status: o.status,
      total: Number(o.total || 0),
      created_at: o.created_at,
      updated_at: o.updated_at,
    }));
    return res.status(200).json(list);
  } catch (err) {
    console.error("GET /api/my-orders error:", err);
    return res.status(500).json({ error: "Erro ao listar pedidos" });
  }
});

// Detalhes de um pedido específico do usuário autenticado
app.get("/api/my-orders/:id", async (req, res) => {
  const token = getBearerToken(req);
  const payload = verifyToken(token);
  if (!payload?.userId) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
  if (!sql) {
    return res.status(503).json({ error: "Banco de dados não configurado" });
  }
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "ID do pedido é obrigatório" });
  }
  try {
    const [order] = await sql`
      SELECT id,
             status,
             subtotal,
             discount,
             shipping,
             tax,
             total,
             shipping_name,
             shipping_address,
             shipping_complement,
             shipping_city,
             shipping_state,
             shipping_zipcode,
             shipping_country,
             shipping_phone,
             payment_method,
             created_at,
             updated_at
      FROM orders
      WHERE id = ${id} AND user_id = ${payload.userId}
    `;
    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    let items;
    try {
      items = await sql`
        SELECT id, order_id, perfume_id, title, quantity, unit_price, total_price
        FROM order_items
        WHERE order_id = ${id}
        ORDER BY title
      `;
    } catch (itemsErr) {
      if (itemsErr?.code !== "42703") throw itemsErr;
      items = await sql`
        SELECT id, order_id, perfume_id, title, quantity
        FROM order_items
        WHERE order_id = ${id}
        ORDER BY title
      `;
    }

    return res.status(200).json({
      order: {
        id: order.id,
        status: order.status,
        subtotal: Number(order.subtotal || 0),
        discount: Number(order.discount || 0),
        shipping: Number(order.shipping || 0),
        tax: Number(order.tax || 0),
        total: Number(order.total || 0),
        shipping_name: order.shipping_name ?? null,
        shipping_address: order.shipping_address ?? null,
        shipping_complement: order.shipping_complement ?? null,
        shipping_city: order.shipping_city ?? null,
        shipping_state: order.shipping_state ?? null,
        shipping_zipcode: order.shipping_zipcode ?? null,
        shipping_country: order.shipping_country ?? null,
        shipping_phone: order.shipping_phone ?? null,
        payment_method: order.payment_method ?? null,
        created_at: order.created_at,
        updated_at: order.updated_at,
      },
      items: (items || []).map((i) => ({
        id: i.id,
        perfume_id: i.perfume_id,
        title: i.title,
        quantity: Number(i.quantity || 0),
        unit_price: Number(i.unit_price || 0),
        total_price: Number(i.total_price || 0),
      })),
    });
  } catch (err) {
    console.error("GET /api/my-orders/:id error:", err);
    return res.status(500).json({ error: "Erro ao buscar pedido" });
  }
});

// --- Lista de desejos: identificada pelo telefone do usuário (uma por usuário) ---
async function getWishlistUser(req, res) {
  const token = getBearerToken(req);
  const payload = verifyToken(token);
  if (!payload?.userId) {
    res.status(401).json({ error: "Faça login para acessar a lista de desejos" });
    return null;
  }
  if (!sql) {
    res.status(503).json({ error: "Banco de dados não configurado" });
    return null;
  }
  const [user] = await sql`SELECT id, phone FROM users WHERE id = ${payload.userId}`;
  if (!user) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return null;
  }
  const phone = user.phone != null ? String(user.phone).trim() : "";
  if (!phone) {
    res.status(400).json({ error: "Lista de desejos disponível apenas para usuários com telefone cadastrado" });
    return null;
  }
  return { userId: user.id, userPhone: phone };
}

app.get("/api/wishlist", async (req, res) => {
  const wUser = await getWishlistUser(req, res);
  if (!wUser) return;
  try {
    let [wishlist] = await sql`SELECT id FROM wishlists WHERE user_phone = ${wUser.userPhone}`;
    if (!wishlist) return res.status(200).json({ items: [] });

    // Lista perfumes da wishlist (apenas ativos para o usuário comum)
    let rows;
    try {
      rows = await sql`
        SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants, p.image_2_url, p.ativo, p.esgotado
        FROM wishlist_items wi
        JOIN perfumes p ON p.id = wi.perfume_id
        WHERE wi.wishlist_id = ${wishlist.id}
          AND COALESCE(p.ativo, true) = true
        ORDER BY p.title
      `;
    } catch (queryErr) {
      if (queryErr?.code !== "42703") throw queryErr;
      // Retrocompatibilidade: se ativo/esgotado ainda não existem, não filtra.
      rows = await sql`
        SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants, p.image_2_url
        FROM wishlist_items wi
        JOIN perfumes p ON p.id = wi.perfume_id
        WHERE wi.wishlist_id = ${wishlist.id}
        ORDER BY p.title
      `;
    }

    if (!rows?.length) return res.status(200).json({ items: [] });
    const idSet = new Set(rows.map((r) => toUuidKey(r.id)).filter(Boolean));
    const allImages = await sql`SELECT perfume_id, url, position FROM perfume_images ORDER BY perfume_id, position`;
    const imagesRows = idSet.size
      ? allImages.filter((r) => idSet.has(toUuidKey(r.perfume_id ?? r.perfumeId)))
      : [];
    const imagesByPerfume = new Map();
    for (const img of imagesRows) {
      const pid = toUuidKey(img.perfume_id ?? img.perfumeId);
      if (!pid) continue;
      const url = typeof (img.url ?? img.URL) === "string" ? (img.url ?? img.URL).trim() : "";
      if (!url) continue;
      const list = imagesByPerfume.get(pid) || [];
      const pos = Number(img.position ?? img.Position ?? list.length);
      list.push({ url, position: pos });
      imagesByPerfume.set(pid, list);
    }
    for (const [pid, arr] of imagesByPerfume) {
      arr.sort((a, b) => a.position - b.position);
      imagesByPerfume.set(pid, arr.map((x) => x.url));
    }

    const items = rows.map((p) => {
      const perfumeId = toUuidKey(p.id);
      let images = imagesByPerfume.get(perfumeId) ?? [];
      if (images.length === 0) {
        const vars = p.variants ?? [];
        const firstWithImg = vars.find((v) => v && (v.image_url || v.imageUrl));
        const url = firstWithImg && (firstWithImg.image_url ?? firstWithImg.imageUrl);
        if (url) images = [String(url).startsWith("//") ? "https:" + url : url];
      }
      if (images.length === 0 && p.image_2_url) {
        const u = String(p.image_2_url).trim();
        if (u) images = [u.startsWith("//") ? "https:" + u : u];
      }
      return {
        id: p.id,
        url: p.external_url,
        title: p.title,
        description: p.description ?? "",
        catalogSource: p.catalog_source,
        notes: p.notes ?? {},
        variants: p.variants ?? [],
        images,
        ativo: p.ativo === true || p.ativo == null,
        esgotado: p.esgotado === true,
      };
    });
    return res.status(200).json({ items });
  } catch (err) {
    console.error("GET /api/wishlist error:", err);
    return res.status(500).json({ error: "Erro ao carregar lista de desejos" });
  }
});

app.post("/api/wishlist/items", async (req, res) => {
  const wUser = await getWishlistUser(req, res);
  if (!wUser) return;
  try {
    const body = req.body || {};
    const perfumeId = (body.perfume_id ?? body.perfumeId ?? "").toString().trim();
    if (!perfumeId) return res.status(400).json({ error: "perfume_id é obrigatório" });
    const [perfume] = await sql`SELECT id FROM perfumes WHERE id = ${perfumeId}`;
    if (!perfume) return res.status(404).json({ error: "Perfume não encontrado" });

    let [wishlist] = await sql`SELECT id FROM wishlists WHERE user_phone = ${wUser.userPhone}`;
    if (!wishlist) {
      const [created] = await sql`
        INSERT INTO wishlists (user_phone) VALUES (${wUser.userPhone})
        RETURNING id
      `;
      wishlist = created;
    }

    await sql`
      INSERT INTO wishlist_items (wishlist_id, perfume_id)
      VALUES (${wishlist.id}, ${perfumeId})
      ON CONFLICT (wishlist_id, perfume_id) DO NOTHING
    `;
    await sql`UPDATE wishlists SET updated_at = now() WHERE id = ${wishlist.id}`;
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("POST /api/wishlist/items error:", err);
    return res.status(500).json({ error: "Erro ao adicionar à lista de desejos" });
  }
});

app.delete("/api/wishlist/items/:perfumeId", async (req, res) => {
  const wUser = await getWishlistUser(req, res);
  if (!wUser) return;
  try {
    const perfumeId = (req.params.perfumeId ?? "").toString().trim();
    if (!perfumeId) return res.status(400).json({ error: "perfume_id é obrigatório" });
    const [wishlist] = await sql`SELECT id FROM wishlists WHERE user_phone = ${wUser.userPhone}`;
    if (wishlist) {
      await sql`DELETE FROM wishlist_items WHERE wishlist_id = ${wishlist.id} AND perfume_id = ${perfumeId}`;
      await sql`UPDATE wishlists SET updated_at = now() WHERE id = ${wishlist.id}`;
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/wishlist/items error:", err);
    return res.status(500).json({ error: "Erro ao remover da lista de desejos" });
  }
});

app.get("/api/admin-check", async (req, res) => {
  const token = getBearerToken(req);
  const payload = verifyToken(token);
  if (!payload?.userId) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });
  try {
    const rows = await sql`SELECT role FROM users WHERE id = ${payload.userId}`;
    const user = rows?.[0];
    if (!user) return res.status(403).json({ error: "Usuário não encontrado" });
    const role = (user.role || "user").toString().toLowerCase();
    if (role !== "admin") {
      return res.status(403).json({ error: "Acesso negado. Apenas administradores." });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Admin check error:", err);
    return res.status(500).json({ error: "Erro ao verificar permissão" });
  }
});

app.post("/api/upload-avatar", async (req, res) => {
  const token = getBearerToken(req);
  const payload = verifyToken(token);
  if (!payload?.userId) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(503).json({ error: "Upload não configurado (BLOB_READ_WRITE_TOKEN)" });
  }
  try {
    const dataUrl = req.body?.dataUrl || req.body?.image;
    if (!dataUrl || typeof dataUrl !== "string") {
      return res.status(400).json({ error: "Envie dataUrl com a imagem em base64" });
    }
    const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      return res.status(400).json({ error: "Formato inválido. Use data:image/...;base64,..." });
    }
    const contentType = match[1].trim().toLowerCase();
    if (!ALLOWED_AVATAR_TYPES.includes(contentType)) {
      return res.status(400).json({ error: "Tipo de imagem não permitido. Use JPEG, PNG, WebP ou GIF." });
    }
    const base64 = match[2];
    const buffer = Buffer.from(base64, "base64");
    if (buffer.length > MAX_AVATAR_SIZE) {
      return res.status(400).json({ error: "Imagem muito grande. Máximo 4 MB." });
    }
    const ext = contentType.split("/")[1] === "jpeg" ? "jpg" : contentType.split("/")[1];
    const pathname = `avatars/${payload.userId}-${Date.now()}.${ext}`;
    const blob = await put(pathname, buffer, {
      access: "public",
      contentType,
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return res.status(200).json({ url: blob.url });
  } catch (err) {
    console.error("Upload avatar error:", err);
    return res.status(500).json({ error: "Erro ao fazer upload da foto" });
  }
});

app.post("/api/upload-perfume-image", async (req, res) => {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(503).json({ error: "Upload não configurado (BLOB_READ_WRITE_TOKEN)" });
  }
  try {
    const dataUrl = req.body?.dataUrl || req.body?.image;
    const filename = typeof req.body?.filename === "string" ? req.body.filename.trim() : "";
    if (!dataUrl || typeof dataUrl !== "string") {
      return res.status(400).json({ error: "Envie dataUrl com a imagem em base64" });
    }
    const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      return res.status(400).json({ error: "Formato inválido. Use data:image/...;base64,..." });
    }
    const contentType = match[1].trim().toLowerCase();
    if (!ALLOWED_PERFUME_IMAGE_TYPES.includes(contentType)) {
      return res.status(400).json({ error: "Tipo de imagem não permitido. Use JPEG, PNG, WebP ou GIF." });
    }
    const base64 = match[2];
    const buffer = Buffer.from(base64, "base64");
    if (buffer.length > MAX_PERFUME_IMAGE_SIZE) {
      return res.status(400).json({ error: "Imagem muito grande. Máximo 3 MB." });
    }
    const ext = contentType.split("/")[1] === "jpeg" ? "jpg" : contentType.split("/")[1];
    const safeName = (filename || "perfume").slice(0, 80).replace(/[^\w.-]+/g, "-");
    const pathname = `perfumes/${safeName}-${Date.now()}.${ext}`;
    const blob = await put(pathname, buffer, {
      access: "public",
      contentType,
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return res.status(200).json({ url: blob.url });
  } catch (err) {
    console.error("Upload perfume image error:", err);
    return res.status(500).json({ error: "Erro ao fazer upload da imagem" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend rodando em http://0.0.0.0:${PORT}`);
});
