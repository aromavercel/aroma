import React from "react";
import { Link } from "react-router-dom";

export default function Banner2() {
  return (
    <div className="s-banner-colection flat-spacing-6">
      <div className="container">
        <div className="banner-content tf-grid-layout tf-col-2 hover-overlay-2">
          <div className="image img-hv-overlay">
            <img
              src="/images/banner/fashion-2.jpg"
              alt="/images/banner/fashion-2.jpg"
              className="lazyload"
              width={719}
              height={676}
            />
          </div>
          <div className="box-content">
            <div className="box-title-banner wow fadeInUp">
              <p className="title display-md fw-medium">Effortless Chic</p>
              <p className="sub text-lg">
                Achieve effortless style with pieces made for <br />
                everyday wear
              </p>
            </div>
            <div className="box-btn-banner wow fadeInUp">
              <Link to={`/shop-sub-collection`} className="tf-btn animate-btn">
                Explore Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
