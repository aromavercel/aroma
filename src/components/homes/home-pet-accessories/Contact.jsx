import React from "react";

export default function Contact() {
  return (
    <section className="">
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h4 className="title font-5">Visit Us!</h4>
          <p className="desc text-main text-md">
            Discover expert advice, style inspiration, and product updates on
            our blog.
          </p>
        </div>
        <div className="wg-map style-absolute">
          <iframe
            className="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27294.62418958524!2d151.25730233429948!3d-33.82005608618041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ab8bc95a137f%3A0x358f04a7f6f5f6a6!2sGrotto%20Point%20Lighthouse!5e0!3m2!1sen!2s!4v1733976867160!5m2!1sen!2s"
            style={{ border: "none" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="box-store style-2">
            <h6>Vineta Store</h6>
            <ul>
              <li>
                <a
                  className="link text-sm text-main"
                  href="https://www.google.com/maps?q=15Yarranst,Punchbowl,NSW,Australia"
                  target="_blank"
                >
                  15 Yarran st, Punchbowl, NSW, Australia
                </a>
              </li>
              <li>
                <a
                  className="link text-sm text-main"
                  href="mailto:support@vineta.com"
                >
                  support@vineta.com
                </a>
              </li>
              <li>
                <a className="link text-sm text-main" href="tel:123456">
                  (01) 245 2451
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <span className="text-main text-sm">
                  {" "}
                  Mon - Fri: 8am - 5pm{" "}
                </span>
              </li>
              <li>
                <span className="text-main text-sm"> Weekend: 9am - 3pm </span>
              </li>
            </ul>
            <div className="bot">
              <a
                href="https://www.google.com/maps?q=15Yarranst,Punchbowl,NSW,Australia"
                className="tf-btn btn-line fw-normal"
              >
                <span className="text-sm"> See location </span>
                <i className="icon-arrow-top-left fs-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
