import { describe, it, expect } from "vitest";
import {
  slugifyTitle,
  clampInt,
  clampNumber,
  extractBrandFromTitle,
  normalizePerfumeId,
  canonicalPerfumeImageUrl,
  stripVariantImagesNotInGallery,
  perfumesCatalogWhereParams,
  perfumesListOrderByClause,
} from "../../lib/catalogPure.js";

describe("lib/catalogPure", () => {
  it("slugifyTitle remove acentos e normaliza", () => {
    expect(slugifyTitle("  Chanel N°5 — Edição  ")).toBe("chanel-n-5-edicao");
  });

  it("clampInt e clampNumber respeitam limites", () => {
    expect(clampInt("99", { min: 1, max: 50, fallback: 10 })).toBe(50);
    expect(clampInt("x", { min: 1, max: 50, fallback: 10 })).toBe(10);
    expect(clampNumber(-5, { min: 0, max: 100, fallback: 0 })).toBe(0);
  });

  it("extractBrandFromTitle usa texto antes do traço", () => {
    const b = extractBrandFromTitle("Dior - Sauvage 100ml");
    expect(b.name).toBe("Dior");
    expect(b.key).toBe("dior");
  });

  it("normalizePerfumeId aceita só UUID", () => {
    const id = "a1b2c3d4-e5f6-4789-a012-3456789abcde";
    expect(normalizePerfumeId(id)).toBe(id.toLowerCase());
    expect(normalizePerfumeId("meu-slug")).toBe("");
  });

  it("canonicalPerfumeImageUrl prefixa // com https:", () => {
    expect(canonicalPerfumeImageUrl("//cdn.example/img.jpg")).toBe(
      "https://cdn.example/img.jpg",
    );
  });

  it("stripVariantImagesNotInGallery remove image_url fora da galeria", () => {
    const gallery = ["https://site.com/a.jpg"];
    const variants = [
      { option0: "50ml", image_url: "https://site.com/a.jpg" },
      { option0: "100ml", image_url: "https://outro.com/b.jpg" },
    ];
    const out = stripVariantImagesNotInGallery(variants, gallery);
    expect(out[0].image_url).toBe("https://site.com/a.jpg");
    expect(out[1].image_url).toBeUndefined();
  });

  it("perfumesCatalogWhereParams monta ILIKE com %q%", () => {
    const p = perfumesCatalogWhereParams({
      filterByCatalog: true,
      catalog: "normal",
      onlyActive: true,
      filterActive: true,
      filterOutOfStock: false,
      filterByBrand: true,
      brandKey: "dior",
      hasQuery: true,
      q: "sauvage",
    });
    expect(p[8]).toBe("%sauvage%");
  });

  it("perfumesListOrderByClause mapeia ordenação", () => {
    expect(perfumesListOrderByClause("price-asc")).toContain("price_min ASC");
    expect(perfumesListOrderByClause("unknown")).toContain("catalog_source");
  });
});
