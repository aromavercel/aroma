import React from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section className="s-banner-colection banner-cls-baby">
      <div className="container">
        <div className="banner-content bg-light-purple-7 tf-grid-layout tf-col-2 hover-shine hover-img">
          <div className="image img-hv-overlay shine-item img-style">
            <img
              alt="/images/banner/baby.jpg"
              className="lazyload"
              src="/images/banner/baby.jpg"
              width={720}
              height={556}
            />
          </div>
          <div className="box-content text-center wow fadeInUp">
            <div className="box-title-banner">
              <h3 className="fw-bold display-lg-5 title font-8 text-blue">
                Best for Baby, <br />
                Loved by Parents
              </h3>
              <p className="sub text-md">
                Shop our collection of baby essentials that <br />
                parents swear by.
              </p>
            </div>
            <div className="box-btn-banner">
              <Link
                to={`/shop-default`}
                className="tf-btn btn-orange-2 animate-btn"
              >
                Explore Now
              </Link>
            </div>
          </div>
          <div className="item">
            <img
              alt="/images/section/item-baby1.png"
              src="/images/section/item-baby1.png"
              width={217}
              height={171}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
