import { describe, it, expect, vi, beforeEach } from "vitest";
import { createMockReq, createMockRes } from "../helpers/mockHttp.js";

const { mockSql } = vi.hoisted(() => ({ mockSql: vi.fn() }));
vi.mock("../../lib/db.js", () => ({ sql: mockSql }));

const cartUserMocks = vi.hoisted(() => ({
  resolveCartUser: vi.fn(),
}));

vi.mock("../../lib/api/cartUser.js", () => cartUserMocks);

const authMocks = vi.hoisted(() => ({
  getBearerToken: vi.fn(() => "token"),
  verifyToken: vi.fn(() => ({ userId: "user-1" })),
}));

vi.mock("../../lib/auth.js", () => authMocks);

import { handlePostOrders } from "../../lib/api/ordersCreate.js";
import { handleMyOrders } from "../../lib/api/myOrders.js";

const cartCtx = { userId: "user-1", userPhone: "+5511987654321" };

describe("API pedidos", () => {
  beforeEach(() => {
    mockSql.mockReset();
    cartUserMocks.resolveCartUser.mockResolvedValue(cartCtx);
    authMocks.verifyToken.mockReturnValue({ userId: "user-1" });
  });

  describe("POST /api/orders (checkout)", () => {
    it("rejeita carrinho vazio", async () => {
      mockSql.mockResolvedValueOnce([]);
      const res = createMockRes();
      await handlePostOrders(
        createMockReq({
          method: "POST",
          body: { subtotal: 100, total: 100 },
          headers: { authorization: "Bearer t" },
        }),
        res,
      );
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/Carrinho vazio/i);
    });

    it("rejeita subtotal inválido", async () => {
      mockSql
        .mockResolvedValueOnce([{ id: "cart-1" }])
        .mockResolvedValueOnce([{ perfume_id: "p1", quantity: 1, title: "X", variants: [] }]);
      const res = createMockRes();
      await handlePostOrders(
        createMockReq({
          method: "POST",
          body: { subtotal: "abc", total: 100 },
          headers: { authorization: "Bearer t" },
        }),
        res,
      );
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/Subtotal inválido/i);
    });

    it("cria pedido e limpa carrinho", async () => {
      mockSql
        .mockResolvedValueOnce([{ id: "cart-1" }])
        .mockResolvedValueOnce([
          {
            perfume_id: "p1",
            variant_option: "",
            unit_price: 50,
            quantity: 2,
            title: "Perfume",
            variants: [],
          },
        ])
        .mockResolvedValueOnce([{ id: "order-new" }])
        .mockResolvedValue(undefined)
        .mockResolvedValue(undefined)
        .mockResolvedValue(undefined);
      const res = createMockRes();
      await handlePostOrders(
        createMockReq({
          method: "POST",
          body: {
            subtotal: 100,
            total: 100,
            shipping_name: "Cliente",
            shipping_city: "São Paulo",
          },
          headers: { authorization: "Bearer t" },
        }),
        res,
      );
      expect(res.statusCode).toBe(201);
      expect(res.body.orderId).toBe("order-new");
      expect(res.body.ok).toBe(true);
    });
  });

  describe("GET /api/my-orders (cliente)", () => {
    it("lista pedidos do usuário autenticado", async () => {
      mockSql
        .mockResolvedValueOnce([
          {
            id: "ord-1",
            user_id: "user-1",
            status: "pending",
            total: 80,
            created_at: "2026-01-01",
            updated_at: "2026-01-01",
          },
        ])
        .mockResolvedValueOnce([
          { order_id: "ord-1", title: "Perfume A", quantity: 1 },
        ]);
      const res = createMockRes();
      await handleMyOrders([], createMockReq({ headers: { authorization: "Bearer t" } }), res);
      expect(res.statusCode).toBe(200);
      expect(res.body[0].id).toBe("ord-1");
      expect(res.body[0].items[0].title).toBe("Perfume A");
    });

    it("detalhe retorna 404 para pedido de outro usuário", async () => {
      mockSql.mockResolvedValueOnce([]);
      const res = createMockRes();
      await handleMyOrders(
        ["ord-outro"],
        createMockReq({ method: "GET", headers: { authorization: "Bearer t" } }),
        res,
      );
      expect(res.statusCode).toBe(404);
    });
  });
});
