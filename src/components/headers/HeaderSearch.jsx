"use client";
import { products40 } from "@/data/products";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function HeaderSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(products40);
  useEffect(() => {
    if (searchQuery) {
      setSearchResult(
        products40.filter((elm) =>
          elm.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setSearchResult(products40);
    }
  }, [searchQuery]);

  return (
    <div className="tf-form-search">
      <form className="form-search">
        <input
          type="text"
          placeholder="Search product"
          tabIndex={0}
          aria-required="true"
          required
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="btn-search">
          <i className="icon icon-search" />
        </button>
      </form>
      <div className="search-suggests-results">
        <div className="search-suggests-results-inner">
          {!searchResult.length ? (
            <div className="text-center py-1">
              No results found for{" "}
              <span className="fw-bold">"{searchQuery}"</span>
            </div>
          ) : (
            <ul>
              {searchResult.map((product) => (
                <li key={product.id}>
                  <Link
                    className="search-result-item"
                    to={`/product-detail/${product.id}`}
                  >
                    <div className="img-box">
                      <img
                        className="lazyload"
                        data-src={product.imgSrc}
                        alt={product.title}
                        src={product.imgSrc}
                        width={684}
                        height={972}
                      />
                    </div>
                    <div className="box-content">
                      <p className="title link">{product.title}</p>
                      <div className="price">
                        <span className="new-price">
                          ${product.price.toFixed(2)}
                        </span>{" "}
                        {product.oldPrice && (
                          <span className="old-price">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
