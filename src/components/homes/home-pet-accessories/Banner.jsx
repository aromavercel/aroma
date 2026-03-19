import React from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section className="s-banner-colection banner-cls-petaccess">
      <div className="container">
        <div className="banner-content tf-grid-layout tf-col-2">
          <div className="image img-hv-overlay">
            <img
              alt="/images/banner/pet-access.jpg"
              className="lazyload"
              src="/images/banner/pet-access.jpg"
              width={720}
              height={556}
            />
          </div>
          <div className="box-content text-center wow fadeInUp">
            <div className="box-title-banner">
              <h4 className="title display-md font-5">Pamper Your Pet</h4>
              <p className="sub text-lg">
                Find premium products to make your pet’s <br />
                day brighter.
              </p>
            </div>
            <div className="box-btn-banner">
              <Link
                to={`/shop-default`}
                className="tf-btn animate-btn btn-dark2"
              >
                Explore Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
