import { Link } from "react-router-dom";
import React from "react";

export default function Banner() {
  return (
    <section className="flat-spacing-14 s-banner-with-text banner-text-skincare">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="hover-shine hover-img">
              <div className="image-banner image shine-item img-style">
                <img
                  src="/images/banner/handcraft-1.jpg"
                  alt=""
                  className="lazyload"
                  width={780}
                  height={863}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="content-banner wow fadeInRight">
              <div className="box-title-banner">
                <h4 className="letter-0 fw-normal" display-lg-3="">
                  Handmade with Heart
                </h4>
                <p className="text-grey-3">
                  We’re a small team of makers who believe in the beauty of
                  craftsmanship. Every piece is thoughtfully created by hand,
                  using quality materials and a whole lot of love. Whether it’s
                  for your home, your routine, or someone special — we’re here
                  to bring a little more warmth, meaning, and joy to your
                  everyday.
                </p>
              </div>
              <div className="box-btn-banner">
                <Link
                  to={`/about-us`}
                  className="tf-btn animate-btn btn-red btn-lg fw-medium bg-brown-14 border-0"
                >
                  MORE ABOUT US
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
