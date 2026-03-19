import React from "react";
import { Link } from "react-router-dom";

export default function Banner2() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="s3-banner-with-text">
          <div className="content-with-text wow fadeInUp">
            <div className="box-title-content">
              <span className="subtitle text-md fw-medium">
                LIFE GATHERS AROUND PLANTS
              </span>
              <h2 className="title fw-semibold font-7">
                Perfect Plants for Every Corner
              </h2>
              <p className="desc text-main text-md">
                From small succulents to statement plants, find the ideal green
                companion for any room. Explore our collection today!
              </p>
            </div>
            <Link
              to={`/shop-default`}
              className="tf-btn btn-orange animate-btn"
            >
              Shop Collection
            </Link>
          </div>
          <div className="image-banner">
            <div className="image image-1 hover-img">
              <div
                className="shine-item img-style wow fadeInRight"
                data-wow-delay="0.1s"
              >
                <img
                  alt=""
                  src="/images/banner/sub-plant-3.jpg"
                  className=" ls-is-cached lazyloaded"
                  width={534}
                  height={543}
                />
              </div>
            </div>
            <div className="image image-2 hover-shine hover-img">
              <div className="shine-item img-style wow fadeInRight">
                <img
                  alt=""
                  src="/images/banner/plant-2.jpg"
                  className=" ls-is-cached lazyloaded"
                  width={951}
                  height={951}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
