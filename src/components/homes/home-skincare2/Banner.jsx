import { Link } from "react-router-dom";
import React from "react";

export default function Banner() {
  return (
    <section className="s-banner-colection banner-cls-mega-electric style-abs-2 flat-spacing-3">
      <div className="container">
        <div className="banner-content">
          <div className="image">
            <img
              alt="/images/banner/skincare-5.jpg"
              className="lazyload"
              src="/images/banner/skincare-5.jpg"
              width={1440}
              height={544}
            />
          </div>
          <div className="box-content text-center">
            <div className="box-title-banner wow fadeInUp">
              <h3 className="title fw-normal fst-italic font-3 letter-0 md-px-0">
                Bought Together
              </h3>
              <p className="sub text-sm text-grey-3">
                Skincare and makeup made to glow with you.
              </p>
            </div>
            <div className="box-btn-banner wow fadeInUp">
              <Link
                to={`/shop-collection-list`}
                className="tf-btn btn-orange-3 animate-btn"
              >
                <span className="body-text-2 fw-semibold font-4">
                  Shop Collection
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
