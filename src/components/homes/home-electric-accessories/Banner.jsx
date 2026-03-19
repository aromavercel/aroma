import React from "react";

export default function Banner() {
  return (
    <section className="s-banner-colection banner-cls-electric-acc style-abs-2 flat-spacing">
      <div className="container">
        <div className="banner-content">
          <div className="image">
            <img
              alt="/images/banner/electric-access.jpg"
              className="lazyload effect-paralax"
              src="/images/banner/electric-access.jpg"
              width={1440}
              height={612}
            />
          </div>
          <div className="box-content text-center">
            <div className="box-title-banner">
              <p className="title display-md fw-medium">Limited Time Deals</p>
              <p className="sub text-md">
                Shop the latest activewear designed for <br />
                maximum comfort and style.
              </p>
            </div>
            <div className="box-btn-banner">
              <a href="#" className="tf-btn btn-dark2 animate-btn">
                {" "}
                Shop Now{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
