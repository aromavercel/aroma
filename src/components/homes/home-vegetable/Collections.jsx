import React from "react";
import { Link } from "react-router-dom";

export default function Collections() {
  return (
    <section className="flat-spacing-4 pb-0">
      <div className="container">
        <div className="grid-cls grid-cls-v4 grid-vegetable">
          <div className="item1 s-cls style-absolute hover-img abs-left-center bg-purple-5">
            <div className="image img-style">
              <img
                alt=""
                className=" ls-is-cached lazyloaded"
                src="/images/banner/vegetable-1.png"
                width="926"
                height="574"
              />
            </div>
            <div className="content">
              <div className="box-title">
                <p className="text-sm">Save up to 20% on</p>
                <h6>
                  Dairy Milk <br /> Chocolate
                </h6>
              </div>
              <div className="box-btn">
                <Link
                  to={`/shop-default`}
                  className="tf-btn btn-primary primary-2 animate-btn"
                >
                  <span className="text-sm">Shop Now</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="item2 s-cls style-absolute hover-img abs-left-center bg-pink-3">
            <div className="image img-style">
              <img
                alt=""
                className=" ls-is-cached lazyloaded"
                src="/images/banner/vegetable-2.png"
                width="926"
                height="574"
              />
            </div>
            <div className="content">
              <div className="box-title">
                <p className="text-sm">Save up to 20% on</p>
                <h6>
                  Yoghurt Pouch <br /> Blueberry 140g
                </h6>
              </div>
              <div className="box-btn">
                <Link
                  to={`/shop-default`}
                  className="tf-btn btn-primary primary-2 animate-btn"
                >
                  <span className="text-sm">Shop Now</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="item3 s-cls style-absolute abs-left-center type-large hover-img">
            <div className="image img-style">
              <img
                alt=""
                className=" ls-is-cached lazyloaded"
                src="/images/banner/vegetable-3.jpg"
                width="1428"
                height="897"
              />
            </div>
            <div className="content">
              <div className="box-title">
                <h4 className="text-white">Eat Fresh, Live Well</h4>
                <p className="text-md text-white">
                  Discover farm-fresh, organic veggies at our store. Locally
                  sourced, quality guaranteed—perfect for your healthy meals!
                </p>
              </div>
              <div className="box-btn">
                <Link
                  to={`/shop-default`}
                  className="tf-btn btn-white animate-btn animate-dark"
                >
                  Discover Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
