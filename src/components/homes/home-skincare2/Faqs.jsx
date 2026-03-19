import { Link } from "react-router-dom";
import React from "react";

export default function Faqs() {
  return (
    <section className="flat-spacing-3 bg-gradient-8 section-asked-questions">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="content">
              <h3 className="title fw-normal fst-italic font-3 letter-0">
                Frequently Asked Questions
              </h3>
              <p className="text-sm text-main">
                If you have an issue or question that requires immediate
                assistance, you can click the button below to chat live with a
                Customer Service representative.
                <br />
                <br />
                Please allow 06 - 12 business days from the time your package
                arrives back to us for a refund to be issued.
              </p>
              <div className="bot">
                <Link
                  to={`/contact-us`}
                  className="tf-btn btn-orange-3 animate-btn fw-semibold font-4"
                >
                  Contact us
                </Link>
                <Link
                  to={`/contact-us`}
                  className="tf-btn btn-white animate-btn animate-dark fw-semibold font-4"
                >
                  Chat with us
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="faq-wrap" id="accordion1">
              <div className="widget-accordion">
                <div
                  className="accordion-title collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse1"
                  aria-expanded="false"
                  aria-controls="collapse1"
                  role="button"
                >
                  <span>What does the lip oil do?</span>
                  <span className="icon icon-arrow-down" />
                </div>
                <div
                  id="collapse1"
                  className="accordion-collapse collapse"
                  aria-labelledby="heading1"
                  data-bs-parent="#accordion1"
                >
                  <div className="accordion-body">
                    <p className="text-main">
                      If your package is delayed or lost, please reach out to
                      our customer support. We’ll work with the carrier to
                      locate your order or arrange a replacement if necessary.
                    </p>
                  </div>
                </div>
              </div>
              <div className="widget-accordion">
                <div
                  className="accordion-title collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse2"
                  aria-expanded="false"
                  aria-controls="collapse2"
                  role="button"
                >
                  <span>Is it made with real honey?</span>
                  <span className="icon icon-arrow-down" />
                </div>
                <div
                  id="collapse2"
                  className="accordion-collapse collapse"
                  aria-labelledby="heading2"
                  data-bs-parent="#accordion1"
                >
                  <div className="accordion-body">
                    <p className="text-main">
                      If your package is delayed or lost, please reach out to
                      our customer support. We’ll work with the carrier to
                      locate your order or arrange a replacement if necessary.
                    </p>
                  </div>
                </div>
              </div>
              <div className="widget-accordion">
                <div
                  className="accordion-title collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse3"
                  aria-expanded="false"
                  aria-controls="collapse3"
                  role="button"
                >
                  <span>Can I use it over lipstick?</span>
                  <span className="icon icon-arrow-down" />
                </div>
                <div
                  id="collapse3"
                  className="accordion-collapse collapse"
                  aria-labelledby="heading3"
                  data-bs-parent="#accordion1"
                >
                  <div className="accordion-body">
                    <p className="text-main">
                      If your package is delayed or lost, please reach out to
                      our customer support. We’ll work with the carrier to
                      locate your order or arrange a replacement if necessary.
                    </p>
                  </div>
                </div>
              </div>
              <div className="widget-accordion">
                <div
                  className="accordion-title collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse4"
                  aria-expanded="false"
                  aria-controls="collapse4"
                  role="button"
                >
                  <span>Is it suitable for sensitive skin?</span>
                  <span className="icon icon-arrow-down" />
                </div>
                <div
                  id="collapse4"
                  className="accordion-collapse collapse"
                  aria-labelledby="heading4"
                  data-bs-parent="#accordion1"
                >
                  <div className="accordion-body">
                    <p className="text-main">
                      If your package is delayed or lost, please reach out to
                      our customer support. We’ll work with the carrier to
                      locate your order or arrange a replacement if necessary.
                    </p>
                  </div>
                </div>
              </div>
              <div className="widget-accordion">
                <div
                  className="accordion-title collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse5"
                  aria-expanded="false"
                  aria-controls="collapse5"
                  role="button"
                >
                  <span>How often can I use it?</span>
                  <span className="icon icon-arrow-down" />
                </div>
                <div
                  id="collapse5"
                  className="accordion-collapse collapse"
                  aria-labelledby="heading5"
                  data-bs-parent="#accordion1"
                >
                  <div className="accordion-body">
                    <p className="text-main">
                      If your package is delayed or lost, please reach out to
                      our customer support. We’ll work with the carrier to
                      locate your order or arrange a replacement if necessary.
                    </p>
                  </div>
                </div>
              </div>
              <div className="widget-accordion">
                <div
                  className="accordion-title collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse6"
                  aria-expanded="false"
                  aria-controls="collapse6"
                  role="button"
                >
                  <span>Is it vegan and cruelty-free?</span>
                  <span className="icon icon-arrow-down" />
                </div>
                <div
                  id="collapse6"
                  className="accordion-collapse collapse"
                  aria-labelledby="heading6"
                  data-bs-parent="#accordion1"
                >
                  <div className="accordion-body">
                    <p className="text-main">
                      If your package is delayed or lost, please reach out to
                      our customer support. We’ll work with the carrier to
                      locate your order or arrange a replacement if necessary.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
