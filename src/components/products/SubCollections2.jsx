import { categories14 } from "@/data/collections";

import { Link } from "react-router-dom";
import React from "react";

export default function SubCollections2() {
  return (
    <section className="flat-spacing-24">
      <div className="container">
        <div className="flat-wrap-cls tf-grid-layout tf-col-2 xl-col-3">
          {categories14.map((category) => (
            <div
              className="wg-cls style-abs2 style-lg hover-img"
              key={category.id}
            >
              <Link to={`/shop-default`} className="image-wrap relative">
                <div className="image img-style">
                  <img
                    src={category.image}
                    alt=""
                    className="lazyload"
                    width={696}
                    height={696}
                  />
                </div>
                <div className="cls-btn text-center">
                  <button className="tf-btn btn-white hover-dark">
                    View all
                  </button>
                </div>
                <span className="tf-overlay" />
              </Link>
              <div className="cls-content text-center">
                <Link
                  to={`/shop-default`}
                  className="text-type text-xl-2 fw-medium link"
                >
                  {category.name}
                </Link>
                <span className="count-item body-text-2 text-main">
                  {category.items}
                </span>
              </div>
            </div>
          ))}
          {/* Pagination */}
        </div>
      </div>
    </section>
  );
}
