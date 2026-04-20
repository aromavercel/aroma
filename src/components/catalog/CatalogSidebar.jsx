"use client";

import React from "react";

export default function CatalogSidebar({
  brandOptions,
  brandValue,
  onBrandChange,
  searchValue,
  onSearchChange,
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
  totalCount,
  countByBrand,
}) {
  return (
    <>
      <div className="canvas-header d-flex d-xl-none">
        <span className="title">Filtro</span>
        <span className="icon-close icon-close-popup close-filter" />
      </div>
      <div className="canvas-body">
        <div className="widget-facet">
          <div
            className="facet-title text-xl fw-medium"
            data-bs-target="#catalog-collections"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="catalog-collections"
          >
            <span>Marca</span>
            <span className="icon icon-arrow-up" />
          </div>
          <div id="catalog-collections" className="collapse show">
            <ul className="collapse-body list-categories current-scrollbar">
              {(brandOptions || []).map((opt) => {
                const count = countByBrand?.[opt.value] ?? null;
                return (
                  <li key={opt.value} className="cate-item">
                    <button
                      type="button"
                      className={`text-sm link cate-link w-100 text-start border-0 bg-transparent p-0 ${
                        brandValue === opt.value ? "fw-medium text-primary" : ""
                      }`}
                      onClick={() => onBrandChange(opt.value)}
                    >
                      <span>{opt.label}</span>
                      {count != null && <span className="count">({count})</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="widget-facet">
          <div
            className="facet-title text-xl fw-medium"
            data-bs-target="#catalog-search"
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="catalog-search"
          >
            <span>Buscar</span>
            <span className="icon icon-arrow-up" />
          </div>
          <div id="catalog-search" className="collapse show">
            <div className="collapse-body">
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Nome ou descrição..."
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="widget-facet">
          <div
            className="facet-title text-xl fw-medium"
            data-bs-target="#catalog-price"
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="catalog-price"
          >
            <span>Preço</span>
            <span className="icon icon-arrow-up" />
          </div>
          <div id="catalog-price" className="collapse show">
            <div className="collapse-body widget-price filter-price">
              <div className="box-value-price d-flex flex-wrap align-items-center gap-2">
                <span className="text-sm">Preço (R$):</span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  style={{ width: "5rem" }}
                  min={0}
                  step={10}
                  placeholder="Mín"
                  value={priceMin === "" ? "" : priceMin}
                  onChange={(e) =>
                    onPriceMinChange(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                />
                <span>-</span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  style={{ width: "5rem" }}
                  min={0}
                  step={10}
                  placeholder="Máx"
                  value={priceMax === "" ? "" : priceMax}
                  onChange={(e) =>
                    onPriceMaxChange(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {totalCount != null && (
          <div className="widget-facet">
            <p className="text-sm text-main-2 mb-0">
              <strong>{totalCount}</strong>{" "}
              {totalCount === 1 ? "perfume" : "perfumes"} encontrado
              {totalCount !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
