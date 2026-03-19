import React from "react";

export default function Features() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-title-2 text-center">
          <p className="display-md-2 fw-medium">Why Choose Vineta</p>
          <p className="text-md text-main">
            Our products are crafted with innovation and an eye for the latest
            trends. We push the boundaries of{" "}
            <br className="d-none d-lg-block" />
            traditional fashion, delivering bold, fresh designs that inspire
            confidence and individuality.
          </p>
        </div>
        <div className="row">
          <div className="col-xl-7 col-md-6">
            <ul className="list-esd d-md-flex flex-md-column justify-content-md-center h-100">
              <li className="item">
                <h6>Ethics &amp; Responsibility</h6>
                <p className="text-md">
                  At Vineta, we are dedicated to upholding the highest ethical
                  standards in production. We ensure mindful manufacturing
                  through regular audits, training, and a strong focus on
                  responsible sourcing.
                </p>
              </li>
              <li className="item">
                <h6>Style Meets Durability</h6>
                <p className="text-md">
                  From classic tailoring to casual staples, our Vineta
                  collections embrace the latest trends while prioritizing
                  comfort and long-lasting quality.
                </p>
              </li>
              <li className="item">
                <h6>Express Yourself</h6>
                <p className="text-md">
                  Our designs are crafted with the latest fashion trends in
                  mind, offering flexibility for individual expression,
                  especially for the modern, style-conscious youth.
                </p>
              </li>
            </ul>
          </div>
          <div className="col-xl-5 col-md-6">
            <div className="image radius-16 overflow-hidden w-100 h-100">
              <img
                src="/images/section/about-2.jpg"
                alt=""
                className="lazyload w-100 h-100 object-fit-cover"
                width={586}
                height={586}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
