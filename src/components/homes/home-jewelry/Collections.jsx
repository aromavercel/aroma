import React from "react";
import { Link } from "react-router-dom";

export default function Collections() {
  return (
    <section>
      <div className="container">
        <div className="flat-title style-line wow fadeInUp">
          <h4 className="title lette-space-0 font-2">
            Discover Our Categories
          </h4>
          <div className="line-title" />
        </div>
        <div className="grid-cls font-2 grid-cls-v2 grid-jewelry wow fadeInUp">
          <div className="item1 wg-cls rounded-0 style-abs type-2 hover-img">
            <Link to={`/shop-default`} className="image img-style d-block">
              <img
                src="/images/cls-categories/grid-cls/jewelry-1.jpg"
                alt=""
                className="lazyloaded"
                width={464}
                height={726}
              />
            </Link>
            <div className="cls-btn text-center">
              <Link
                to={`/shop-default`}
                className="tf-btn btn-cls rounded-0 btn-white hover-green hover-icon-2"
              >
                Summer Collection
                <i className="icon icon-arrow1-top-left" />
              </Link>
            </div>
          </div>
          <div className="item2 wg-cls rounded-0 style-abs type-2 hover-img">
            <Link to={`/shop-default`} className="image img-style d-block">
              <img
                src="/images/cls-categories/grid-cls/jewelry-2.jpg"
                alt=""
                className="lazyloaded"
                width={696}
                height={527}
              />
            </Link>
            <div className="cls-btn text-center">
              <Link
                to={`/shop-default`}
                className="tf-btn btn-cls rounded-0 btn-white hover-green hover-icon-2"
              >
                Gold Jewellery
                <i className="icon icon-arrow1-top-left" />
              </Link>
            </div>
          </div>
          <div className="item3 wg-cls rounded-0 style-abs type-2 hover-img">
            <Link to={`/shop-default`} className="image img-style d-block">
              <img
                src="/images/cls-categories/grid-cls/jewelry-3.jpg"
                alt=""
                className="lazyloaded"
                width={696}
                height={527}
              />
            </Link>
            <div className="cls-btn text-center">
              <Link
                to={`/shop-default`}
                className="tf-btn btn-cls rounded-0 btn-white hover-green hover-icon-2"
              >
                Silver Jewellery
                <i className="icon icon-arrow1-top-left" />
              </Link>
            </div>
          </div>
          <div className="item4 wg-cls rounded-0 style-abs type-2 hover-img">
            <Link to={`/shop-default`} className="image img-style d-block">
              <img
                src="/images/cls-categories/grid-cls/jewelry-4.jpg"
                alt=""
                className="lazyloaded"
                width={464}
                height={726}
              />
            </Link>
            <div className="cls-btn text-center">
              <Link
                to={`/shop-default`}
                className="tf-btn btn-cls rounded-0 btn-white hover-green hover-icon-2"
              >
                Ageless Classis
                <i className="icon icon-arrow1-top-left" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
