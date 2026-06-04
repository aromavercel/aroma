import { describe, it, expect } from "vitest";
import {
  brazilPhoneNationalDigits,
  formatBrazilPhoneDisplay,
  isValidBrazilPhoneInput,
  filterPhoneDigitsInput,
} from "../../src/utils/brPhone.js";

describe("src/utils/brPhone", () => {
  it("brazilPhoneNationalDigits remove 55 e limita a 11 dígitos", () => {
    expect(brazilPhoneNationalDigits("+55 (11) 98765-4321")).toBe("11987654321");
    expect(brazilPhoneNationalDigits("5511987654321")).toBe("11987654321");
  });

  it("formatBrazilPhoneDisplay formata celular com 9", () => {
    expect(formatBrazilPhoneDisplay("11987654321")).toBe("+55 (11) 9 8765-4321");
  });

  it("isValidBrazilPhoneInput valida celular BR", () => {
    expect(isValidBrazilPhoneInput("11987654321")).toBe(true);
    expect(isValidBrazilPhoneInput("123")).toBe(false);
  });

  it("filterPhoneDigitsInput limita comprimento", () => {
    expect(filterPhoneDigitsInput("abc12def34", 5)).toBe("1234");
  });
});
