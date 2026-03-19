import { Link } from "react-router-dom";
import React from "react";

export default function Collections2() {
  return (
    <section className="flat-spacing-3 pt-0">
      <div className="container">
        <div className="tf-grid-layout md-col-2">
          <div className="wg-offer hover-img">
            <Link
              to={`/shop-default`}
              className="image d-block img-style xl-radius-40"
            >
              <img
                src="/images/section/offer-3.jpg"
                alt=""
                className="lazyload"
                width={708}
                height={467}
              />
            </Link>
            <div className="content text-center wow fadeInUp">
              <div className="box-title">
                <div>
                  <Link
                    to={`/shop-default`}
                    className="link font-10 fw-normal display-md-2"
                  >
                    New Arrivals
                  </Link>
                </div>
              </div>
              <div className="box-btn">
                <Link to={`/shop-default`} className="text-md link fw-medium">
                  Shop Now <i className="icon icon-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
          <div className="wg-offer hover-img">
            <Link
              to={`/shop-default`}
              className="image d-block img-style xl-radius-40"
            >
              <img
                src="/images/section/offer-4.jpg"
                alt=""
                className="lazyload"
                width={708}
                height={467}
              />
            </Link>
            <div className="content text-center wow fadeInUp">
              <div className="box-title">
                <div>
                  <Link
                    to={`/shop-default`}
                    className="link font-10 fw-normal display-md-2"
                  >
                    Limited Time Offer
                  </Link>
                </div>
              </div>
              <div className="box-btn">
                <Link to={`/shop-default`} className="text-md link fw-medium">
                  Shop Now <i className="icon icon-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
