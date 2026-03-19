import React from "react";

export default function Collections() {
  return (
    <section className="flat-spacing-16">
      <div className="container">
        <div className="flat-animate-tab overflow-visible section-cls-tabs">
          <div className="left tab-content">
            <div className="tab-pane active show" id="paddle" role="tabpanel">
              <img
                className="img-product lazyload"
                data-src="/images/cls-categories/pickleball/cls-1.jpg"
                alt="image"
                width={929}
                height={861}
                src="/images/cls-categories/pickleball/cls-1.jpg"
              />
            </div>
            <div className="tab-pane" id="apparel" role="tabpanel">
              <img
                className="img-product lazyload"
                data-src="/images/cls-categories/pickleball/cls-1.jpg"
                alt="image"
                width={929}
                height={861}
                src="/images/cls-categories/pickleball/cls-1.jpg"
              />
            </div>
            <div className="tab-pane" id="balls" role="tabpanel">
              <img
                className="img-product lazyload"
                data-src="/images/cls-categories/pickleball/cls-1.jpg"
                alt="image"
                width={929}
                height={861}
                src="/images/cls-categories/pickleball/cls-1.jpg"
              />
            </div>
            <div className="tab-pane" id="bags" role="tabpanel">
              <img
                className="img-product lazyload"
                data-src="/images/cls-categories/pickleball/cls-1.jpg"
                alt="image"
                width={929}
                height={861}
                src="/images/cls-categories/pickleball/cls-1.jpg"
              />
            </div>
          </div>
          <div className="right">
            <ul className="menu-tab-line" role="tablist">
              <li className="nav-tab-item" role="presentation">
                <a
                  href="#paddle"
                  className="fw-normal font-10 tab-link active"
                  data-bs-toggle="tab"
                >
                  Paddle Collection
                  <i className="icon icon-arrow-top-left" />
                </a>
              </li>
              <li className="nav-tab-item" role="presentation">
                <a
                  href="#apparel"
                  className="fw-normal font-10 tab-link"
                  data-bs-toggle="tab"
                >
                  Apparel &amp; Accessories
                  <i className="icon icon-arrow-top-left" />
                </a>
              </li>
              <li className="nav-tab-item" role="presentation">
                <a
                  href="#balls"
                  className="fw-normal font-10 tab-link"
                  data-bs-toggle="tab"
                >
                  Balls &amp; Court Equipment
                  <i className="icon icon-arrow-top-left" />
                </a>
              </li>
              <li className="nav-tab-item" role="presentation">
                <a
                  href="#bags"
                  className="fw-normal font-10 tab-link"
                  data-bs-toggle="tab"
                >
                  Bags &amp; Storage
                  <i className="icon icon-arrow-top-left" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
