import { sql } from "../db.js";
import { getBearerToken, verifyToken } from "../auth.js";

const ALLOWED_STATUS = ["pending", "shipped", "completed", "canceled"];

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

function mapOrderRow(o) {
  return {
    id: o.id,
    status: o.status,
    total: Number(o.total || 0),
    created_at: o.created_at,
    updated_at: o.updated_at,
    user_id: o.user_id ?? null,
    customer_name: o.customer_name ?? null,
    customer_email: o.customer_email ?? null,
    customer_phone: o.user_phone ?? null,
  };
}

function mapOrderItemRow(i) {
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
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });

  try {
    const statusParam =
      typeof req.query?.status === "string"
        ? req.query.status.trim().toLowerCase()
        : "";
    const hasFilter =
      statusParam && statusParam !== "all" && ALLOWED_STATUS.includes(statusParam);

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

    const list = (rows || []).map(mapOrderRow);
    return res.status(200).json(list);
  } catch (err) {
    console.error("GET /api/admin/orders error:", err);
    return res.status(500).json({ error: "Erro ao listar pedidos" });
  }
}

async function handleUpdateStatus(id, req, res) {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });

  try {
    if (!id) return res.status(400).json({ error: "ID do pedido é obrigatório" });

    const body = req.body || {};
    const status =
      typeof body.status === "string"
        ? body.status.trim().toLowerCase()
        : "";

    if (!ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({
        error:
          "Status inválido. Use: pending, shipped, completed ou canceled.",
      });
    }

    const [existing] = await sql`
      SELECT id FROM orders WHERE id = ${id}
    `;
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

    return res.status(200).json(mapOrderRow(updated));
  } catch (err) {
    console.error("PATCH /api/admin/orders/:id/status error:", err);
    return res.status(500).json({ error: "Erro ao atualizar status do pedido" });
  }
}

async function handleGetOne(id, req, res) {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  if (!sql) return res.status(503).json({ error: "Banco de dados não configurado" });

  try {
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
      // Retrocompatibilidade: se as colunas unit_price/total_price ainda não existirem
      if (itemsErr?.code !== "42703") throw itemsErr;
      items = await sql`
        SELECT id, order_id, perfume_id, title, quantity
        FROM order_items
        WHERE order_id = ${id}
        ORDER BY title
      `;
      // Valores serão normalizados em mapOrderItemRow (Number(undefined) -> 0)
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
      items: (items || []).map(mapOrderItemRow),
    });
  } catch (err) {
    console.error("GET /api/admin/orders/:id error:", err);
    return res.status(500).json({ error: "Erro ao buscar pedido" });
  }
}

export async function handleAdminOrders(pathSegments, req, res) {
  if (!sql)
    return res
      .status(503)
      .json({ error: "Banco de dados não configurado" });

  const id =
    Array.isArray(pathSegments) && pathSegments.length > 0
      ? pathSegments[0]
      : undefined;
  const second = Array.isArray(pathSegments) && pathSegments.length > 1
    ? pathSegments[1]
    : undefined;

  if (!id) {
    if (req.method !== "GET")
      return res.status(405).json({ error: "Método não permitido" });
    return await handleList(req, res);
  }

  if (!second && req.method === "GET") {
    return await handleGetOne(id, req, res);
  }

  if (second === "status" && req.method === "PATCH") {
    return await handleUpdateStatus(id, req, res);
  }

  // Futuro: detalhes do pedido etc.
  return res.status(405).json({ error: "Método não permitido" });
}

