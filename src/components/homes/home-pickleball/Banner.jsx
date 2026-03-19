import { Link } from "react-router-dom";
import React from "react";

export default function Banner() {
  return (
    <section className="flat-spacing-3 s-banner-with-text banner-text-skincare">
      <div className="container">
        <div className="row flex-wrap-reverse">
          <div className="col-md-6">
            <div className="content-banner wow fadeInLeft">
              <div className="box-title-banner">
                <span className="subtitle text-md fw-semibold text-grey-3">
                  LIMITED TIME DEALS
                </span>
                <h3 className="letter-0 font-10 fw-normal text-dark-8">
                  Court-Ready <br />
                  Discounts
                </h3>
                <p className="text-sm text-main">
                  Limited-time offers on everything you need to play your best.
                </p>
              </div>
              <div className="box-btn-banner">
                <Link
                  to={`/shop-collection-list`}
                  className="tf-btn animate-btn btn-red btn-lg fw-medium bg-yellow-5 border-0 text-green-3"
                >
                  Shop Collection
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="hover-shine hover-img">
              <div className="image-banner image shine-item img-style radius-40">
                <img
                  src="/images/banner/pickleball-1.jpg"
                  alt=""
                  className="lazyload"
                  width={929}
                  height={977}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
