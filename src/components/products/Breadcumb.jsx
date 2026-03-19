import { Link } from "react-router-dom";
import React from "react";

export default function Breadcumb({
  fullWidth = false,
  showCollection = true,
}) {
  return (
    <>
      <section className="tf-page-title">
        <div className={fullWidth ? "container-full" : "container"}>
          <div className="box-title text-center">
            <h4 className="title">Women</h4>
            <div className="breadcrumb-list">
              <Link className="breadcrumb-item" to={`/`}>
                Home
              </Link>
              {showCollection && (
                <>
                  <div className="breadcrumb-item dot">
                    <span />
                  </div>
                  <Link
                    className="breadcrumb-item"
                    to={`/shop-collection-list`}
                  >
                    Collections
                  </Link>
                </>
              )}
              <div className="breadcrumb-item dot">
                <span />
              </div>
              <div className="breadcrumb-item current">Women</div>
            </div>
            <p className="desc text-md text-main">
              Discover our carefully curated women's collection, where timeless
              elegance meets modern style.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
