import React from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="tf-grid-layout md-col-2">
          <div className="banner-shop rounded-0 style-bottom style-lg-bottom hover-img">
            <Link to={`/shop-default`} className="image img-style">
              <img
                src="/images/cls-categories/pod/trend-1.jpg"
                alt=""
                className="lazyload"
                width={708}
                height={708}
              />
            </Link>
            <div className="content justify-items-left box bg-white">
              <h4 className="font-3 letter-0 fw-medium wow fadeInUp">
                Summer Sales
              </h4>
              <Link
                to={`/shop-default`}
                className="wow fadeInUp tf-btn btn-line-dark"
              >
                Shop Collection
                <i className="icon icon-arrow-top-left fs-8" />
              </Link>
            </div>
          </div>
          <div className="banner-shop rounded-0 style-bottom style-lg-bottom hover-img">
            <Link to={`/shop-default`} className="image img-style">
              <img
                src="/images/cls-categories/pod/trend-2.jpg"
                alt=""
                className="lazyload"
                width={708}
                height={708}
              />
            </Link>
            <div className="content justify-items-left box bg-white">
              <h4 className="font-3 letter-0 fw-medium wow fadeInUp">
                Trending Now
              </h4>
              <Link
                to={`/shop-default`}
                className="wow fadeInUp tf-btn btn-line-dark"
              >
                Shop Collection
                <i className="icon icon-arrow-top-left fs-8" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
