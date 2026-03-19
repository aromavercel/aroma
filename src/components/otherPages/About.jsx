import React from "react";

export default function About() {
  return (
    <section className="flat-spacing-3 pb-0">
      <div className="container">
        <div className="flat-title-2 d-xl-flex justify-content-xl-between">
          <div className="box-title">
            <p className="display-lg-2 fw-medium">Welcome to Vineta</p>
            <p className="text-xl">The Ultimate Fashion Destination</p>
          </div>
          <div className="box-text">
            <p className="text-md">
              At <span className="fw-medium">Vineta</span>, we bring you
              thoughtfully curated collections that blend contemporary
              <br className="d-none d-xl-block" />
              designs with timeless elegance. With over 15 years of experience,
              we cater to <br className="d-none d-xl-block" />
              fashion enthusiasts who appreciate quality, style, and
              versatility.
            </p>
          </div>
        </div>
        <div className="image radius-16 overflow-hidden">
          <img
            src="/images/section/about.jpg"
            alt=""
            className="lazyload"
            width={1440}
            height={502}
          />
        </div>
      </div>
    </section>
  );
}
