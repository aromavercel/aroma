import { describe, it, expect, vi, afterEach } from "vitest";
import {
  onlyDigits,
  formatCep,
  isCepComplete,
  fetchAddressByCep,
} from "../../src/utils/cep.js";

describe("src/utils/cep", () => {
  it("onlyDigits e formatCep", () => {
    expect(onlyDigits("01310-100")).toBe("01310100");
    expect(formatCep("01310100")).toBe("01310-100");
    expect(formatCep("01310")).toBe("01310");
  });

  it("isCepComplete exige 8 dígitos", () => {
    expect(isCepComplete("01310-100")).toBe(true);
    expect(isCepComplete("01310")).toBe(false);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetchAddressByCep retorna endereço quando ViaCEP responde ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({
          cep: "01310-100",
          logradouro: "Av. Paulista",
          complemento: "",
          bairro: "Bela Vista",
          localidade: "São Paulo",
          uf: "sp",
        }),
      })),
    );
    const addr = await fetchAddressByCep("01310100");
    expect(addr.city).toBe("São Paulo");
    expect(addr.state).toBe("SP");
    expect(addr.street).toBe("Av. Paulista");
  });

  it("fetchAddressByCep retorna null para CEP incompleto ou erro ViaCEP", async () => {
    expect(await fetchAddressByCep("123")).toBeNull();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ erro: true }),
      })),
    );
    expect(await fetchAddressByCep("00000000")).toBeNull();
  });
});
