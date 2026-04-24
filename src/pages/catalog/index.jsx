import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
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
import { getPerfumesList, getPerfumeFacets } from "@/api/perfumes";
import { getPerfumeDisplayData, normalizeBrandKey } from "@/data/perfumes";
import Skeleton from "@/components/common/Skeleton";

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
  const location = useLocation();
  const [perfumesList, setPerfumesList] = useState([]);
  const [totalCount, setTotalCount] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [loadingTotal, setLoadingTotal] = useState(false);
  const [brandValue, setBrandValue] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [priceMinInput, setPriceMinInput] = useState("");
  const [priceMaxInput, setPriceMaxInput] = useState("");
  const [sortValue, setSortValue] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeLayout, setActiveLayout] = useState(3);
  const [reloadToken, setReloadToken] = useState(0);
  const [brandOptions, setBrandOptions] = useState([{ value: "all", label: "Todas" }]);
  const [countByBrand, setCountByBrand] = useState({ all: 0 });

  const pageIndex = Math.max(1, currentPage);

  // Facets (marcas + contagens) — evita precisar carregar tudo.
  useEffect(() => {
    let cancelled = false;
    getPerfumeFacets({ q: searchValue.trim() })
      .then((data) => {
        if (cancelled) return;
        const brands = Array.isArray(data?.brands) ? data.brands : [];
        const opts = [{ value: "all", label: "Todas" }].concat(
          brands.map((b) => ({
            value: b.key,
            label: b.label,
          })),
        );
        const counts = { all: Number(data?.total || 0) };
        for (const b of brands) {
          counts[b.key] = Number(b.count || 0);
        }
        setBrandOptions(opts);
        setCountByBrand(counts);
      })
      .catch(() => {
        // Se falhar, mantém as opções atuais (não bloqueia o catálogo).
      });
    return () => {
      cancelled = true;
    };
  }, [searchValue]);

  // Lista paginada: busca apenas o necessário para a página aberta.
  useEffect(() => {
    let cancelled = false;
    const offset = (pageIndex - 1) * ITEMS_PER_PAGE;
    setLoading(true);
    setLoadError(null);
    getPerfumesList({
      limit: ITEMS_PER_PAGE,
      offset,
      q: searchValue.trim(),
      brandKey: brandValue !== "all" ? brandValue : null,
      priceMin: priceMinInput,
      priceMax: priceMaxInput,
      sort: sortValue,
      compact: true,
      noTotal: true,
    })
      .then((data) => {
        if (cancelled) return;
        if (data && typeof data === "object" && Array.isArray(data.items)) {
          setPerfumesList(data.items);
          setHasNextPage(Boolean(data.hasNext));
          setTotalCount(data.total == null ? null : Number(data.total || 0));
        } else {
          const list = Array.isArray(data) ? data : [];
          setPerfumesList(list);
          setHasNextPage(list.length >= ITEMS_PER_PAGE);
          setTotalCount(list.length);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(err.message || "Erro ao carregar catálogo.");
        setPerfumesList([]);
        setHasNextPage(false);
        setTotalCount(0);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [pageIndex, brandValue, searchValue, priceMinInput, priceMaxInput, sortValue, reloadToken]);

  // Permite abrir /catalogo?q=termo já com a busca aplicada
  useEffect(() => {
    const params = new URLSearchParams(location.search || "");
    const q = (params.get("q") || "").trim();
    if (q) {
      setSearchValue(q);
      setCurrentPage(1);
    }
    // Se não houver q, não sobrescreve o que o usuário já digitou no catálogo.
  }, [location.search]);

  const paginatedList = useMemo(() => perfumesList, [perfumesList]);
  // Com noTotal, totalCount fica null: NÃO inferir total a partir do tamanho da página
  // (ex.: 24 itens ≠ só 1 página — isso bloqueava Próxima/Última).
  const totalPages =
    totalCount != null
      ? Math.max(1, Math.ceil(Number(totalCount) / ITEMS_PER_PAGE))
      : null;

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

  const ensureTotalCount = async () => {
    if (totalCount != null) return totalCount;
    if (loadingTotal) return null;
    setLoadingTotal(true);
    try {
      const data = await getPerfumesList({
        limit: 1,
        offset: 0,
        q: searchValue.trim(),
        brandKey: brandValue !== "all" ? brandValue : null,
        priceMin: priceMinInput,
        priceMax: priceMaxInput,
        sort: sortValue,
        compact: true,
        noTotal: false,
      });
      if (data && typeof data === "object" && Array.isArray(data.items)) {
        const t = data.total == null ? null : Number(data.total || 0);
        setTotalCount(t);
        return t;
      }
      // fallback compat
      const list = Array.isArray(data) ? data : [];
      setTotalCount(list.length);
      return list.length;
    } catch {
      return null;
    } finally {
      setLoadingTotal(false);
    }
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
    totalCount,
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
                    {totalCount != null ? (
                      <>
                        <span className="count">{totalCount}</span>{" "}
                        {totalCount === 1
                          ? "perfume encontrado"
                          : "perfumes encontrados"}
                      </>
                    ) : (
                      <span className="text-muted">
                        Resultados com os filtros ativos
                      </span>
                    )}
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
                  <div className="py-4">
                    <div className={`wrapper-shop tf-grid-layout tf-col-${activeLayout}`} id="gridLayout">
                      {Array.from({ length: 12 }).map((_, idx) => (
                        <div key={`sk-${idx}`} className="card-product">
                          <div className="card-product-wrapper">
                            <Skeleton style={{ width: "100%", height: 260 }} />
                          </div>
                          <div className="card-product-info" style={{ paddingTop: 12 }}>
                            <Skeleton variant="text" style={{ width: "70%", marginBottom: 10 }} />
                            <Skeleton variant="text" style={{ width: "40%" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : loadError ? (
                  <div className="col-12 text-center py-5">
                    <p className="text-muted">{loadError}</p>
                    <button
                      type="button"
                      className="btn btn-outline-primary mt-2"
                      onClick={() => {
                        // Reforça a tentativa disparando o efeito de carregamento da página atual.
                        setLoadError(null);
                        setReloadToken((t) => t + 1);
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

                {/* Paginação: visível quando há itens (catálogo paginado) ou quando dá para navegar */}
                {(paginatedList.length > 0 ||
                  pageIndex > 1 ||
                  hasNextPage ||
                  (totalPages != null && totalPages > 1)) && (
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
                        <span className="pagination-status">
                          Página {pageIndex}{totalPages ? ` de ${totalPages}` : ""}
                        </span>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="pagination-item"
                          disabled={totalPages ? pageIndex >= totalPages : !hasNextPage}
                          onClick={() =>
                            setCurrentPage((p) => (totalPages ? Math.min(totalPages, p + 1) : p + 1))
                          }
                        >
                          Próxima
                        </button>
                      </li>
                      {totalPages ? (
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
                      ) : (
                        <li>
                          <button
                            type="button"
                            className="pagination-item"
                            disabled={loadingTotal}
                            onClick={async () => {
                              const t = await ensureTotalCount();
                              if (t == null) return;
                              const last = Math.max(1, Math.ceil(t / ITEMS_PER_PAGE));
                              setCurrentPage(last);
                            }}
                          >
                            {loadingTotal ? "Carregando…" : "Última"}
                          </button>
                        </li>
                      )}
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
