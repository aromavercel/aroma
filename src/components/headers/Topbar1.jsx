import React from "react";
import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";

export default function Topbar1() {
  return (
    <div className="tf-topbar bg-dark-5 topbar-bg">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-2 col-xl-3 d-none d-lg-block">
            <ul className="topbar-left tf-social-icon">
              <li>
                <a
                  href="https://www.facebook.com/"
                  className="social-item social-facebook"
                >
                  <i className="icon icon-fb" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  className="social-item social-instagram"
                >
                  <i className="icon icon-instagram" />
                </a>
              </li>
              <li>
                <a href="https://x.com/" className="social-item social-x">
                  <i className="icon icon-x" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.snapchat.com/"
                  className="social-item social-snapchat"
                >
                  <i className="icon icon-snapchat" />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-7 col-xl-6 overflow-hidden">
            <div className="topbar-center marquee-wrapper">
              <div className="initial-child-container">
                <div className="marquee-child-item">
                  <p>Return extended to 60 days</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Life-time Guarantes</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Limited-Time Offer</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                {/* 2 */}
                <div className="marquee-child-item">
                  <p>Return extended to 60 days</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Life-time Guarantes</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Limited-Time Offer</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                {/* 3 */}
                <div className="marquee-child-item">
                  <p>Return extended to 60 days</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Life-time Guarantes</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Limited-Time Offer</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                {/* 4 */}
                <div className="marquee-child-item">
                  <p>Return extended to 60 days</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Life-time Guarantes</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Limited-Time Offer</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                {/* 5 */}
                <div className="marquee-child-item">
                  <p>Return extended to 60 days</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Life-time Guarantes</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Limited-Time Offer</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="topbar-right">
              <div className="tf-languages d-none d-xl-block">
                <LanguageSelect topStart />
              </div>
              <div className="tf-currencies d-none d-lg-block">
                <CurrencySelect topStart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
