import React from "react";
import { Link } from "react-router-dom";

export default function Collections2() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="tf-grid-layout md-col-2">
          <div className="wg-offer hover-img">
            <Link to={`/shop-default`} className="image d-block img-style">
              <img
                src="/images/section/offer-1.jpg"
                alt=""
                className="lazyload"
                width={708}
                height={467}
              />
            </Link>
            <div className="content text-center wow fadeInUp">
              <div className="box-title">
                <h6>
                  <Link to={`/shop-default`} className="link">
                    New Arrivals
                  </Link>
                </h6>
                <p className="text-md text-main">
                  Discover the latest trends in activewear and upgrade
                  <br className="d-none d-xl-block" />
                  your fitness wardrobe.
                </p>
              </div>
              <div className="box-btn">
                <Link
                  to={`/shop-default`}
                  className="tf-btn btn-out-line-dark-2"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
          <div className="wg-offer hover-img">
            <Link to={`/shop-default`} className="image d-block img-style">
              <img
                src="/images/section/offer-2.jpg"
                alt=""
                className="lazyload"
                width={708}
                height={467}
              />
            </Link>
            <div className="content text-center wow fadeInUp">
              <div className="box-title">
                <h6>
                  <Link to={`/shop-default`} className="link">
                    Limited Time Offer
                  </Link>
                </h6>
                <p className="text-md text-main">
                  Get up to 30% off selected sportwear items. Don’t miss
                  <br className="d-none d-xl-block" />
                  out on these deals!
                </p>
              </div>
              <div className="box-btn">
                <Link
                  to={`/shop-default`}
                  className="tf-btn btn-out-line-dark-2"
                >
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
