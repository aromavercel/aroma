import React from "react";
import { Link } from "react-router-dom";

export default function Collections() {
  return (
    <div className="flat-spacing-17">
      <div className="container">
        <div className="grid-cls grid-cls-v1 grid-cls-sport">
          <div className="item1 wg-cls style-abs hover-img">
            <Link to={`/shop-default`} className="image img-style d-block">
              <img
                src="/images/cls-categories/grid-cls/sport-wear-1.jpg"
                alt=""
                className="ls-is-cached lazyloaded"
                width={708}
                height={708}
              />
            </Link>
            <div className="cls-btn text-center wow fadeInUp">
              <Link
                to={`/shop-default`}
                className="tf-btn fw-medium btn-large btn-white hover-dark radius-8"
              >
                Tops
              </Link>
            </div>
          </div>
          <div className="item2 wg-cls style-abs hover-img">
            <Link to={`/shop-default`} className="image img-style d-block">
              <img
                src="/images/cls-categories/grid-cls/sport-wear-2.jpg"
                alt=""
                className="ls-is-cached lazyloaded"
                width={708}
                height={342}
              />
            </Link>
            <div className="cls-btn text-center wow fadeInUp">
              <Link
                to={`/shop-default`}
                className="tf-btn fw-medium btn-large btn-white hover-dark radius-8"
              >
                <span className="display-xs"> Bottoms </span>
              </Link>
            </div>
          </div>
          <div className="item3 wg-cls style-abs hover-img">
            <Link to={`/shop-default`} className="image img-style d-block">
              <img
                src="/images/cls-categories/grid-cls/sport-wear-3.jpg"
                alt=""
                className="ls-is-cached lazyloaded"
                width={708}
                height={342}
              />
            </Link>
            <div className="cls-btn text-center wow fadeInUp">
              <Link
                to={`/shop-default`}
                className="tf-btn fw-medium btn-large btn-white hover-dark radius-8"
              >
                <span className="display-xs"> Accessories </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
