import React from "react";
import { Link } from "react-router-dom";

export default function Collections() {
  return (
    <section className="flat-spacing-17">
      <div className="container">
        <div className="grid-cls grid-cls-v3 grid-mega">
          <div className="item1 s-cls style-absolute abs-left-center type-large">
            <div className="image">
              <img
                src="/images/banner/mega-1.jpg"
                alt=""
                className="lazyload"
                width={952}
                height={598}
              />
            </div>
            <div className="content">
              <div className="box-title">
                <div className="box-offer mb_4">
                  <p className="offer text-xs bg-white fw-semibold">APPLE</p>
                </div>
                <h4>
                  iPad Pro 11-inch <br />
                  4th generation
                </h4>
                <p className="text-md mb_8">Unlock Endless Possibilities</p>
                <p className="text-md fw-medium">
                  From
                  <span className="display-md text-primary"> $1,200 </span>
                </p>
              </div>
              <div className="box-btn">
                <Link
                  to={`/shop-default`}
                  className="tf-btn btn-dark2 animate-btn"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
          <div className="item2 s-cls style-absolute abs-left-center">
            <div className="image">
              <img
                src="/images/banner/mega-2.jpg"
                alt=""
                className="lazyload"
                width={695}
                height={431}
              />
            </div>
            <div className="content">
              <div className="box-title">
                <h6>Apple Watch Ultra</h6>
                <p className="text-sm">Ultimate Performance, Anywhere</p>
              </div>
              <div className="box-btn">
                <Link
                  to={`/shop-default`}
                  className="tf-btn btn-dark2 animate-btn"
                >
                  Explore Now
                </Link>
              </div>
            </div>
          </div>
          <div className="item3 s-cls style-absolute abs-left-center">
            <div className="image">
              <img
                src="/images/banner/mega-3.jpg"
                alt=""
                className="lazyload"
                width={463}
                height={287}
              />
            </div>
            <div className="content">
              <div className="box-title">
                <div className="box-offer">
                  <p className="offer text-white text-xs bg-orange-2 fw-semibold">
                    30% OFF
                  </p>
                </div>
                <h6>
                  Instax Mini 12 <br />
                  Camera
                </h6>
                <p className="text-sm">Capture Every Moment Instantly</p>
              </div>
              <div className="box-btn">
                <Link
                  to={`/shop-default`}
                  className="tf-btn btn-dark2 animate-btn"
                >
                  Explore Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
