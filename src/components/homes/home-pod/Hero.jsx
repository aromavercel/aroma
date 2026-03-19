import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="tf-slideshow slider-pod slider-default">
      <div
        className="parallax-wrap parallaxie"
        style={{
          backgroundImage: 'url("/images/slider/pod/slider-pod.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center 93.15px",
        }}
      >
        <div className="container">
          <div className="content-slider style-2 text-center rounded-0">
            <div className="wow fadeInUp box-title-slider">
              <h2 className="heading display-xl-2 font-3 fw-bold">
                Sustainably Crafted
              </h2>
              <p className="sub text-md text-main font-4">
                Our T-shirts are crafted from soft, premium fabrics. Enjoy style{" "}
                <br /> and comfort with every wear.
              </p>
            </div>
            <div className="wow fadeInUp box-btn-slider">
              <Link
                to={`/shop-default`}
                className="tf-btn animate-btn btn-large rounded-0"
              >
                Shop Collection
                <i className="icon icon-arr-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
