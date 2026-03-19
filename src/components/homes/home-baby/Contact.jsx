import React from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="s-contact style-2 flex-md-nowrap">
          <div className="content-left bg-light-beige-3 wow fadeInLeft">
            <h4 className="title display-md-3 fw-bold text-blue font-8">
              Contact Us
            </h4>
            <p className="text-sm text-main">
              Have a question? Please contact us using the
              <br className="d-none d-xl-block" />
              customer supportchannels below.
            </p>
            <ul className="contact-list text-dark">
              <li>
                <p>
                  Address:{" "}
                  <a
                    className="link"
                    href="https://www.google.com/maps?q=15Yarranst,Punchbowl,NSW,Australia"
                    target="_blank"
                  >
                    15 Yarran st, Punchbowl, NSW, Australia
                  </a>
                </p>
              </li>
              <li>
                <p>
                  Phone number:{" "}
                  <a className="link" href="tel:123456">
                    {" "}
                    +1 234 567{" "}
                  </a>
                </p>
              </li>
              <li>
                <p>
                  Email:{" "}
                  <a className="link" href="mailto:contact@vineta.com">
                    contact@vineta.com
                  </a>
                </p>
              </li>
              <li>
                <p>
                  Open:{" "}
                  <span className="text-main"> 8am - 7pm, Mon - Sat </span>
                </p>
              </li>
            </ul>
            <Link
              to={`/contact-us`}
              className="tf-btn btn-orange-2 text-capitalize animate-btn"
            >
              Chat with us
            </Link>
          </div>
          <div className="image-right">
            <img
              src="/images/section/contact.jpg"
              alt=""
              className="lazyload"
              width={848}
              height={503}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
