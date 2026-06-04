import { describe, it, expect, vi, beforeEach } from "vitest";
import { createMockReq, createMockRes } from "../helpers/mockHttp.js";

const { mockSql } = vi.hoisted(() => ({
  mockSql: vi.fn(),
}));

vi.mock("../../lib/db.js", () => ({
  sql: mockSql,
}));

const authMocks = vi.hoisted(() => ({
  getBearerToken: vi.fn(() => "valid-token"),
  verifyToken: vi.fn(() => ({ userId: "admin-user-id" })),
}));

vi.mock("../../lib/auth.js", () => authMocks);

import { handleAdminCheck } from "../../lib/api/adminCheck.js";
import { handleAdminOrders } from "../../lib/api/adminOrders.js";
import { handleAdminUsers } from "../../lib/api/adminUsers.js";

describe("API admin", () => {
  beforeEach(() => {
    mockSql.mockReset();
    authMocks.verifyToken.mockReturnValue({ userId: "admin-user-id" });
  });

  describe("handleAdminCheck", () => {
    it("retorna 401 sem token válido", async () => {
      authMocks.verifyToken.mockReturnValue(null);
      const res = createMockRes();
      await handleAdminCheck(createMockReq(), res);
      expect(res.statusCode).toBe(401);
    });

    it("retorna 403 para usuário não admin", async () => {
      mockSql.mockImplementationOnce(async () => [{ role: "user" }]);
      const res = createMockRes();
      await handleAdminCheck(createMockReq({ headers: { authorization: "Bearer t" } }), res);
      expect(res.statusCode).toBe(403);
      expect(res.body.error).toMatch(/administradores/i);
    });

    it("retorna 200 ok para admin", async () => {
      mockSql.mockImplementationOnce(async () => [{ role: "admin" }]);
      const res = createMockRes();
      await handleAdminCheck(createMockReq({ headers: { authorization: "Bearer t" } }), res);
      expect(res.statusCode).toBe(200);
      expect(res.body.ok).toBe(true);
    });
  });

  describe("handleAdminOrders", () => {
    it("lista pedidos para admin", async () => {
      mockSql
        .mockImplementationOnce(async () => [{ role: "admin" }])
        .mockImplementationOnce(async () => [
          {
            id: "ord-1",
            status: "pending",
            total: "150.00",
            created_at: "2026-01-01",
            updated_at: "2026-01-01",
            user_id: "u1",
            customer_name: "Cliente",
            customer_email: "c@test.com",
            user_phone: "11999999999",
          },
        ]);
      const res = createMockRes();
      await handleAdminOrders([], createMockReq({ headers: { authorization: "Bearer t" } }), res);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].status).toBe("pending");
      expect(res.body[0].total).toBe(150);
    });

    it("rejeita status inválido no PATCH", async () => {
      mockSql
        .mockImplementationOnce(async () => [{ role: "admin" }])
        .mockImplementationOnce(async () => [{ id: "ord-1" }]);
      const res = createMockRes();
      await handleAdminOrders(
        ["ord-1", "status"],
        createMockReq({
          method: "PATCH",
          headers: { authorization: "Bearer t" },
          body: { status: "invalido" },
        }),
        res,
      );
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/Status inválido/i);
    });

    it("atualiza status válido", async () => {
      mockSql
        .mockImplementationOnce(async () => [{ role: "admin" }])
        .mockImplementationOnce(async () => [{ id: "ord-1" }])
        .mockImplementationOnce(async () => [
          {
            id: "ord-1",
            status: "shipped",
            total: 100,
            created_at: "2026-01-01",
            updated_at: "2026-01-02",
            user_id: "u1",
            user_phone: null,
          },
        ]);
      const res = createMockRes();
      await handleAdminOrders(
        ["ord-1", "status"],
        createMockReq({
          method: "PATCH",
          headers: { authorization: "Bearer t" },
          body: { status: "shipped" },
        }),
        res,
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe("shipped");
    });
  });

  describe("handleAdminUsers", () => {
    it("lista usuários para admin", async () => {
      mockSql
        .mockImplementationOnce(async () => [{ role: "admin" }])
        .mockImplementationOnce(async () => [
          {
            id: "u1",
            email: "a@test.com",
            name: "Admin",
            phone: null,
            role: "admin",
            created_at: "2026-01-01",
            updated_at: "2026-01-01",
            last_activity_at: null,
          },
        ]);
      const res = createMockRes();
      await handleAdminUsers([], createMockReq({ headers: { authorization: "Bearer t" } }), res);
      expect(res.statusCode).toBe(200);
      expect(res.body[0].email).toBe("a@test.com");
    });
  });
});
