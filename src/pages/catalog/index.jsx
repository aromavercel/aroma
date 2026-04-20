import React, { useEffect, useMemo, useState } from "react";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import Breadcumb from "@/components/common/Breadcumb";
import MetaComponent from "@/components/common/MetaComponent";
import CatalogSidebar from "@/components/catalog/CatalogSidebar";
import CatalogFilterModal from "@/components/catalog/CatalogFilterModal";
import { FILTER_OFFCANVAS_ID } from "@/components/catalog/CatalogFilterModal";
import PerfumeCard from "@/components/catalog/PerfumeCard";
import PerfumeCardList from "@/components/catalog/PerfumeCardList";
import LayoutHandler from "@/components/products/LayoutHandler";
import Features from "@/components/products/Features";
import { getPerfumesList } from "@/api/perfumes";
import { getPerfumeDisplayData, getBrandOptions, normalizeBrandKey } from "@/data/perfumes";

const ITEMS_PER_PAGE = 24;
const metadata = {
  title: "Catálogo de Perfumes | Aroma",
  description: "Navegue pelo catálogo de perfumes.",
};

const SORT_OPTIONS = [
  { value: "default", label: "Padrão" },
  { value: "title-asc", label: "Nome (A–Z)" },
  { value: "title-desc", label: "Nome (Z–A)" },
  { value: "price-asc", label: "Preço (menor)" },
  { value: "price-desc", label: "Preço (maior)" },
];

export default function CatalogPage() {
  const [perfumesList, setPerfumesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [brandValue, setBrandValue] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [priceMinInput, setPriceMinInput] = useState("");
  const [priceMaxInput, setPriceMaxInput] = useState("");
  const [sortValue, setSortValue] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeLayout, setActiveLayout] = useState(3);

  useEffect(() => {
    setLoading(true);
    setLoadError(null);
    getPerfumesList()
      .then((list) => {
        setPerfumesList(list);
      })
      .catch((err) => {
        setLoadError(err.message || "Erro ao carregar catálogo.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const brandOptions = useMemo(() => getBrandOptions(perfumesList), [perfumesList]);

  const countByBrand = useMemo(() => {
    const counts = {};
    const keys = (perfumesList || []).map((p) =>
      normalizeBrandKey(getPerfumeDisplayData(p).brand),
    );
    (brandOptions || []).forEach((opt) => {
      if (opt.value === "all") counts.all = perfumesList.length;
      else counts[opt.value] = keys.filter((k) => k === opt.value).length;
    });
    return counts;
  }, [perfumesList, brandOptions]);

  const filteredAndSorted = useMemo(() => {
    let list = [...perfumesList];

    if (brandValue !== "all") {
      list = list.filter((p) => {
        const d = getPerfumeDisplayData(p);
        const key = String(brandValue || "").trim();
        const bKey = normalizeBrandKey(d.brand);
        return bKey === key;
      });
    }

    const search = searchValue.trim().toLowerCase();
    if (search) {
      list = list.filter((p) => {
        const d = getPerfumeDisplayData(p);
        return (
          (d.title && d.title.toLowerCase().includes(search)) ||
          (d.description && d.description.toLowerCase().includes(search))
        );
      });
    }

    const minP = priceMinInput === "" ? null : Number(priceMinInput);
    const maxP = priceMaxInput === "" ? null : Number(priceMaxInput);
    if (minP != null && !Number.isNaN(minP)) {
      list = list.filter((p) => getPerfumeDisplayData(p).priceMin >= minP);
    }
    if (maxP != null && !Number.isNaN(maxP)) {
      list = list.filter((p) => getPerfumeDisplayData(p).priceMin <= maxP);
    }

    if (sortValue === "title-asc") {
      list.sort((a, b) =>
        getPerfumeDisplayData(a).title.localeCompare(getPerfumeDisplayData(b).title)
      );
    } else if (sortValue === "title-desc") {
      list.sort((a, b) =>
        getPerfumeDisplayData(b).title.localeCompare(getPerfumeDisplayData(a).title)
      );
    } else if (sortValue === "price-asc") {
      list.sort(
        (a, b) =>
          getPerfumeDisplayData(a).priceMin - getPerfumeDisplayData(b).priceMin
      );
    } else if (sortValue === "price-desc") {
      list.sort(
        (a, b) =>
          getPerfumeDisplayData(b).priceMin - getPerfumeDisplayData(a).priceMin
      );
    }

    return list;
  }, [
    perfumesList,
    brandValue,
    searchValue,
    priceMinInput,
    priceMaxInput,
    sortValue,
  ]);

  const totalFiltered = filteredAndSorted.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / ITEMS_PER_PAGE));
  const pageIndex = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedList = useMemo(() => {
    const start = (pageIndex - 1) * ITEMS_PER_PAGE;
    return filteredAndSorted.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSorted, pageIndex]);

  const appliedFilterCount =
    (brandValue !== "all" ? 1 : 0) +
    (searchValue.trim() ? 1 : 0) +
    (priceMinInput !== "" ? 1 : 0) +
    (priceMaxInput !== "" ? 1 : 0);

  const handleClearFilters = () => {
    setBrandValue("all");
    setSearchValue("");
    setPriceMinInput("");
    setPriceMaxInput("");
    setCurrentPage(1);
  };

  const setBrandAndPage = (v) => {
    setBrandValue(v);
    setCurrentPage(1);
  };
  const setSearchAndPage = (v) => {
    setSearchValue(v);
    setCurrentPage(1);
  };
  const setPriceMinAndPage = (v) => {
    setPriceMinInput(v);
    setCurrentPage(1);
  };
  const setPriceMaxAndPage = (v) => {
    setPriceMaxInput(v);
    setCurrentPage(1);
  };
  const setSortAndPage = (v) => {
    setSortValue(v);
    setCurrentPage(1);
  };

  const sortLabel =
    SORT_OPTIONS.find((o) => o.value === sortValue)?.label || "Padrão";

  const sidebarProps = {
    brandOptions,
    brandValue,
    onBrandChange: setBrandAndPage,
    searchValue,
    onSearchChange: setSearchAndPage,
    priceMin: priceMinInput,
    priceMax: priceMaxInput,
    onPriceMinChange: setPriceMinAndPage,
    onPriceMaxChange: setPriceMaxAndPage,
    totalCount: totalFiltered,
    countByBrand,
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="catalog-page">
      <Topbar />
      <Header1 />
      <Breadcumb pageName="Catálogo" pageTitle="Catálogo de perfumes" />

      <section className="flat-spacing-24 tf-section">
        <div className="container">
          <div className="row">
            {/* Sidebar (estilo shop-left-sidebar) - visível em desktop */}
            <div className="col-xl-3 d-none d-xl-block">
              <div className="canvas-sidebar sidebar-filter canvas-filter left">
                <div className="canvas-wrapper">
                  <CatalogSidebar {...sidebarProps} />
                </div>
              </div>
            </div>

            <div className="col-xl-9">
              {/* Barra de controle: botão Filtro (mobile), ordenação, seletor de visualização */}
              <div className="tf-shop-control">
                <div className="tf-group-filter">
                  <a
                    href={`#${FILTER_OFFCANVAS_ID}`}
                    data-bs-toggle="offcanvas"
                    aria-controls={FILTER_OFFCANVAS_ID}
                    className="tf-btn-filter d-flex d-xl-none"
                  >
                    <span className="icon icon-filter" />
                    <span className="text">Filtro</span>
                  </a>
                  <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
                    <div className="btn-select">
                      <span className="text-sort-value">{sortLabel}</span>
                      <span className="icon icon-arr-down" />
                    </div>
                    <ul className="dropdown-menu">
                      {SORT_OPTIONS.map((opt) => (
                        <li key={opt.value}>
                          <button
                            type="button"
                            className={`select-item dropdown-item border-0 bg-transparent w-100 text-start ${
                              sortValue === opt.value ? "active" : ""
                            }`}
                            onClick={() => setSortAndPage(opt.value)}
                          >
                            <span className="text-value-item">{opt.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <ul className="tf-control-layout">
                  <LayoutHandler
                    setActiveLayout={setActiveLayout}
                    activeLayout={activeLayout}
                  />
                </ul>
              </div>

              {/* Filtros aplicados (tags + limpar) - mantido do catálogo atual */}
              {appliedFilterCount > 0 && (
                <div className="meta-filter-shop">
                  <div className="count-text">
                    <span className="count">{totalFiltered}</span> perfume
                    {totalFiltered !== 1 ? "s" : ""} encontrado
                    {totalFiltered !== 1 ? "s" : ""}
                  </div>
                  <div id="applied-filters" className="d-flex flex-wrap gap-2 align-items-center">
                    {brandValue !== "all" && (
                      <span
                        className="filter-tag"
                        onClick={() => setBrandAndPage("all")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) =>
                          e.key === "Enter" && setBrandAndPage("all")
                        }
                      >
                        <span className="remove-tag icon-close" /> Marca:{" "}
                        {brandOptions.find((o) => o.value === brandValue)?.label ??
                          brandValue}
                      </span>
                    )}
                    {searchValue.trim() && (
                      <span
                        className="filter-tag"
                        onClick={() => setSearchAndPage("")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) =>
                          e.key === "Enter" && setSearchAndPage("")
                        }
                      >
                        <span className="remove-tag icon-close" /> Busca
                      </span>
                    )}
                    {priceMinInput !== "" && (
                      <span
                        className="filter-tag"
                        onClick={() => setPriceMinAndPage("")}
                        role="button"
                        tabIndex={0}
                      >
                        <span className="remove-tag icon-close" /> Preço mín.
                      </span>
                    )}
                    {priceMaxInput !== "" && (
                      <span
                        className="filter-tag"
                        onClick={() => setPriceMaxAndPage("")}
                        role="button"
                        tabIndex={0}
                      >
                        <span className="remove-tag icon-close" /> Preço máx.
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="remove-all-filters"
                    onClick={handleClearFilters}
                  >
                    <i className="icon icon-close" /> Limpar filtros
                  </button>
                </div>
              )}

              {/* Área de listagem: lista ou grid conforme activeLayout */}
              <div className="wrapper-control-shop">
                {loading ? (
                  <div className="col-12 text-center py-5">
                    <p className="text-muted">Carregando catálogo...</p>
                  </div>
                ) : loadError ? (
                  <div className="col-12 text-center py-5">
                    <p className="text-muted">{loadError}</p>
                    <button
                      type="button"
                      className="btn btn-outline-primary mt-2"
                      onClick={() => {
                        setLoadError(null);
                        setLoading(true);
                        getPerfumesList()
                          .then(setPerfumesList)
                          .catch((err) =>
                            setLoadError(
                              err.message || "Erro ao carregar catálogo."
                            )
                          )
                          .finally(() => setLoading(false));
                      }}
                    >
                      Tentar novamente
                    </button>
                  </div>
                ) : activeLayout === 1 ? (
                  <div className="tf-list-layout wrapper-shop" id="listLayout">
                    {paginatedList.length ? (
                      paginatedList.map((perfume, i) => (
                        <PerfumeCardList
                          key={perfume.id ?? `perfume-${i}`}
                          perfume={perfume}
                        />
                      ))
                    ) : (
                      <div className="col-12 text-center py-5">
                        <p className="text-muted">
                          Nenhum perfume encontrado com os filtros selecionados.
                        </p>
                        <button
                          type="button"
                          className="btn btn-outline-primary mt-2"
                          onClick={handleClearFilters}
                        >
                          Limpar filtros
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className={`wrapper-shop tf-grid-layout tf-col-${activeLayout}`}
                    id="gridLayout"
                  >
                    {paginatedList.length ? (
                      paginatedList.map((perfume, i) => (
                        <PerfumeCard
                          key={perfume.id ?? `perfume-${i}`}
                          perfume={perfume}
                        />
                      ))
                    ) : (
                      <div className="col-12 text-center py-5">
                        <p className="text-muted">
                          Nenhum perfume encontrado com os filtros selecionados.
                        </p>
                        <button
                          type="button"
                          className="btn btn-outline-primary mt-2"
                          onClick={handleClearFilters}
                        >
                          Limpar filtros
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Paginação - mantida do catálogo original */}
                {totalPages > 1 && (
                  <nav
                    className="wg-pagination d-flex align-items-center justify-content-center gap-2 mt-4 flex-wrap"
                    aria-label="Paginação do catálogo"
                  >
                    <ul className="d-flex flex-wrap align-items-center gap-1 list-unstyled mb-0">
                      <li>
                        <button
                          type="button"
                          className="pagination-item"
                          disabled={pageIndex <= 1}
                          onClick={() => setCurrentPage(1)}
                        >
                          Primeira
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="pagination-item"
                          disabled={pageIndex <= 1}
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                        >
                          Anterior
                        </button>
                      </li>
                      <li>
                        <span className="text-sm text-main-2 px-2">
                          Página {pageIndex} de {totalPages}
                        </span>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="pagination-item"
                          disabled={pageIndex >= totalPages}
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                        >
                          Próxima
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="pagination-item"
                          disabled={pageIndex >= totalPages}
                          onClick={() => setCurrentPage(totalPages)}
                        >
                          Última
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CatalogFilterModal {...sidebarProps} />
      <Features />
      <Footer1 />
      </div>
    </>
  );
}
