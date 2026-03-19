import React from "react";
import { Link } from "react-router-dom";

export default function Collections2() {
  return (
    <div className="flat-spacing-3">
      <div className="container">
        <div className="grid-cls grid-cls-v5 wow fadeInUp">
          <div className="item1 wg-cls rounded-0 style-abs type-2 hover-img">
            <Link to={`/shop-default`} className="image img-style d-block">
              <img
                alt=""
                className="lazyloaded"
                src="/images/cls-categories/grid-cls/pod-couple-tshirt.jpg"
                width="696"
                height="996"
              />
            </Link>
            <div className="cls-btn text-center">
              <Link
                to={`/shop-default`}
                className="tf-btn btn-cls rounded-0 hover-dark btn-white hover-icon-2"
              >
                Couple T-Shirt
                <i className="icon icon-arrow1-top-left" />
              </Link>
            </div>
          </div>
          <div className="item2 wg-cls rounded-0 style-abs type-2 hover-img">
            <Link to={`/shop-default`} className="image img-style d-block">
              <img
                alt=""
                className="lazyloaded"
                src="/images/cls-categories/grid-cls/pod-summer-vibe.jpg"
                width="696"
                height="996"
              />
            </Link>
            <div className="cls-btn text-center">
              <Link
                to={`/shop-default`}
                className="tf-btn btn-cls rounded-0 hover-dark btn-white hover-icon-2"
              >
                Summer Vibe
                <i className="icon icon-arrow1-top-left" />
              </Link>
            </div>
          </div>
          <div className="item3 wg-cls rounded-0 style-abs type-2 hover-img">
            <Link to={`/shop-default`} className="image img-style d-block">
              <img
                alt=""
                className="lazyloaded"
                src="/images/cls-categories/grid-cls/pod-hat.jpg"
                width="696"
                height="480"
              />
            </Link>
            <div className="cls-btn text-center">
              <Link
                to={`/shop-default`}
                className="tf-btn btn-cls rounded-0 hover-dark btn-white hover-icon-2"
              >
                Personalize Hat
                <i className="icon icon-arrow1-top-left" />
              </Link>
            </div>
          </div>
          <div className="item4 wg-cls rounded-0 style-abs type-2 hover-img">
            <Link to={`/shop-default`} className="image img-style d-block">
              <img
                alt=""
                className="lazyloaded"
                src="/images/cls-categories/grid-cls/pod-gift.jpg"
                width="696"
                height="480"
              />
            </Link>
            <div className="cls-btn text-center">
              <Link
                to={`/shop-default`}
                className="tf-btn btn-cls rounded-0 hover-dark btn-white hover-icon-2"
              >
                Gifts
                <i className="icon icon-arrow1-top-left" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
