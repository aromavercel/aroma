import { describe, it, expect, vi, beforeEach } from "vitest";
import { createMockReq, createMockRes } from "../helpers/mockHttp.js";

const { mockSql } = vi.hoisted(() => ({ mockSql: vi.fn() }));
vi.mock("../../lib/db.js", () => ({ sql: mockSql }));

const authMocks = vi.hoisted(() => ({
  getBearerToken: vi.fn(() => "token"),
  verifyToken: vi.fn(() => ({ userId: "user-1" })),
}));

vi.mock("../../lib/auth.js", () => authMocks);

import { handleWishlist } from "../../lib/api/wishlist.js";

function mockSqlByQuery(impl) {
  mockSql.mockImplementation(async (strings, ...values) => {
    const q = Array.isArray(strings) ? strings.join(" ") : String(strings);
    return impl(q, values);
  });
}

describe("API wishlist (cliente logado)", () => {
  beforeEach(() => {
    mockSql.mockReset();
    authMocks.verifyToken.mockReturnValue({ userId: "user-1" });
  });

  it("GET retorna lista vazia sem wishlist", async () => {
    mockSqlByQuery((q) => {
      if (q.includes("FROM users")) return [{ id: "user-1", phone: "11987654321" }];
      if (q.includes("FROM wishlists")) return [];
      return undefined;
    });
    const res = createMockRes();
    await handleWishlist([], createMockReq({ method: "GET", headers: { authorization: "Bearer t" } }), res);
    expect(res.statusCode).toBe(200);
    expect(res.body.items).toEqual([]);
  });

  it("POST items exige perfume_id", async () => {
    mockSqlByQuery((q) => {
      if (q.includes("FROM users")) return [{ id: "user-1", phone: "11987654321" }];
      return undefined;
    });
    const res = createMockRes();
    await handleWishlist(
      ["items"],
      createMockReq({
        method: "POST",
        body: {},
        headers: { authorization: "Bearer t" },
      }),
      res,
    );
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/perfume_id/i);
  });

  it("POST items adiciona perfume existente", async () => {
    mockSqlByQuery((q) => {
      if (q.includes("FROM users")) return [{ id: "user-1", phone: "11987654321" }];
      if (q.includes("FROM perfumes")) return [{ id: "perf-1" }];
      if (q.includes("FROM wishlists")) return [{ id: "wl-1" }];
      return undefined;
    });
    const res = createMockRes();
    await handleWishlist(
      ["items"],
      createMockReq({
        method: "POST",
        body: { perfume_id: "perf-1" },
        headers: { authorization: "Bearer t" },
      }),
      res,
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it("DELETE items remove favorito", async () => {
    mockSqlByQuery((q) => {
      if (q.includes("FROM users")) return [{ id: "user-1", phone: "11987654321" }];
      if (q.includes("FROM wishlists")) return [{ id: "wl-1" }];
      return undefined;
    });
    const res = createMockRes();
    await handleWishlist(
      ["items", "perf-1"],
      createMockReq({
        method: "DELETE",
        headers: { authorization: "Bearer t" },
      }),
      res,
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it("retorna 401 sem login", async () => {
    authMocks.verifyToken.mockReturnValue(null);
    const res = createMockRes();
    await handleWishlist([], createMockReq({ method: "GET" }), res);
    expect(res.statusCode).toBe(401);
  });
});
