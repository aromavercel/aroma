import { products1 } from "@/data/products";

import { Link } from "react-router-dom";
import React from "react";

export default function ProductSidebar() {
  return (
    <div
      className="offcanvas offcanvas-start canvas-sidebar"
      id="sidebarSingle"
    >
      <div className="canvas-wrapper">
        <div className="canvas-header">
          <span className="title">sidebar product</span>
          <button
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="canvas-body">
          <ul className="widget-facet list-icon-box">
            <li className="tf-icon-box">
              <span className="icon icon-shipping" />
              <div className="content">
                <div className="title">Free Shipping</div>
                <p>Enjoy free shipping on all orders</p>
              </div>
            </li>
            <li className="tf-icon-box">
              <span className="icon icon-return" />
              <div className="content">
                <div className="title">Free Returns</div>
                <p>Within 14 days for a return</p>
              </div>
            </li>
            <li className="tf-icon-box">
              <span className="icon icon-support" />
              <div className="content">
                <div className="title">Support Online</div>
                <p>We support customers 24/7</p>
              </div>
            </li>
          </ul>
          <div className="widget-facet">
            <div className="facet-title text-xl fw-medium">
              <span>On sale</span>
            </div>
            <ul className="list-recent">
              {products1.slice(0, 2).map((product, i) => (
                <li key={i}>
                  <div className="recent-blog-item">
                    <Link
                      to={`/product-detail/${product.id}`}
                      className="img-product"
                    >
                      <img
                        alt="img"
                        width={150}
                        height={226}
                        src={product.imgSrc}
                      />
                    </Link>
                    <div className="content">
                      <Link
                        to={`/product-detail/${product.id}`}
                        className="title text-md link fw-medium"
                      >
                        {product.title}
                      </Link>
                      <div className="price text-md fw-medium">
                        <span className="new-price">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.oldPrice && (
                          <span className="old-price">
                            {" "}
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="widget-facet">
            <div className="sb-banner hover-img">
              <div className="image img-style">
                <img
                  alt="banner"
                  className="lazyload"
                  width={732}
                  height={1036}
                  src="/images/blog/sb-banner.jpg"
                />
              </div>
              <div className="banner-content">
                <p className="title">
                  Elevate <br />
                  Your Style
                </p>
                <a href="#" className="tf-btn btn-white hover-primary">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
