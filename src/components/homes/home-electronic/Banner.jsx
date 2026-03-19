import React from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="s-banner-colection banner-cls-electric flat-spacing-3">
      <div className="container">
        <div className="banner-content tf-grid-layout tf-col-2 hover-overlay-2">
          <div className="image">
            <img
              alt="/images/banner/phone.png"
              className="lazyload"
              src="/images/banner/phone.png"
              width={763}
              height={570}
            />
          </div>
          <div className="box-content">
            <div className="box-title-banner wow fadeInUp">
              <p className="title display-md fw-medium">
                Unmatched Performance
              </p>
              <p className="sub text-md text-main">
                Upgrade your devices with cutting-edge technology.
              </p>
            </div>
            <div className="box-btn-banner wow fadeInUp">
              <Link
                to={`/shop-default`}
                className="tf-btn btn-dark2 animate-btn"
              >
                Shop Now
                <i className="icon icon-arr-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
