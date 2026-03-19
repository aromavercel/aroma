import React from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section className="s-banner-with-text banner-text-jewelry">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="image-banner">
              <div className="image image-1 rounded-0 hover-shine hover-img">
                <div className="shine-item img-style">
                  <img
                    src="/images/banner/jewelry-1.jpg"
                    alt=""
                    className="lazyload"
                    width={517}
                    height={708}
                  />
                </div>
              </div>
              <div className="image image-2 rounded-0 hover-shine hover-img">
                <div className="shine-item img-style">
                  <img
                    src="/images/banner/jewelry-2.jpg"
                    alt=""
                    className="lazyload"
                    width={413}
                    height={413}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xxl-5 offset-xxl-1">
            <div className="content-banner type-left wow fadeInUp">
              <div className="box-title-banner">
                <h2 className="font-2">Sparkle Every Day</h2>
                <p className="text-md font-2">
                  Discover timeless pieces that elevate your style.
                </p>
              </div>
              <div className="box-btn-banner">
                <Link
                  to={`/shop-default`}
                  className="tf-btn btn-large btn-yellow fw-normal font-2 rounded-0 animate-btn"
                >
                  Shop Collection
                  <i className="icon icon-arr-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
