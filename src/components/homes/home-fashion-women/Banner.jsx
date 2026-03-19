"use client";
import React from "react";
import { Link } from "react-router-dom";
import { lookbookProducts1 } from "@/data/products";
import { useContextElement } from "@/context/Context";

export default function Banner() {
  const { setQuickViewItem } = useContextElement();
  return (
    <div className="s-banner-product">
      <div className="container">
        <div className="content-banner">
          <div className="image-wrap hover-img">
            <a href="#" className="image img-style d-block">
              <img
                data-src=""
                alt=""
                className="lazyload"
                src="/images/banner/fashion-woman.jpg"
                width={768}
                height={1008}
              />
            </a>
            {lookbookProducts1.map((product) => (
              <div key={product.id} className="loobook-product style-row">
                <div className="img-style">
                  <img
                    alt={product.title}
                    src={product.imgSrc}
                    width={144}
                    height={170}
                    className="img-fluid"
                  />
                </div>
                <div className="content">
                  <div className="info">
                    <Link
                      href="/product-detail/${product.id}"
                      className="text-md fw-medium text-truncate d-block link text-decoration-none"
                      style={{ maxWidth: "200px" }}
                    >
                      {product.title}
                    </Link>
                    <p className="price-wrap text-md fw-medium mb-0">
                      ${product.price.toFixed(2)}{" "}
                      {product.oldPrice && (
                        <span className="text-muted text-decoration-line-through ms-2">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </p>
                  </div>
                  <a
                    href="#quickView"
                    data-bs-toggle="modal"
                    onClick={() => setQuickViewItem(product)}
                    className="btn-lookbook hover-tooltip text-decoration-none"
                  >
                    <i className="bi bi-eye-fill icon-view" />
                    <span className="tooltip bg-dark text-white p-1 rounded small">
                      Quick view
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="content-right text-center wow fadeInUp">
            <div className="box-title">
              <p className="display-lg-3 font-2 text-dark-3">
                Elevating Your Style Journey
              </p>
              <p className="body-text-2 text-dark-3 font-2">
                Discover timeless pieces that define elegance and
                sophistication.
              </p>
            </div>
            <div className="box-btn">
              <Link
                to={`/shop-default`}
                className="tf-btn animate-btn btn-dark2"
              >
                Shop Now
                <i className="icon-arr-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
