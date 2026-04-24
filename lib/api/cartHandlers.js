import { sql } from "../db.js";
import { resolveCartUser } from "./cartUser.js";

function parseJsonBody(req) {
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

/** GET /api/cart */
export async function handleGetCart(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }
  const cartUser = await resolveCartUser(req, res);
  if (!cartUser) return;
  if (!sql) {
    return res.status(503).json({ error: "Banco de dados não configurado" });
  }
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
      const priceNumber =
        dbUnit != null && !Number.isNaN(dbUnit)
          ? dbUnit
          : match?.price_number != null
            ? Number(match.price_number)
            : 0;
      const priceShort = match?.price_short ?? (priceNumber ? `R$ ${Number(priceNumber).toFixed(2)}` : "");
      const lineId = i.cart_item_id ?? i.cartItemId ?? pid;
      return {
        id: lineId != null ? String(lineId) : "",
        cart_item_id: i.cart_item_id != null ? String(i.cart_item_id) : null,
        perfume_id: pid != null ? String(pid) : "",
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
}

/** POST /api/cart/items */
export async function handlePostCartItems(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }
  const cartUser = await resolveCartUser(req, res);
  if (!cartUser) return;
  if (!sql) {
    return res.status(503).json({ error: "Banco de dados não configurado" });
  }
  try {
    const body = parseJsonBody(req);
    const perfumeId = (body.perfume_id ?? body.perfumeId ?? "").toString().trim();
    const quantity = Math.max(1, parseInt(body.quantity, 10) || 1);
    const variantOption = typeof body.variant_option === "string" ? body.variant_option.trim() : "";
    const unitPrice =
      body.unit_price != null && !Number.isNaN(Number(body.unit_price)) ? Number(body.unit_price) : 0;
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
    return res.status(200).json({
      id: updated?.id,
      perfume_id: perfumeId,
      variant_option: variantOption || null,
      quantity: updated?.quantity ?? quantity,
    });
  } catch (err) {
    if (err?.code === "23503") return res.status(404).json({ error: "Perfume não encontrado" });
    console.error("POST /api/cart/items error:", err);
    return res.status(500).json({ error: "Erro ao adicionar ao carrinho" });
  }
}

/** PATCH /api/cart/items/:id */
export async function handlePatchCartItem(req, res, itemId) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Método não permitido" });
  }
  const cartUser = await resolveCartUser(req, res);
  if (!cartUser) return;
  if (!sql) {
    return res.status(503).json({ error: "Banco de dados não configurado" });
  }
  try {
    const id = (itemId ?? "").toString().trim();
    const body = parseJsonBody(req);
    const rawQty = parseInt(body.quantity, 10);
    const quantity = Math.max(0, Number.isFinite(rawQty) ? rawQty : 0);
    if (!id) return res.status(400).json({ error: "id é obrigatório" });
    const [cart] = await sql`SELECT id FROM carts WHERE user_phone = ${cartUser.userPhone}`;
    if (!cart) return res.status(200).json({ ok: true });
    if (quantity === 0) {
      await sql`DELETE FROM cart_items WHERE cart_id = ${cart.id} AND id = ${id}`;
    } else {
      const updated = await sql`
        UPDATE cart_items SET quantity = ${quantity}
        WHERE cart_id = ${cart.id} AND id = ${id}
        RETURNING id
      `;
      if (!updated || updated.length === 0) {
        return res.status(404).json({ error: "Item do carrinho não encontrado" });
      }
    }
    await sql`UPDATE carts SET updated_at = now() WHERE id = ${cart.id}`;
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("PATCH /api/cart/items error:", err);
    return res.status(500).json({ error: "Erro ao atualizar carrinho" });
  }
}

/** DELETE /api/cart/items/:id */
export async function handleDeleteCartItem(req, res, itemId) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Método não permitido" });
  }
  const cartUser = await resolveCartUser(req, res);
  if (!cartUser) return;
  if (!sql) {
    return res.status(503).json({ error: "Banco de dados não configurado" });
  }
  try {
    const id = (itemId ?? "").toString().trim();
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
}
