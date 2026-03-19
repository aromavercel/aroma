import React from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section className="s-banner-colection banner-cls-mega-electric style-abs-2 flat-spacing">
      <div className="container">
        <div className="banner-content">
          <div className="image">
            <img
              alt="/images/banner/mega-electric.jpg"
              className="lazyload"
              src="/images/banner/mega-electric.jpg"
              width={1440}
              height={296}
            />
          </div>
          <div className="box-content text-center">
            <div className="box-title-banner wow fadeInUp">
              <div className="new text-xs fw-semibold text-white">
                <p>NEW IN</p>
              </div>
              <h6 className="title display-xs fw-medium">
                Elevate Your Wellness
              </h6>
              <p className="sub text-sm">
                Track your health and optimize performance with the Oura Ring 4.
              </p>
            </div>
            <div className="box-btn-banner wow fadeInUp">
              <Link
                to={`/shop-default`}
                className="tf-btn btn-dark2 animate-btn"
              >
                Explore Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
