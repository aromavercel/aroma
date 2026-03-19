"use client";

import ListProducts from "./ListProducts";
import GridProducts from "./GridProducts";
import FilterModal from "./FilterModal";
import LayoutHandler from "./LayoutHandler";
import { useEffect, useReducer, useRef, useState } from "react";
import { initialState, reducer } from "@/reducer/filterReducer";
import { products } from "@/data/products";

export default function Products7({ fullWidth = false }) {
  const [activeLayout, setActiveLayout] = useState(4);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const [loadedItems, setLoadedItems] = useState([]);

  const {
    price,
    availability,
    color,
    size,
    brands,

    filtered,
    sortingOption,
    sorted,

    currentPage,
    itemPerPage,
  } = state;

  const allProps = {
    ...state,
    setPrice: (value) => dispatch({ type: "SET_PRICE", payload: value }),

    setColor: (value) => {
      value == color
        ? dispatch({ type: "SET_COLOR", payload: "All" })
        : dispatch({ type: "SET_COLOR", payload: value });
    },
    setSize: (value) => {
      value == size
        ? dispatch({ type: "SET_SIZE", payload: "All" })
        : dispatch({ type: "SET_SIZE", payload: value });
    },
    setAvailability: (value) => {
      dispatch({ type: "SET_AVAILABILITY", payload: value });
    },

    setBrands: (newBrand) => {
      dispatch({ type: "SET_BRANDS", payload: newBrand });
    },
    removeBrand: (newBrand) => {
      const updated = [...brands].filter((brand) => brand != newBrand);

      dispatch({ type: "SET_BRANDS", payload: updated });
    },
    setSortingOption: (value) =>
      dispatch({ type: "SET_SORTING_OPTION", payload: value }),

    setCurrentPage: (value) =>
      dispatch({ type: "SET_CURRENT_PAGE", payload: value }),
    setItemPerPage: (value) => {
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 }),
        dispatch({ type: "SET_ITEM_PER_PAGE", payload: value });
    },
    clearFilter: () => {
      dispatch({ type: "CLEAR_FILTER" });
    },
  };

  useEffect(() => {
    let filteredArrays = [];

    if (brands !== "All") {
      const filteredByBrands = [...products].filter((elm) =>
        elm.filterBrands.includes(brands)
      );
      filteredArrays = [...filteredArrays, filteredByBrands];
    }
    if (availability !== "All") {
      const filteredByavailability = [...products].filter(
        (elm) => availability === elm.inStock
      );
      filteredArrays = [...filteredArrays, filteredByavailability];
    }
    if (color !== "All") {
      const filteredByColor = [...products].filter((elm) =>
        elm.filterColor.includes(color)
      );
      filteredArrays = [...filteredArrays, filteredByColor];
    }
    if (size !== "All" && size !== "Free Size") {
      const filteredBysize = [...products].filter((elm) =>
        elm.filterSizes.includes(size)
      );
      filteredArrays = [...filteredArrays, filteredBysize];
    }

    const filteredByPrice = [...products].filter(
      (elm) => elm.price >= price[0] && elm.price <= price[1]
    );
    filteredArrays = [...filteredArrays, filteredByPrice];

    const commonItems = [...products].filter((item) =>
      filteredArrays.every((array) => array.includes(item))
    );
    dispatch({ type: "SET_FILTERED", payload: commonItems });
  }, [price, availability, color, size, brands]);

  useEffect(() => {
    if (sortingOption === "Price Ascending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => a.price - b.price),
      });
    } else if (sortingOption === "Price Descending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => b.price - a.price),
      });
    } else if (sortingOption === "Title Ascending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => a.title.localeCompare(b.title)),
      });
    } else if (sortingOption === "Title Descending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => b.title.localeCompare(a.title)),
      });
    } else {
      dispatch({ type: "SET_SORTED", payload: filtered });
    }
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  }, [filtered, sortingOption]);

  useEffect(() => {
    setLoadedItems(sorted.slice(0, 8));
  }, [sorted]);

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setLoadedItems((pre) => [
        ...pre,
        ...sorted.slice(pre.length, pre.length + 4),
      ]);
      setLoading(false);
    }, 1000);
  };

  const elementRef = useRef(null);
  const elementRef2 = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleLoad();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleLoad();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (elementRef2.current) {
      observer.observe(elementRef2.current);
    }

    return () => {
      if (elementRef2.current) {
        observer.unobserve(elementRef2.current);
      }
    };
  }, []);

  return (
    <>
      <section className="flat-spacing-24">
        <div className={fullWidth ? "container-full" : "container"}>
          <div className="tf-shop-control">
            <div className="tf-group-filter">
              <a
                href="#filterShop"
                data-bs-toggle="offcanvas"
                aria-controls="filterShop"
                className="tf-btn-filter"
              >
                <span className="icon icon-filter" />
                <span className="text">Filter</span>
              </a>
              <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
                <div className="btn-select">
                  <span className="text-sort-value">{sortingOption}</span>
                  <span className="icon icon-arr-down" />
                </div>
                <div className="dropdown-menu">
                  {[
                    "Sort by (Default)",
                    "Title Ascending",
                    "Title Descending",
                    "Price Ascending",
                    "Price Descending",
                  ].map((elm, i) => (
                    <div
                      key={i}
                      className={`select-item ${
                        sortingOption == elm ? "active" : ""
                      }`}
                      onClick={() => allProps.setSortingOption(elm)}
                      data-sort-value="best-selling"
                    >
                      <span className="text-value-item">{elm}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ul className="tf-control-layout">
              <LayoutHandler
                setActiveLayout={setActiveLayout}
                activeLayout={activeLayout}
              />
            </ul>
          </div>
          <div className="wrapper-control-shop">
            {(availability != "All" ||
              brands != "All" ||
              price.join("-") != [20, 300].join("-") ||
              color != "All" ||
              size != "All") && (
              <div className="meta-filter-shop" style={{}}>
                <div id="product-count-grid" className="count-text">
                  <span className="count">{sorted.length}</span>Product
                  {sorted.length > 1 ? "s" : ""} found
                </div>

                <div id="applied-filters">
                  {availability != "All" ? (
                    <span
                      className="filter-tag"
                      onClick={() => allProps.setAvailability("All")}
                    >
                      <span className="remove-tag icon-close"></span>{" "}
                      Availability: {availability ? "In Stock" : "Unavailable"}
                    </span>
                  ) : (
                    ""
                  )}
                  {brands != "All" ? (
                    <span
                      className="filter-tag"
                      onClick={() => allProps.setBrands("All")}
                    >
                      <span
                        className="remove-tag icon-close"
                        data-filter="brand"
                      />
                      Brand: {brands}
                    </span>
                  ) : (
                    ""
                  )}
                  {price.join("-") != [20, 300].join("-") ? (
                    <span
                      className="filter-tag"
                      onClick={() => allProps.setPrice([20, 300])}
                    >
                      <span
                        className="remove-tag icon-close"
                        data-filter="price"
                      />
                      Price: ${price[0]} - ${price[1]}
                    </span>
                  ) : (
                    ""
                  )}
                  {color != "All" ? (
                    <span
                      className="filter-tag"
                      onClick={() => allProps.setColor("All")}
                    >
                      <span
                        className="remove-tag icon-close"
                        data-filter="color"
                      />
                      Color: {color}
                    </span>
                  ) : (
                    ""
                  )}
                  {size != "All" ? (
                    <span
                      className="filter-tag"
                      onClick={() => allProps.setSize("All")}
                    >
                      <span
                        className="remove-tag icon-close"
                        data-filter="size"
                      />
                      Size: {size}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                {availability != "All" ||
                brands != "All" ||
                price.join("-") != [20, 300].join("-") ||
                color != "All" ||
                size != "All" ? (
                  <button
                    id="remove-all"
                    className="remove-all-filters"
                    onClick={allProps.clearFilter}
                  >
                    <i className="icon icon-close" /> Clear all filter
                  </button>
                ) : (
                  ""
                )}
              </div>
            )}

            {activeLayout == 1 ? (
              <div className="tf-list-layout wrapper-shop" id="listLayout">
                <ListProducts products={loadedItems} />
                {/* Pagination */}
                {!(loadedItems.length >= sorted.length) && (
                  <div className="wd-load" ref={elementRef}>
                    <button
                      id="loadMoreListBtn"
                      className={`tf-btn btn-out-line-dark2 tf-loading loadmore  ${
                        loading ? "loading" : ""
                      } `}
                    >
                      <span className="text">Load more</span>
                      <div className="spinner-circle">
                        <span className="spinner-circle1 spinner-child" />
                        <span className="spinner-circle2 spinner-child" />
                        <span className="spinner-circle3 spinner-child" />
                        <span className="spinner-circle4 spinner-child" />
                        <span className="spinner-circle5 spinner-child" />
                        <span className="spinner-circle6 spinner-child" />
                        <span className="spinner-circle7 spinner-child" />
                        <span className="spinner-circle8 spinner-child" />
                        <span className="spinner-circle9 spinner-child" />
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div
                className={`wrapper-shop tf-grid-layout tf-col-${activeLayout}`}
                id="gridLayout"
              >
                <GridProducts products={loadedItems} />
                {/* Pagination */}
                {!(loadedItems.length >= sorted.length) && (
                  <div
                    className="wd-load d-flex justify-content-center"
                    ref={elementRef2}
                  >
                    <button
                      id="loadMoreGridBtn"
                      className={`tf-btn btn-out-line-dark2 tf-loading loadmore  ${
                        loading ? "loading" : ""
                      } `}
                    >
                      <span className="text">Load more</span>
                      <div className="spinner-circle">
                        <span className="spinner-circle1 spinner-child" />
                        <span className="spinner-circle2 spinner-child" />
                        <span className="spinner-circle3 spinner-child" />
                        <span className="spinner-circle4 spinner-child" />
                        <span className="spinner-circle5 spinner-child" />
                        <span className="spinner-circle6 spinner-child" />
                        <span className="spinner-circle7 spinner-child" />
                        <span className="spinner-circle8 spinner-child" />
                        <span className="spinner-circle9 spinner-child" />
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <FilterModal allProps={allProps} />
    </>
  );
}
