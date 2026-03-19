import { Link } from "react-router-dom";
import React from "react";

export default function Collections() {
  return (
    <section>
      <div className="grid-cls font-2 grid-cls-v2 wow fadeInUp gap-0">
        <div className="item1 wg-cls rounded-0 style-abs type-2 hover-img">
          <Link to={`/shop-default`} className="image img-style d-block">
            <img
              src="/images/cls-categories/grid-cls/furniture-4.jpg"
              alt=""
              className="lazyload"
              width={640}
              height={1080}
            />
          </Link>
          <div className="cls-btn text-center">
            <Link
              to={`/shop-default`}
              className="tf-btn btn-cls rounded-0 btn-white hover-dark display-xs fw-medium font-11"
            >
              THE QUIET EDIT
            </Link>
          </div>
        </div>
        <div className="item2 wg-cls rounded-0 style-abs type-2 hover-img">
          <Link to={`/shop-default`} className="image img-style d-block">
            <img
              src="/images/cls-categories/grid-cls/furniture-5.jpg"
              alt=""
              className="lazyload"
              width={640}
              height={645}
            />
          </Link>
          <div className="cls-btn text-center">
            <Link
              to={`/shop-default`}
              className="tf-btn btn-cls rounded-0 btn-white hover-dark display-xs fw-medium font-11"
            >
              LINE &amp; FORM
            </Link>
          </div>
        </div>
        <div className="item3 wg-cls-text">
          <div>
            <div className="heading text-dark-8 fw-medium font-11 display-md-2">
              Natural Harmony
            </div>
            <p className="font-11 text-dark-8">
              Warm woods and calming tones for a grounded home.
            </p>
          </div>
          <Link
            to={`/shop-collection-list`}
            className="tf-btn btn-line-dark fw-normal"
          >
            <span className="body-text fw-medium font-11">
              {" "}
              SHOP COLLECTION{" "}
            </span>
            <i className="icon-arrow-top-left fs-8" />
          </Link>
        </div>
        <div className="item4 wg-cls rounded-0 style-abs type-2 hover-img">
          <Link to={`/shop-default`} className="image img-style d-block">
            <img
              src="/images/cls-categories/grid-cls/furniture-6.jpg"
              alt=""
              className="lazyload"
              width={640}
              height={1080}
            />
          </Link>
          <div className="cls-btn text-center">
            <Link
              to={`/shop-default`}
              className="tf-btn btn-cls rounded-0 btn-white hover-dark display-xs fw-medium font-11"
            >
              EVERYDAY CALM
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
