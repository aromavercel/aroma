/**
 * Script para popular o banco com perfumes a partir dos JSON do catálogo.
 * Faz upload das imagens para o Vercel Blob e guarda as URLs no banco.
 *
 * Uso (na raiz do projeto):
 *   node --env-file=.env backend/scripts/seed-perfumes.js
 *
 * Variáveis de ambiente necessárias:
 *   DATABASE_URL          - conexão Postgres (Neon/Vercel)
 *   BLOB_READ_WRITE_TOKEN - token do Vercel Blob para upload
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..", "..");
const DATA_DIR = path.join(PROJECT_ROOT, "src", "data");

const CATALOG_FILES = [
  { file: "thekingofparfums_data_perfume_arabe.json", source: "arabe" },
  { file: "thekingofparfums_data_perfume_normal_feminino.json", source: "feminino" },
  { file: "thekingofparfums_data_perfume_normal.json", source: "normal" },
];

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

function toArray(data) {
  if (Array.isArray(data)) return data;
  if (data?.items) return data.items;
  if (data?.perfumes) return data.perfumes;
  return [];
}

function getPerfumeAllImageUrls(item) {
  const seen = new Set();
  const out = [];
  const add = (url) => {
    if (!url || typeof url !== "string") return;
    const full = url.startsWith("//") ? "https:" + url : url;
    if (seen.has(full)) return;
    seen.add(full);
    out.push(full);
  };
  (item.images || []).forEach(add);
  (item.variants || []).forEach((v) => add(v.image_url));
  return out;
}

function slug(str) {
  return String(str)
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
    .slice(0, 80);
}

async function downloadImage(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) return null;
  return Buffer.from(await res.arrayBuffer());
}

function getBlobAccess() {
  const raw = (process.env.BLOB_ACCESS || "").trim().toLowerCase();
  if (raw === "public" || raw === "private") return raw;
  // Sem configuração explícita: tentamos sem "access" e reagimos ao erro.
  return null;
}

function isAccessModeError(err) {
  const msg = String(err?.message || err || "");
  return (
    msg.includes('Cannot use public access on a private store') ||
    msg.includes('access must be "public"') ||
    msg.includes('access must be "private"')
  );
}

function inferRequiredAccessFromError(err) {
  const msg = String(err?.message || err || "");
  if (msg.includes('Cannot use public access on a private store')) return "private";
  if (msg.includes('access must be "public"')) return "public";
  if (msg.includes('access must be "private"')) return "private";
  return null;
}

async function uploadImageToBlob(buffer, pathname, token) {
  // Estratégia:
  // - tenta 1x com o que foi configurado (ou sem "access" se não foi)
  // - se a Vercel reclamar do modo, tenta 1x com o modo exigido
  const configured = getBlobAccess(); // "public" | "private" | null

  const tryPut = async (access) => {
    const opts = { addRandomSuffix: true, token };
    if (access) opts.access = access;
    try {
      return await put(pathname, buffer, opts);
    } catch (err) {
      const accessLabel = access || "(sem access)";
      console.warn(`  Upload Blob falhou (${accessLabel}):`, String(err?.message || err));
      throw err;
    }
  };

  try {
    const blob = await tryPut(configured);
    return blob.url;
  } catch (err) {
    const required = inferRequiredAccessFromError(err);
    if (required && required !== configured) {
      const blob2 = await tryPut(required);
      return blob2.url;
    }
    throw err;
  }
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  if (!databaseUrl) {
    console.error("Defina DATABASE_URL no .env");
    process.exit(1);
  }
  if (!blobToken) {
    console.error("Defina BLOB_READ_WRITE_TOKEN no .env para fazer upload das imagens.");
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  // Carregar todos os perfumes dos 3 catálogos
  const allItems = [];
  for (const { file, source } of CATALOG_FILES) {
    const filePath = path.join(DATA_DIR, file);
    let data;
    try {
      data = JSON.parse(readFileSync(filePath, "utf8"));
    } catch (e) {
      console.error(`Erro ao ler ${file}:`, e.message);
      continue;
    }
    const items = toArray(data).map((item) => ({ ...item, catalogSource: source }));
    allItems.push(...items);
  }

  console.log(`Total de perfumes a processar: ${allItems.length}`);

  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < allItems.length; i++) {
    const item = allItems[i];
    const externalUrl = (item.url || "").trim() || null;
    const title = (item.title || "").trim() || "Sem título";

    if (!externalUrl) {
      skipped++;
      continue;
    }

    try {
      const brand = extractBrandFromTitle(title);
      const [brandRow] = await sql`
        INSERT INTO brands (name, name_key)
        VALUES (${brand.name}, ${brand.key})
        ON CONFLICT (name_key) DO UPDATE SET name = EXCLUDED.name
        RETURNING id
      `;
      const brandId = brandRow?.id;

      const imageUrls = getPerfumeAllImageUrls(item);
      const urlToBlobUrl = new Map();

      // Upload de cada imagem para o Blob
      const basePath = `perfumes/${slug(title)}-${i}`;
      for (let j = 0; j < imageUrls.length; j++) {
        const originalUrl = imageUrls[j];
        try {
          const buffer = await downloadImage(originalUrl);
          if (!buffer || buffer.length === 0) continue;
          const ext = originalUrl.includes(".webp") ? "webp" : originalUrl.includes(".png") ? "png" : "jpg";
          const pathname = `${basePath}/${j}.${ext}`;
          const blobUrl = await uploadImageToBlob(buffer, pathname, blobToken);
          urlToBlobUrl.set(originalUrl, blobUrl);
        } catch (err) {
          console.warn(`  Imagem ${j} falhou (${originalUrl?.slice(0, 50)}...):`, err.message);
        }
      }

      // Substituir image_url nas variants pelas URLs do Blob
      const variants = (item.variants || []).map((v) => {
        const v2 = { ...v };
        if (v.image_url) {
          const full = v.image_url.startsWith("//") ? "https:" + v.image_url : v.image_url;
          if (urlToBlobUrl.has(full)) v2.image_url = urlToBlobUrl.get(full);
        }
        return v2;
      });

      const notes = item.notes || null;
      const description = typeof item.description === "string" ? item.description.trim() || null : null;

      const [row] = await sql`
        INSERT INTO perfumes (brand_id, external_url, title, description, catalog_source, notes, variants, updated_at)
        VALUES (${brandId}, ${externalUrl}, ${title}, ${description}, ${item.catalogSource}, ${JSON.stringify(
          notes,
        )}, ${JSON.stringify(variants)}, now())
        ON CONFLICT (external_url) DO UPDATE SET
          brand_id = EXCLUDED.brand_id,
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          notes = EXCLUDED.notes,
          variants = EXCLUDED.variants,
          updated_at = now()
        RETURNING id
      `;
      const perfumeId = row?.id;

      if (perfumeId) {
        await sql`DELETE FROM perfume_images WHERE perfume_id = ${perfumeId}`;
        const blobUrlsOrdered = [];
        (item.images || []).forEach((url) => {
          const full = url?.startsWith("//") ? "https:" + url : url;
          if (urlToBlobUrl.has(full)) blobUrlsOrdered.push(urlToBlobUrl.get(full));
        });
        (item.variants || []).forEach((v) => {
          if (!v?.image_url) return;
          const full = v.image_url.startsWith("//") ? "https:" + v.image_url : v.image_url;
          if (urlToBlobUrl.has(full) && !blobUrlsOrdered.includes(urlToBlobUrl.get(full)))
            blobUrlsOrdered.push(urlToBlobUrl.get(full));
        });
        for (let p = 0; p < blobUrlsOrdered.length; p++) {
          await sql`
            INSERT INTO perfume_images (perfume_id, url, position) VALUES (${perfumeId}, ${blobUrlsOrdered[p]}, ${p})
          `;
        }
      }

      inserted++;
      if ((i + 1) % 50 === 0) console.log(`  Processados ${i + 1}/${allItems.length}`);
    } catch (err) {
      errors++;
      console.error(`Erro no perfume "${title}":`, err.message);
    }
  }

  console.log("\nConcluído.");
  console.log(`  Inseridos/atualizados: ${inserted}`);
  console.log(`  Ignorados (sem URL): ${skipped}`);
  console.log(`  Erros: ${errors}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
