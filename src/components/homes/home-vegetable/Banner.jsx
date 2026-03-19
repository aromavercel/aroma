import React from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="tf-grid-layout lg-col-2 grid-cls-suppermarket">
          <div className="s-cls bg-gradient-3 style-absolute abs-left-bottom hover-img">
            <Link to={`/shop-default`} className="image d-block img-style">
              <img
                alt=""
                className=" ls-is-cached lazyloaded"
                src="/images/section/vegetable-1.png"
                width="1062"
                height="620"
              />
            </Link>
            <div
              className="content wow fadeInUp"
              style={{ visibility: "visible", animationName: "fadeInUp" }}
            >
              <div className="box-title">
                <h5>Fresh Produce Everyday</h5>
                <p className="text-sm">
                  Straight from the farm to your kitchen.
                </p>
              </div>
              <div className="box-btn">
                <Link to={`/shop-default`} className="tf-btn animate-btn">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
          <div className="s-cls bg-gradient-4 style-absolute abs-left-bottom hover-img">
            <Link to={`/shop-default`} className="image d-block img-style">
              <img
                alt=""
                className=" ls-is-cached lazyloaded"
                src="/images/section/vegetable-2.png"
                width="1062"
                height="620"
              />
            </Link>
            <div
              className="content wow fadeInUp"
              style={{ visibility: "visible", animationName: "fadeInUp" }}
            >
              <div className="box-title">
                <h5>Shop Local &amp; Organic</h5>
                <p className="text-sm">
                  Support sustainable farming with every purchase.
                </p>
              </div>
              <div className="box-btn">
                <Link to={`/shop-default`} className="tf-btn animate-btn">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
