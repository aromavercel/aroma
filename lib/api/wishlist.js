import { sql } from "../db.js";
import { getBearerToken, verifyToken } from "../auth.js";
import { randomUUID } from "crypto";

function toUuidKey(val) {
  if (val == null) return "";
  const s = String(val).trim().toLowerCase();
  return s.length > 10 ? s : "";
}

let wishlistSchemaReadyPromise = null;
async function ensureWishlistSchema() {
  if (!sql) return;
  if (wishlistSchemaReadyPromise) return wishlistSchemaReadyPromise;
  wishlistSchemaReadyPromise = (async () => {
    // Garante que a schema de wishlist exista também na Vercel (evita 42P01 quando migrations não rodaram).
    // Não dependemos de extensões (pgcrypto/uuid-ossp) — os UUIDs são gerados no Node.
    await sql`
      CREATE TABLE IF NOT EXISTS wishlists (
        id         UUID PRIMARY KEY,
        user_phone VARCHAR(50) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS wishlist_items (
        id          UUID PRIMARY KEY,
        wishlist_id UUID NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
        perfume_id  UUID NOT NULL REFERENCES perfumes(id) ON DELETE CASCADE,
        created_at  TIMESTAMP DEFAULT now(),
        UNIQUE (wishlist_id, perfume_id)
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_wishlist_items_wishlist_id ON wishlist_items (wishlist_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_wishlist_items_perfume_id ON wishlist_items (perfume_id)`;
  })().catch((err) => {
    // Permite tentar novamente em outro cold start se falhar.
    wishlistSchemaReadyPromise = null;
    throw err;
  });
  return wishlistSchemaReadyPromise;
}

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
  // Fallback: para contas sem telefone (ex.: login social), ainda permitimos wishlist.
  // Usamos um identificador estável no campo `user_phone` sem quebrar schema legado.
  const userPhoneKey = phone || `user:${String(user.id)}`;
  return { userId: user.id, userPhone: userPhoneKey };
}

async function listWishlist(req, res) {
  const wUser = await getWishlistUser(req, res);
  if (!wUser) return;
  try {
    await ensureWishlistSchema();
    const [wishlist] = await sql`SELECT id FROM wishlists WHERE user_phone = ${wUser.userPhone}`;
    if (!wishlist) return res.status(200).json({ items: [] });

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
      rows = await sql`
        SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants, p.image_2_url
        FROM wishlist_items wi
        JOIN perfumes p ON p.id = wi.perfume_id
        WHERE wi.wishlist_id = ${wishlist.id}
        ORDER BY p.title
      `;
    }

    if (!rows?.length) return res.status(200).json({ items: [] });

    const idSet = new Set((rows || []).map((r) => toUuidKey(r.id)).filter(Boolean));
    const allImages =
      await sql`SELECT perfume_id, url, position FROM perfume_images ORDER BY perfume_id, position`;
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
        active: p.ativo === true || p.ativo == null,
        outOfStock: p.esgotado === true,
      };
    });
    return res.status(200).json({ items });
  } catch (err) {
    console.error("GET /api/wishlist error:", err);
    return res.status(500).json({ error: "Erro ao carregar lista de desejos" });
  }
}

async function addWishlistItem(req, res) {
  const wUser = await getWishlistUser(req, res);
  if (!wUser) return;
  try {
    await ensureWishlistSchema();
    const body = req.body || {};
    const perfumeId = (body.perfume_id ?? body.perfumeId ?? "").toString().trim();
    if (!perfumeId) return res.status(400).json({ error: "perfume_id é obrigatório" });
    const [perfume] = await sql`SELECT id FROM perfumes WHERE id = ${perfumeId}`;
    if (!perfume) return res.status(404).json({ error: "Perfume não encontrado" });

    let [wishlist] = await sql`SELECT id FROM wishlists WHERE user_phone = ${wUser.userPhone}`;
    if (!wishlist) {
      const newId = randomUUID();
      const [created] =
        await sql`INSERT INTO wishlists (id, user_phone) VALUES (${newId}, ${wUser.userPhone}) RETURNING id`;
      wishlist = created;
    }

    const itemId = randomUUID();
    await sql`
      INSERT INTO wishlist_items (id, wishlist_id, perfume_id)
      VALUES (${itemId}, ${wishlist.id}, ${perfumeId})
      ON CONFLICT (wishlist_id, perfume_id) DO NOTHING
    `;
    await sql`UPDATE wishlists SET updated_at = now() WHERE id = ${wishlist.id}`;
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("POST /api/wishlist/items error:", err);
    return res.status(500).json({ error: "Erro ao adicionar à lista de desejos" });
  }
}

async function deleteWishlistItem(perfumeId, req, res) {
  const wUser = await getWishlistUser(req, res);
  if (!wUser) return;
  try {
    await ensureWishlistSchema();
    const id = (perfumeId ?? "").toString().trim();
    if (!id) return res.status(400).json({ error: "perfume_id é obrigatório" });
    const [wishlist] = await sql`SELECT id FROM wishlists WHERE user_phone = ${wUser.userPhone}`;
    if (wishlist) {
      await sql`DELETE FROM wishlist_items WHERE wishlist_id = ${wishlist.id} AND perfume_id = ${id}`;
      await sql`UPDATE wishlists SET updated_at = now() WHERE id = ${wishlist.id}`;
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/wishlist/items error:", err);
    return res.status(500).json({ error: "Erro ao remover da lista de desejos" });
  }
}

export async function handleWishlist(pathSegments, req, res) {
  const [first, second] = pathSegments || [];

  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });

  try {
    if (!first) {
      if (req.method === "GET") return await listWishlist(req, res);
      return res.status(405).json({ error: "Método não permitido" });
    }

    if (first === "items") {
      if (!second && req.method === "POST") return await addWishlistItem(req, res);
      if (second && req.method === "DELETE") return await deleteWishlistItem(second, req, res);
      return res.status(405).json({ error: "Método não permitido" });
    }

    return res.status(404).json({ error: "Rota não encontrada" });
  } catch (err) {
    console.error("API wishlist error:", err);
    return res.status(500).json({ error: "Erro ao processar wishlist" });
  }
}

