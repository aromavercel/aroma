import React from "react";

const SORT_OPTIONS = [
  { value: "default", label: "Padrão" },
  { value: "title-asc", label: "Nome (A–Z)" },
  { value: "title-desc", label: "Nome (Z–A)" },
  { value: "price-asc", label: "Preço (menor)" },
  { value: "price-desc", label: "Preço (maior)" },
];

export default function CatalogFilters({
  brandOptions,
  brandValue,
  onBrandChange,
  searchValue,
  onSearchChange,
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
  sortValue,
  onSortChange,
  totalCount,
  appliedCount,
  onClearFilters,
}) {
  const hasFilters = appliedCount > 0;

  return (
    <div className="catalog-filters mb-4">
      <div className="row g-3 align-items-end">
        <div className="col-12 col-md-6 col-lg-3">
          <label className="form-label text-sm text-main-2 mb-1">Marca</label>
          <select
            className="form-select form-select-sm"
            value={brandValue}
            onChange={(e) => onBrandChange(e.target.value)}
          >
            {(brandOptions || []).map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <label className="form-label text-sm text-main-2 mb-1">Buscar</label>
          <input
            type="search"
            className="form-control form-control-sm"
            placeholder="Nome ou descrição..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <label className="form-label text-sm text-main-2 mb-1">Preço mín. (R$)</label>
          <input
            type="number"
            className="form-control form-control-sm"
            min={0}
            step={10}
            value={priceMin === "" ? "" : priceMin}
            onChange={(e) => onPriceMinChange(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <label className="form-label text-sm text-main-2 mb-1">Preço máx. (R$)</label>
          <input
            type="number"
            className="form-control form-control-sm"
            min={0}
            step={10}
            value={priceMax === "" ? "" : priceMax}
            onChange={(e) => onPriceMaxChange(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-2">
          <label className="form-label text-sm text-main-2 mb-1">Ordenar</label>
          <select
            className="form-select form-select-sm"
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="d-flex flex-wrap align-items-center gap-2 mt-3">
        <span className="text-sm text-main-2">
          <strong>{totalCount}</strong> {totalCount === 1 ? "perfume" : "perfumes"}
        </span>
        {hasFilters && onClearFilters && (
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onClearFilters}>
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  );
}
