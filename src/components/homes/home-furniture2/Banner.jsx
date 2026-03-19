import { Link } from "react-router-dom";
import React from "react";

export default function Banner() {
  return (
    <section className="s-banner-countdown banner-cd-phonecase m-0 rounded-0">
      <div className="banner-wrap">
        <div className="banner-content text-center rounded-0">
          <div className="box-title">
            <div className="text fw-medium font-11 body-text text-dark-8">
              LIMITED TIME DEAL
            </div>
            <div className="display-lg fw-medium font-11 text-dark-8">
              MOMENTS YOU CAN’T MISS
            </div>
            <p className="sub text-md text-dark-8 font-11">
              Up to 30% off select sofas, chairs &amp; more.
            </p>
          </div>
          <div className="box-btn">
            <Link
              to={`/shop-default`}
              className="tf-btn btn-large fw-medium animate-btn bg-brown-15 border-0 rounded-0 font-11"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="image">
          <img
            src="/images/banner/furniture-1.jpg"
            alt=""
            className="lazyload effect-paralax"
            width={1920}
            height={694}
          />
        </div>
      </div>
    </section>
  );
}
