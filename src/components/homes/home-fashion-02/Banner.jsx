import React from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section className="s-banner-with-text banner-text-fashion flat-spacing-3 pt-0">
      <div className="container">
        <div className="row flex-wrap-reverse">
          <div className="col-md-5">
            <div className="content-banner type-left wow fadeInUp">
              <div className="box-title-banner">
                <h4>Sustainable Fashion</h4>
                <p className="text-md text-main">
                  Look good, feel good with eco-friendly and stylish designs.
                </p>
              </div>
              <div className="box-btn-banner">
                <Link
                  to={`/shop-sub-collection`}
                  className="tf-btn animate-btn"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="image-banner">
              <div className="image image-2 hover-shine hover-img">
                <div
                  className="shine-item img-style wow fadeInRight"
                  data-wow-delay="0.1s"
                >
                  <img
                    src="/images/banner/fashion-3.jpg"
                    alt=""
                    className="lazyload"
                    width={474}
                    height={603}
                  />
                </div>
              </div>
              <div className="image image-1 hover-shine hover-img">
                <div className="shine-item img-style wow fadeInRight">
                  <img
                    src="/images/banner/fashion-4.jpg"
                    alt=""
                    className="lazyload"
                    width={531}
                    height={676}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
