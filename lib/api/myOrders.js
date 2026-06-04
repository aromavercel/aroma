import { sql } from "../db.js";
import { getBearerToken, verifyToken } from "../auth.js";

async function requireUser(req, res) {
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
  return payload;
}

function mapOrderRow(o, lineItems = []) {
  return {
    id: o.id,
    status: o.status,
    total: Number(o.total || 0),
    created_at: o.created_at,
    updated_at: o.updated_at,
    items: lineItems.map((i) => ({
      title: typeof i.title === "string" ? i.title : "",
      quantity: Number(i.quantity || 0),
    })),
  };
}

function mapItemRow(i) {
  return {
    id: i.id,
    perfume_id: i.perfume_id,
    title: i.title,
    quantity: Number(i.quantity || 0),
    unit_price: Number(i.unit_price || 0),
    total_price: Number(i.total_price || 0),
  };
}

async function handleList(req, res) {
  const payload = await requireUser(req, res);
  if (!payload) return;
  try {
    const rows = await sql`
      SELECT id, user_id, user_phone, status, total, created_at, updated_at
      FROM orders
      WHERE user_id = ${payload.userId}
      ORDER BY created_at DESC
    `;
    const orderIds = (rows || []).map((r) => r.id).filter(Boolean);
    const itemsByOrderId = new Map();
    if (orderIds.length > 0) {
      const itemRows = await sql`
        SELECT order_id, title, quantity
        FROM order_items
        WHERE order_id = ANY(${orderIds})
        ORDER BY order_id, title
      `;
      for (const row of itemRows || []) {
        const oid = row.order_id;
        if (!itemsByOrderId.has(oid)) itemsByOrderId.set(oid, []);
        itemsByOrderId.get(oid).push(row);
      }
    }
    const list = (rows || []).map((o) =>
      mapOrderRow(o, itemsByOrderId.get(o.id) || []),
    );
    return res.status(200).json(list);
  } catch (err) {
    console.error("GET /api/my-orders error:", err);
    return res.status(500).json({ error: "Erro ao listar pedidos" });
  }
}

async function handleGetOne(id, req, res) {
  const payload = await requireUser(req, res);
  if (!payload) return;
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
             shipping_street_number,
             shipping_complement,
             shipping_delivery_instructions,
             shipping_city,
             shipping_state,
             shipping_zipcode,
             shipping_country,
             shipping_phone,
             payment_method,
             created_at,
             updated_at,
             user_id
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
        shipping_street_number: order.shipping_street_number ?? null,
        shipping_complement: order.shipping_complement ?? null,
        shipping_delivery_instructions: order.shipping_delivery_instructions ?? null,
        shipping_city: order.shipping_city ?? null,
        shipping_state: order.shipping_state ?? null,
        shipping_zipcode: order.shipping_zipcode ?? null,
        shipping_country: order.shipping_country ?? null,
        shipping_phone: order.shipping_phone ?? null,
        payment_method: order.payment_method ?? null,
        created_at: order.created_at,
        updated_at: order.updated_at,
      },
      items: (items || []).map(mapItemRow),
    });
  } catch (err) {
    console.error("GET /api/my-orders/:id error:", err);
    return res.status(500).json({ error: "Erro ao buscar pedido" });
  }
}

export async function handleMyOrders(pathSegments, req, res) {
  const id =
    Array.isArray(pathSegments) && pathSegments.length > 0
      ? pathSegments[0]
      : undefined;

  if (!id) {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Método não permitido" });
    }
    return handleList(req, res);
  }

  if (req.method === "GET") {
    return handleGetOne(id, req, res);
  }

  return res.status(405).json({ error: "Método não permitido" });
}
