import React from "react";

import { Link } from "react-router-dom";
export default function Banner2() {
  return (
    <section className="s-banner-with-text banner-text-pet flat-spacing-3">
      <div className="container">
        <div className="row flex-wrap-reverse">
          <div className="col-md-6 hover-shine">
            <div className="content-banner wow fadeInUp">
              <div className="box-title-banner">
                <h2 className="font-5">
                  Purrfect Care for <br />
                  Your Pets
                </h2>
                <p className="text-md">
                  Explore top-quality products for your furry companions. Shop
                  <br />
                  now for all their needs!Explore top-quality products for your
                  furry <br />
                  companions. Shop now for all their needs!
                </p>
              </div>
              <div className="box-btn-banner">
                <Link
                  to={`/shop-default`}
                  className="tf-btn animate-btn btn-dark2"
                >
                  Shop Collection
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="image-banner image shine-item">
              <img
                src="/images/banner/pet.jpg"
                alt=""
                className="lazyload"
                width={708}
                height={708}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
