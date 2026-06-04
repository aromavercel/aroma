import { describe, it, expect, vi, beforeEach } from "vitest";
import { normalizePhone } from "../../lib/phone.js";
import { cartPhoneCandidateKeys } from "../../lib/cartPhoneResolve.js";
import { readCartListFromLocalStorage } from "../../src/utils/cartStorage.js";
import { normalizePublicUrl } from "../../src/utils/normalizeImageUrl.js";

describe("lib/phone e carrinho", () => {
  it("normalizePhone retorna E.164 para celular BR", () => {
    expect(normalizePhone("11987654321")).toMatch(/^\+55/);
  });

  it("normalizePhone lança para número inválido", () => {
    expect(() => normalizePhone("123")).toThrow(/inválido/i);
  });

  it("cartPhoneCandidateKeys gera variantes sem duplicar", () => {
    const keys = cartPhoneCandidateKeys("11987654321", "+5511987654321");
    expect(keys.length).toBeGreaterThan(0);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe("src/utils/cartStorage", () => {
  /** @type {Record<string, string>} */
  let store;

  beforeEach(() => {
    store = {};
    vi.stubGlobal("localStorage", {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => {
        store[k] = String(v);
      },
      removeItem: (k) => {
        delete store[k];
      },
      clear: () => {
        store = {};
      },
    });
  });

  it("readCartListFromLocalStorage retorna [] quando vazio", () => {
    expect(readCartListFromLocalStorage()).toEqual([]);
  });

  it("readCartListFromLocalStorage restaura itens válidos", () => {
    store.cartList = JSON.stringify([{ id: "1", perfume_id: "p1", quantity: 2 }]);
    expect(readCartListFromLocalStorage()).toHaveLength(1);
  });
});

describe("src/utils/normalizeImageUrl", () => {
  it("normalizePublicUrl torna caminhos relativos absolutos no site", () => {
    expect(normalizePublicUrl("images/foo.jpg")).toBe("/images/foo.jpg");
    expect(normalizePublicUrl("/api/x")).toBe("/api/x");
    expect(normalizePublicUrl("https://cdn/x")).toBe("https://cdn/x");
    expect(normalizePublicUrl("//cdn/x")).toBe("https://cdn/x");
  });
});
