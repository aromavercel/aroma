import React from "react";
import { Link } from "react-router-dom";

export default function Banner2() {
  return (
    <section className="flat-spacing-16 s-banner-with-text banner-text-skincare type-2">
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <div className="image-banner">
              <div className="image image-1 hover-shine hover-img">
                <div className="shine-item img-style">
                  <img
                    src="/images/banner/skincare-3.jpg"
                    alt=""
                    className="lazyload"
                    width={663}
                    height={634}
                  />
                </div>
              </div>
              <div className="image image-2 hover-shine hover-img">
                <div className="shine-item img-style">
                  <img
                    src="/images/banner/skincare-4.jpg"
                    alt=""
                    className="lazyload"
                    width={542}
                    height={527}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="content-banner wow fadeInUp">
              <div className="box-title-banner">
                <p className="text-xl-2">Buy 1, Get 1 Free on select items</p>
                <h4 className="letter-0">Refresh &amp; Revitalize</h4>
              </div>
              <div className="box-btn-banner">
                <Link
                  to={`/shop-sub-collection`}
                  className="tf-btn btn-dark3 btn-md animate-btn"
                >
                  Explore Offers
                  <i className="icon-arr-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
