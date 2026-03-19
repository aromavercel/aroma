import React from "react";

import { Link } from "react-router-dom";
export default function Compare() {
  return (
    <section className="flat-spacing-15 pt-0">
      <div className="container">
        <div className="tf-compare-table">
          <div className="tf-compare-row tf-compare-grid">
            <div className="tf-compare-col d-md-block d-none" />
            <div className="tf-compare-col">
              <div className="tf-compare-item">
                <Link className="tf-compare-image" to={`/product-detail/1`}>
                  <img
                    className="lazyload"
                    src="/images/products/fashion/compare-1.jpg"
                    alt="img-compare"
                    width={320}
                    height={407}
                  />
                </Link>
                <div className="content">
                  <Link
                    className="tf-compare-title link text-md fw-medium"
                    to={`/product-detail/1`}
                  >
                    Boxy T-shirt
                  </Link>
                  <p className="price-wrap fw-medium text-md">
                    <span className="price-new text-primary">$130.00</span>
                    <span className="price-old text-dark">$130.00</span>
                  </p>
                  <div className="tf-compare-btn">
                    <a
                      href="#shoppingCart"
                      data-bs-toggle="offcanvas"
                      className="tf-btn animate-btn w-100"
                    >
                      Add to Cart
                    </a>
                  </div>
                </div>
                <div className="tf-compare-remove">
                  <span className="tf-btn-icon line d-inline-flex">
                    <i className="icon-close" />
                  </span>
                </div>
              </div>
            </div>
            <div className="tf-compare-col">
              <div className="tf-compare-item">
                <Link className="tf-compare-image" to={`/product-detail/1`}>
                  <img
                    className="lazyload"
                    src="/images/products/fashion/compare-2.jpg"
                    alt="img-compare"
                    width={320}
                    height={407}
                  />
                </Link>
                <div className="content">
                  <Link
                    className="tf-compare-title link text-md fw-medium"
                    to={`/product-detail/1`}
                  >
                    Relaxed Fit Polo Shirt
                  </Link>
                  <p className="price-wrap fw-medium text-md">
                    <span className="price-new text-primary">$130.00</span>
                    <span className="price-old text-dark">$130.00</span>
                  </p>
                  <div className="tf-compare-btn">
                    <a
                      href="#shoppingCart"
                      data-bs-toggle="offcanvas"
                      className="tf-btn animate-btn w-100"
                    >
                      Add to Cart
                    </a>
                  </div>
                </div>
                <div className="tf-compare-remove">
                  <span className="tf-btn-icon line d-inline-flex">
                    <i className="icon-close" />
                  </span>
                </div>
              </div>
            </div>
            <div className="tf-compare-col">
              <div className="tf-compare-item">
                <Link className="tf-compare-image" to={`/product-detail/1`}>
                  <img
                    className="lazyload"
                    src="/images/products/fashion/compare-3.jpg"
                    alt="img-compare"
                    width={320}
                    height={407}
                  />
                </Link>
                <div className="content">
                  <Link
                    className="tf-compare-title link text-md fw-medium"
                    to={`/product-detail/1`}
                  >
                    Relaxed Fit Polo Shirt
                  </Link>
                  <p className="price-wrap fw-medium text-md">
                    <span className="price-new text-primary">$130.00</span>
                    <span className="price-old text-dark">$130.00</span>
                  </p>
                  <div className="tf-compare-btn">
                    <a
                      href="#shoppingCart"
                      data-bs-toggle="offcanvas"
                      className="tf-btn animate-btn w-100"
                    >
                      Add to Cart
                    </a>
                  </div>
                </div>
                <div className="tf-compare-remove">
                  <span className="tf-btn-icon line d-inline-flex">
                    <i className="icon-close" />
                  </span>
                </div>
              </div>
            </div>
            <div className="tf-compare-col">
              <div className="tf-compare-item">
                <Link className="tf-compare-image" to={`/product-detail/1`}>
                  <img
                    className="lazyload"
                    src="/images/products/fashion/compare-1.jpg"
                    alt="img-compare"
                    width={320}
                    height={407}
                  />
                </Link>
                <div className="content">
                  <Link
                    className="tf-compare-title link text-md fw-medium"
                    to={`/product-detail/1`}
                  >
                    Boxy T-shirt
                  </Link>
                  <p className="price-wrap fw-medium text-md">
                    <span className="price-new text-primary">$130.00</span>
                    <span className="price-old text-dark">$130.00</span>
                  </p>
                  <div className="tf-compare-btn">
                    <a
                      href="#shoppingCart"
                      data-bs-toggle="offcanvas"
                      className="tf-btn animate-btn w-100"
                    >
                      Add to Cart
                    </a>
                  </div>
                </div>
                <div className="tf-compare-remove">
                  <span className="tf-btn-icon line d-inline-flex">
                    <i className="icon-close" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="tf-compare-row">
            <div className="tf-compare-col tf-compare-field d-md-block d-none">
              <p className="text-md fw-medium">Availability</p>
            </div>
            <div className="tf-compare-col tf-compare-field tf-compare-stock">
              <div className="icon">
                <i className="icon-fill-check-circle" />
              </div>
              <span>In Stock</span>
            </div>
            <div className="tf-compare-col tf-compare-field tf-compare-stock">
              <div className="icon">
                <i className="icon-fill-check-circle" />
              </div>
              <span>In Stock</span>
            </div>
            <div className="tf-compare-col tf-compare-field tf-compare-stock text-red">
              <div className="icon">
                <svg
                  width={15}
                  height={15}
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1_34903)">
                    <path
                      d="M7.5 14.4955C11.366 14.4955 14.5 11.3635 14.5 7.50004C14.5 3.63659 11.366 0.504639 7.5 0.504639C3.63401 0.504639 0.5 3.63659 0.5 7.50004C0.5 11.3635 3.63401 14.4955 7.5 14.4955Z"
                      fill="#E21B1B"
                    />
                    <path
                      d="M5.28008 4.19648L4.19751 5.27905L9.72085 10.8024L10.8034 9.71982L5.28008 4.19648Z"
                      fill="white"
                    />
                    <path
                      d="M9.72036 4.19602L4.19702 9.71936L5.27959 10.8019L10.8029 5.27859L9.72036 4.19602Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_34903">
                      <rect
                        width={14}
                        height={14}
                        fill="white"
                        transform="translate(0.5 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span>Out of Stock</span>
            </div>
            <div className="tf-compare-col tf-compare-field tf-compare-stock text-red">
              <div className="icon">
                <svg
                  width={15}
                  height={15}
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1_34903)">
                    <path
                      d="M7.5 14.4955C11.366 14.4955 14.5 11.3635 14.5 7.50004C14.5 3.63659 11.366 0.504639 7.5 0.504639C3.63401 0.504639 0.5 3.63659 0.5 7.50004C0.5 11.3635 3.63401 14.4955 7.5 14.4955Z"
                      fill="#E21B1B"
                    />
                    <path
                      d="M5.28008 4.19648L4.19751 5.27905L9.72085 10.8024L10.8034 9.71982L5.28008 4.19648Z"
                      fill="white"
                    />
                    <path
                      d="M9.72036 4.19602L4.19702 9.71936L5.27959 10.8019L10.8029 5.27859L9.72036 4.19602Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_34903">
                      <rect
                        width={14}
                        height={14}
                        fill="white"
                        transform="translate(0.5 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span className="text-sm">Out of Stock</span>
            </div>
          </div>
          <div className="tf-compare-row">
            <div className="tf-compare-col tf-compare-field d-md-block d-none">
              <p className="text-md fw-medium">Vendor</p>
            </div>
            <div className="tf-compare-col tf-compare-value text-center">
              <p className="text-sm">Vineta</p>
            </div>
            <div className="tf-compare-col tf-compare-value text-center">
              <p className="text-sm">Vineta</p>
            </div>
            <div className="tf-compare-col tf-compare-value text-center">
              <p className="text-sm">Vineta</p>
            </div>
            <div className="tf-compare-col tf-compare-value text-center">
              <p className="text-sm">Vineta</p>
            </div>
          </div>
          <div className="tf-compare-row">
            <div className="tf-compare-col tf-compare-field d-md-block d-none">
              <p className="text-md fw-medium">Color</p>
            </div>
            <div className="tf-compare-col tf-compare-value text-center">
              <p className="text-sm">Black, White, Navy</p>
            </div>
            <div className="tf-compare-col tf-compare-value text-center">
              <p className="text-sm">Black, White, Navy</p>
            </div>
            <div className="tf-compare-col tf-compare-value text-center">
              <p className="text-sm">Black, White, Navy</p>
            </div>
            <div className="tf-compare-col tf-compare-value text-center">
              <p className="text-sm">Black, White, Navy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
