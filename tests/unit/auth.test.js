import { describe, it, expect, beforeEach } from "vitest";
import {
  signToken,
  verifyToken,
  getBearerToken,
  hashPassword,
  verifyPassword,
} from "../../lib/auth.js";
import { createMockReq } from "../helpers/mockHttp.js";

describe("lib/auth", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "test-secret-for-unit-tests";
  });

  it("signToken e verifyToken round-trip com userId", () => {
    const token = signToken({ userId: "abc-123", phone: "11999999999" });
    const payload = verifyToken(token);
    expect(payload.userId).toBe("abc-123");
    expect(payload.phone).toBe("11999999999");
  });

  it("verifyToken retorna null para token inválido", () => {
    expect(verifyToken("invalid.token.here")).toBeNull();
    expect(verifyToken(null)).toBeNull();
  });

  it("getBearerToken extrai token do header Authorization", () => {
    const req = createMockReq({
      headers: { authorization: "Bearer my-jwt-token" },
    });
    expect(getBearerToken(req)).toBe("my-jwt-token");
    expect(getBearerToken(createMockReq())).toBeNull();
    expect(
      getBearerToken(createMockReq({ headers: { authorization: "Basic x" } })),
    ).toBeNull();
  });

  it("hashPassword e verifyPassword", async () => {
    const hash = await hashPassword("senha-segura-123");
    expect(hash).not.toBe("senha-segura-123");
    expect(await verifyPassword("senha-segura-123", hash)).toBe(true);
    expect(await verifyPassword("outra", hash)).toBe(false);
  });
});
