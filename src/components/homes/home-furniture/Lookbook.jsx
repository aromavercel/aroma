"use client";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { furnitureProducts } from "@/data/products";
import { useContextElement } from "@/context/Context";

export default function Lookbook() {
  const { setQuickViewItem } = useContextElement();
  useEffect(() => {
    const customDropdown = () => {
      const updateDropdownClass = () => {
        const dropdowns = document.querySelectorAll(".dropdown-custom");

        dropdowns.forEach((dropdown) => {
          if (window.innerWidth <= 991) {
            dropdown.classList.add("dropup");
            dropdown.classList.remove("dropend");
          } else {
            dropdown.classList.add("dropend");
            dropdown.classList.remove("dropup");
          }
        });
      };

      updateDropdownClass();
      window.addEventListener("resize", updateDropdownClass);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("resize", updateDropdownClass);
      };
    };

    customDropdown();
  }, []);

  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h4 className="title">Inspired by You</h4>
          <p className="desc text-main text-md">
            Find everything you need to recreate the look.
          </p>
        </div>
        <div className="banner-lookbook">
          <img
            className="img-banner"
            src="/images/banner/furniture.jpg"
            alt=""
            width={1440}
            height={688}
          />
          <div className="lookbook-item position1">
            <div className="dropdown dropup-center dropdown-custom">
              <div
                role="dialog"
                className="tf-pin-btn"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span />
              </div>
              <div className="dropdown-menu">
                {furnitureProducts.slice(0, 1).map((product) => (
                  <div
                    key={product.id}
                    className="loobook-product style-row mb-3"
                  >
                    <div className="img-style">
                      <img
                        alt={product.title}
                        src={product.imgSrc}
                        width={product.width}
                        height={product.height}
                      />
                    </div>
                    <div className="content d-flex justify-content-between align-items-center">
                      <div className="info">
                        <Link
                          to={`/product-detail/${product.id}`}
                          className="text-md fw-medium text-line-clamp-1 link text-decoration-none"
                        >
                          {product.title}
                        </Link>
                        <p className="price-wrap text-md fw-medium mb-0">
                          <span className="price-new text-primary">
                            ${product.price.toLocaleString()}
                            <span className="zero">.00</span>
                          </span>
                          <span className="price-old text-decoration-line-through ms-2">
                            ${product.oldPrice.toLocaleString()}
                            <span className="zero">.00</span>
                          </span>
                        </p>
                      </div>
                      <a
                        href="#quickView"
                        data-bs-toggle="modal"
                        onClick={() => setQuickViewItem(product)}
                        className="btn-lookbook hover-tooltip text-decoration-none"
                      >
                        <i className="icon-view bi bi-eye" />
                        <span className="tooltip position-absolute bg-dark text-white p-1 rounded small">
                          Quick view
                        </span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lookbook-item position2">
            <div className="dropdown dropup-center dropdown-custom">
              <div
                role="dialog"
                className="tf-pin-btn"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span />
              </div>
              <div className="dropdown-menu">
                {furnitureProducts.slice(1, 2).map((product) => (
                  <div
                    key={product.id}
                    className="loobook-product style-row mb-3"
                  >
                    <div className="img-style">
                      <img
                        alt={product.title}
                        src={product.imgSrc}
                        width={product.width}
                        height={product.height}
                      />
                    </div>
                    <div className="content d-flex justify-content-between align-items-center">
                      <div className="info">
                        <Link
                          to={`/product-detail/${product.id}`}
                          className="text-md fw-medium text-line-clamp-1 link text-decoration-none"
                        >
                          {product.title}
                        </Link>
                        <p className="price-wrap text-md fw-medium mb-0">
                          <span className="price-new text-primary">
                            ${product.price.toLocaleString()}
                            <span className="zero">.00</span>
                          </span>{" "}
                          <span className="price-old text-decoration-line-through ms-2">
                            ${product.oldPrice.toLocaleString()}
                            <span className="zero">.00</span>
                          </span>
                        </p>
                      </div>
                      <a
                        href="#quickView"
                        data-bs-toggle="modal"
                        onClick={() => setQuickViewItem(product)}
                        className="btn-lookbook hover-tooltip text-decoration-none"
                      >
                        <i className="icon-view bi bi-eye" />
                        <span className="tooltip position-absolute bg-dark text-white p-1 rounded small">
                          Quick view
                        </span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lookbook-item position3">
            <div className="dropdown dropup-center dropdown-custom dropend">
              <div
                role="dialog"
                className="tf-pin-btn"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span />
              </div>
              <div className="dropdown-menu" style={{}}>
                {furnitureProducts.slice(2, 3).map((product) => (
                  <div
                    key={product.id}
                    className="loobook-product style-row mb-3"
                  >
                    <div className="img-style">
                      <img
                        alt={product.title}
                        src={product.imgSrc}
                        width={product.width}
                        height={product.height}
                      />
                    </div>
                    <div className="content d-flex justify-content-between align-items-center">
                      <div className="info">
                        <Link
                          to={`/product-detail/${product.id}`}
                          className="text-md fw-medium text-line-clamp-1 link text-decoration-none"
                        >
                          {product.title}
                        </Link>
                        <p className="price-wrap text-md fw-medium mb-0">
                          <span className="price-new text-primary">
                            ${product.price.toLocaleString()}
                            <span className="zero">.00</span>
                          </span>{" "}
                          <span className="price-old text-decoration-line-through ms-2">
                            ${product.oldPrice.toLocaleString()}
                            <span className="zero">.00</span>
                          </span>
                        </p>
                      </div>
                      <a
                        href="#quickView"
                        data-bs-toggle="modal"
                        onClick={() => setQuickViewItem(product)}
                        className="btn-lookbook hover-tooltip text-decoration-none"
                      >
                        <i className="icon-view bi bi-eye" />
                        <span className="tooltip position-absolute bg-dark text-white p-1 rounded small">
                          Quick view
                        </span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
