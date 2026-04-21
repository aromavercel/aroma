import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import PerfumeCard from "@/components/catalog/PerfumeCard";
import Skeleton from "@/components/common/Skeleton";
import { getSearchData } from "@/api/search";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const metadata = {
  title: "Buscar | Aroma",
  description: "Busque perfumes no catálogo.",
};

export default function SearchPage() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [debounced, setDebounced] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [topBrands, setTopBrands] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q.trim()), 250);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getSearchData({ q: debounced || undefined })
      .then((data) => {
        setTopProducts(data?.topProducts || []);
        setTopBrands(data?.topBrands || []);
        setResults(data?.results || []);
      })
      .catch((err) => setError(err.message || "Erro ao carregar busca"))
      .finally(() => setLoading(false));
  }, [debounced]);

  const showResults = useMemo(() => debounced.length > 0, [debounced]);

  return (
    <>
      <MetaComponent meta={metadata} />
      {/* Cópia 1:1 do antigo SearchModal.jsx, mas como página */}
      <div className="modal popup-search fade show d-block" id="search-page" tabIndex={-1}>
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="header">
              <button
                className="icon-close icon-close-popup"
                aria-label="Close"
                onClick={() => navigate(-1)}
              />
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="looking-for-wrap">
                    <div className="heading">What are you looking for?</div>
                    <form className="form-search" onSubmit={(e) => e.preventDefault()}>
                      <fieldset className="text">
                        <input
                          type="text"
                          placeholder="Search"
                          className=""
                          name="text"
                          tabIndex={0}
                          value={q}
                          onChange={(e) => setQ(e.target.value)}
                          aria-required="true"
                          required
                        />
                      </fieldset>
                      <button className="" type="submit">
                        <i className="icon icon-search" />
                      </button>
                    </form>
                    <div className="popular-searches justify-content-md-center">
                      <div className="text fw-medium">Popular searches:</div>
                      <ul>
                        {(topBrands || []).slice(0, 4).map((b) => (
                          <li key={b.id || b.name}>
                            <button
                              type="button"
                              className="link bg-transparent border-0 p-0"
                              onClick={() => setQ(b.name || "")}
                            >
                              {b.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-10">
                  <div className="featured-product">
                    <div className="text-xl-2 fw-medium featured-product-heading">
                      Featured product
                    </div>
                    {error ? (
                      <div className="text-center py-5">
                        <p className="text-muted">{error}</p>
                      </div>
                    ) : loading ? (
                      <div className="wrapper-shop tf-grid-layout tf-col-4">
                        {Array.from({ length: 4 }).map((_, idx) => (
                          <div key={`sk-${idx}`} className="card-product">
                            <div className="card-product-wrapper">
                              <Skeleton style={{ width: "100%", height: 240 }} />
                            </div>
                            <div className="card-product-info" style={{ paddingTop: 12 }}>
                              <Skeleton variant="text" style={{ width: "70%", marginBottom: 10 }} />
                              <Skeleton variant="text" style={{ width: "40%" }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <Swiper
                          dir="ltr"
                          className="swiper tf-swiper wrap-sw-over"
                          {...{
                            slidesPerView: 2,
                            spaceBetween: 12,
                            speed: 1000,
                            observer: true,
                            observeParents: true,
                            slidesPerGroup: 2,
                            pagination: {
                              el: ".sw-pagination-search",
                              clickable: true,
                            },
                            breakpoints: {
                              768: {
                                slidesPerView: 3,
                                spaceBetween: 12,
                                slidesPerGroup: 3,
                              },
                              1200: {
                                slidesPerView: 4,
                                spaceBetween: 24,
                                slidesPerGroup: 4,
                              },
                            },
                          }}
                          modules={[Pagination]}
                        >
                          {(showResults ? results : topProducts).map((p, i) => (
                            <SwiperSlide key={p.id ?? `s-${i}`} className="swiper-slide">
                              <PerfumeCard perfume={p} />
                            </SwiperSlide>
                          ))}
                          <div className="d-flex d-xl-none sw-dot-default sw-pagination-search justify-content-center" />
                        </Swiper>

                        {showResults && (results || []).length === 0 && (
                          <div className="col-12 text-center py-5">
                            <p className="text-muted">
                              Nenhum resultado para “{debounced}”.
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
}

