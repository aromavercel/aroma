import { describe, it, expect, vi, beforeEach } from "vitest";
import { createMockReq, createMockRes } from "../helpers/mockHttp.js";

const { mockSql } = vi.hoisted(() => ({ mockSql: vi.fn() }));
vi.mock("../../lib/db.js", () => ({ sql: mockSql }));

const cartUserMocks = vi.hoisted(() => ({
  resolveCartUser: vi.fn(),
}));

vi.mock("../../lib/api/cartUser.js", () => cartUserMocks);

import {
  handleGetCart,
  handlePostCartItems,
  handlePatchCartItem,
  handleDeleteCartItem,
} from "../../lib/api/cartHandlers.js";

const cartCtx = { userId: "user-1", userPhone: "+5511987654321" };

describe("API carrinho (cliente)", () => {
  beforeEach(() => {
    mockSql.mockReset();
    cartUserMocks.resolveCartUser.mockResolvedValue(cartCtx);
  });

  it("GET retorna items vazios sem carrinho", async () => {
    mockSql.mockResolvedValueOnce([]);
    const res = createMockRes();
    await handleGetCart(createMockReq({ headers: { authorization: "Bearer t" } }), res);
    expect(res.statusCode).toBe(200);
    expect(res.body.items).toEqual([]);
  });

  it("GET mapeia itens com preço da variante", async () => {
    mockSql
      .mockResolvedValueOnce([{ id: "cart-1" }])
      .mockResolvedValueOnce([
        {
          cart_item_id: "line-1",
          perfume_id: "perf-1",
          variant_option: "50ml",
          unit_price: 89.9,
          quantity: 2,
          title: "Perfume X",
          variants: [{ option0: "50ml", price_number: 89.9, price_short: "R$ 89,90" }],
        },
      ])
      .mockResolvedValueOnce([{ perfume_id: "perf-1", url: "/img.jpg" }]);
    const res = createMockRes();
    await handleGetCart(createMockReq({ headers: { authorization: "Bearer t" } }), res);
    expect(res.statusCode).toBe(200);
    expect(res.body.items[0].quantity).toBe(2);
    expect(res.body.items[0].price).toBe(89.9);
  });

  it("POST exige perfume_id", async () => {
    const res = createMockRes();
    await handlePostCartItems(
      createMockReq({ method: "POST", body: {}, headers: { authorization: "Bearer t" } }),
      res,
    );
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/perfume_id/i);
  });

  it("POST retorna 404 se perfume não existe", async () => {
    mockSql.mockResolvedValueOnce([]);
    const res = createMockRes();
    await handlePostCartItems(
      createMockReq({
        method: "POST",
        body: { perfume_id: "missing" },
        headers: { authorization: "Bearer t" },
      }),
      res,
    );
    expect(res.statusCode).toBe(404);
  });

  it("PATCH remove item quando quantity é 0", async () => {
    mockSql
      .mockResolvedValueOnce([{ id: "cart-1" }])
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce(undefined);
    const res = createMockRes();
    await handlePatchCartItem(
      createMockReq({
        method: "PATCH",
        body: { quantity: 0 },
        headers: { authorization: "Bearer t" },
      }),
      res,
      "line-1",
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it("DELETE exige id", async () => {
    const res = createMockRes();
    await handleDeleteCartItem(
      createMockReq({ method: "DELETE", headers: { authorization: "Bearer t" } }),
      res,
      "",
    );
    expect(res.statusCode).toBe(400);
  });
});
