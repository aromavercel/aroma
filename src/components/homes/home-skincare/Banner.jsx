import React from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <>
      {/* Banner With Text */}
      <section className="flat-spacing-14 s-banner-with-text banner-text-skincare">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="hover-shine hover-img">
                <div className="image-banner image shine-item img-style">
                  <img
                    src="/images/banner/skincare-2.jpg"
                    alt=""
                    className="lazyload"
                    width={1062}
                    height={720}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="content-banner wow fadeInRight">
                <div className="box-title-banner">
                  <h4 className="letter-0">Radiant Skin Awaits</h4>
                  <p className="text-xl-2">
                    Discover our skincare essentials for a glowing, <br />
                    healthy complexion.
                  </p>
                </div>
                <div className="box-btn-banner">
                  <Link
                    to={`/shop-default`}
                    className="tf-btn animate-btn btn-red btn-md fw-normal"
                  >
                    Shop Now
                    <i className="icon-arr-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Banner With Text */}
      {/* Banner With Text */}
      <section className="flat-spacing-3 pt-0 s-banner-with-text banner-text-skincare">
        <div className="container">
          <div className="row flex-wrap-reverse">
            <div className="col-md-6">
              <div className="content-banner wow fadeInLeft">
                <div className="box-title-banner">
                  <h4 className="letter-0">Nourish &amp; Revitalize</h4>
                  <p className="text-xl-2">
                    Pamper your skin with products designed to <br />
                    hydrate, repair, and rejuvenate.
                  </p>
                </div>
                <div className="box-btn-banner">
                  <Link
                    to={`/shop-default`}
                    className="tf-btn animate-btn btn-red btn-md fw-normal"
                  >
                    Shop Now
                    <i className="icon-arr-right" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="hover-shine hover-img">
                <div className="image-banner image shine-item img-style">
                  <img
                    src="/images/banner/skincare-1.jpg"
                    alt=""
                    className="lazyload"
                    width={1062}
                    height={720}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
