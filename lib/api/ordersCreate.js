import { sql } from "../db.js";
import { resolveCartUser } from "./cartUser.js";

function parseBody(req) {
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

/** POST /api/orders — cria pedido a partir do carrinho (Vercel + mesmo contrato do Express). */
export async function handlePostOrders(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }
  const cartUser = await resolveCartUser(req, res);
  if (!cartUser) return;
  if (!sql) {
    return res.status(503).json({ error: "Banco de dados não configurado" });
  }
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

    const body = parseBody(req);
    const shippingName = typeof body.shipping_name === "string" ? body.shipping_name.trim() || null : null;
    const shippingAddress =
      typeof body.shipping_address === "string" ? body.shipping_address.trim() || null : null;
    const shippingStreetNumber =
      typeof body.shipping_street_number === "string"
        ? body.shipping_street_number.trim() || null
        : null;
    const shippingComplement =
      typeof body.shipping_complement === "string" ? body.shipping_complement.trim() || null : null;
    const shippingDeliveryInstructions =
      typeof body.shipping_delivery_instructions === "string"
        ? body.shipping_delivery_instructions.trim() || null
        : null;
    const shippingCity = typeof body.shipping_city === "string" ? body.shipping_city.trim() || null : null;
    const shippingState = typeof body.shipping_state === "string" ? body.shipping_state.trim() || null : null;
    const shippingZipcode =
      typeof body.shipping_zipcode === "string" ? body.shipping_zipcode.trim() || null : null;
    const shippingCountry =
      typeof body.shipping_country === "string" ? body.shipping_country.trim() || null : null;
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
          shipping_name, shipping_address, shipping_street_number, shipping_complement, shipping_delivery_instructions,
          shipping_city, shipping_state, shipping_zipcode, shipping_country, shipping_phone, payment_method)
        VALUES (${cartUser.userId}, ${cartUser.userPhone}, 'pending', ${subtotal}, ${discount}, ${shipping}, ${tax}, ${total},
          ${shippingName}, ${shippingAddress}, ${shippingStreetNumber}, ${shippingComplement}, ${shippingDeliveryInstructions},
          ${shippingCity}, ${shippingState}, ${shippingZipcode}, ${shippingCountry}, ${shippingPhone}, ${paymentMethod})
        RETURNING id
      `;
      orderId = order?.id;
      if (!orderId) throw new Error("Falha ao criar pedido");
    } catch (orderErr) {
      if (orderErr?.code === "42P01") {
        return res.status(503).json({ error: "Tabela de pedidos não disponível. Execute as migrations." });
      }
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
}
