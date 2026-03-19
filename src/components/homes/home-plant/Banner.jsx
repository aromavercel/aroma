import React from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section className="flat-spacing pt-0 pb_xl-0">
      <div className="container">
        <div className="s2-banner-with-text">
          <div className="banner">
            <img
              src="/images/banner/plant-1.png"
              alt="banner"
              className=" ls-is-cached lazyloaded"
              width={900}
              height={1161}
            />
          </div>
          <div className="content-with-text wow fadeInUp">
            <div className="box-title-content">
              <h2 className="title fw-semibold font-7">
                Refresh Your Space with Greenery
              </h2>
              <p className="desc text-main text-md">
                Discover a range of indoor plants that breathe life into your
                home. Shop now and elevate your space with nature's beauty.
              </p>
            </div>
            <Link
              to={`/shop-default`}
              className="tf-btn btn-orange animate-btn"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
