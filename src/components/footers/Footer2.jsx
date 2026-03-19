"use client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
export default function Footer2() {
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendEmail = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const email = e.target.email.value;

    try {
      const response = await axios.post(
        "https://express-brevomail.vercel.app/api/contacts",
        {
          email,
        }
      );

      if ([200, 201].includes(response.status)) {
        e.target.reset(); // Reset the form
        setSuccess(true); // Set success state
        handleShowMessage();
      } else {
        setSuccess(false); // Handle unexpected responses
        handleShowMessage();
      }
    } catch (error) {
      console.error("Error:", error.response?.data || "An error occurred");
      setSuccess(false); // Set error state
      handleShowMessage();
      e.target.reset(); // Reset the form
    }
  };
  useEffect(() => {
    const headings = document.querySelectorAll(".footer-heading-mobile");

    const toggleOpen = (event) => {
      const parent = event.target.closest(".footer-col-block");
      const content = parent.querySelector(".tf-collapse-content");

      if (parent.classList.contains("open")) {
        parent.classList.remove("open");
        content.style.height = "0px";
      } else {
        parent.classList.add("open");
        content.style.height = content.scrollHeight + 10 + "px";
      }
    };

    headings.forEach((heading) => {
      heading.addEventListener("click", toggleOpen);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      headings.forEach((heading) => {
        heading.removeEventListener("click", toggleOpen);
      });
    };
  }, []); // Empty dependency array means this will run only once on mount

  return (
    <footer
      id="footer"
      className="footer-default footer-style-2 radius-16 line"
    >
      <div className="container-4">
        <div className="footer-body">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="footer-col-block s1">
                <div className="footer-logo">
                  <Link to={`/home-phonecase`}>
                    <img
                      className="logo"
                      alt="logo"
                      src="/images/logo/logo.svg"
                      width={148}
                      height={44}
                    />
                  </Link>
                </div>
                <ul className="footer-info">
                  <li>
                    <p>
                      Email:{" "}
                      <a href="mailto:clientcare@ecom.com">
                        clientcare@ecom.com
                      </a>
                    </p>
                  </li>
                  <li>
                    <p>
                      Phone: <a href="tel:18888383022">1.888.838.3022</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <a
                        className="infor_address"
                        target="_blank"
                        href="https://www.google.com/maps?q=123Yarranst,Punchbowl,NSW2196,Australia"
                      >
                        Address:{" "}
                        <span>
                          123 Yarran st, Punchbowl, NSW 2196, Australia
                        </span>
                      </a>
                    </p>
                  </li>
                </ul>
                <ul className="tf-social-icon style-large">
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
            </div>
            <div className="col-lg-2 col-sm-6">
              <div className="footer-col-block s2">
                <div className="footer-heading footer-heading-mobile text-xl fw-medium">
                  About Us
                </div>
                <div className="tf-collapse-content">
                  <ul className="footer-menu-list">
                    <li>
                      <Link to={`/about-us`}>About Us</Link>
                    </li>
                    <li>
                      <Link to={`/contact-us`}>Contact Us</Link>
                    </li>
                    <li>
                      <Link to={`/store-location`}>Our Store</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-sm-6">
              <div className="footer-col-block s3">
                <div className="footer-heading footer-heading-mobile text-xl fw-medium">
                  Resource
                </div>
                <div className="tf-collapse-content">
                  <ul className="footer-menu-list">
                    <li>
                      <Link to={`/faq`}>FAQs</Link>
                    </li>
                    <li>
                      <Link to={`/term-and-condition`}>
                        Terms &amp; Conditions
                      </Link>
                    </li>
                    <li>
                      <Link to={`/privacy-policy`}>Privacy Policies</Link>
                    </li>
                    <li>
                      <Link to={`/return-and-refund`}>
                        Returns &amp; Refunds
                      </Link>
                    </li>
                    <li>
                      <Link to={`/shipping`}>Shipping</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-sm-6">
              <div className="footer-col-block s4">
                <p className="footer-heading footer-heading-mobile text-xl fw-medium">
                  Subscribe Newsletter
                </p>
                <div className="tf-collapse-content">
                  <div className="footer-newsletter">
                    <p>
                      We invite you to register to read the latest news, offers
                      and events about our company. We promise not spam your
                      inbox.
                    </p>
                    <div
                      className={`tfSubscribeMsg  footer-sub-element ${
                        showMessage ? "active" : ""
                      }`}
                    >
                      {success ? (
                        <p style={{ color: "rgb(52, 168, 83)" }}>
                          You have successfully subscribed.
                        </p>
                      ) : (
                        <p style={{ color: "red" }}>Something went wrong</p>
                      )}
                    </div>
                    <form
                      id="subscribe-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        sendEmail(e);
                      }}
                      className="form-newsletter"
                    >
                      <div className="subscribe-content">
                        <fieldset className="email">
                          <input
                            type="email"
                            name="email"
                            className="subscribe-email"
                            placeholder="Email address"
                            tabIndex={0}
                            aria-required="true"
                            required
                          />
                        </fieldset>
                        <div className="button-submit">
                          <button
                            className="subscribe-button animate-btn"
                            type="submit"
                          >
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_5296_3345)">
                                <path
                                  d="M17.7938 8.50229L17.7931 8.50162L14.1192 4.84537C13.8439 4.57147 13.3988 4.57249 13.1248 4.84776C12.8508 5.123 12.8519 5.56818 13.1271 5.84212L15.5938 8.29687H0.703125C0.314789 8.29687 0 8.61166 0 9C0 9.38833 0.314789 9.70312 0.703125 9.70312H15.5938L13.1272 12.1579C12.8519 12.4318 12.8509 12.877 13.1248 13.1522C13.3988 13.4275 13.844 13.4285 14.1192 13.1546L17.7932 9.49837L17.7938 9.4977C18.0692 9.22285 18.0683 8.77623 17.7938 8.50229Z"
                                  fill="white"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_5296_3345">
                                  <rect width={18} height={18} fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom footer-bottom-wrap">
          <div className="tf-currencies">
            <select className="image-select style-default">
              <option>United States (USD $)</option>
              <option>France (EUR €)</option>
              <option>Germany (EUR €)</option>
              <option>Vietnam (VND ₫)</option>
            </select>
          </div>
          <ul className="tf-payment">
            <li className="item">
              <img
                alt="payment"
                src="/images/payment/EximBank.png"
                width={80}
                height={50}
              />
            </li>
            <li className="item">
              <img
                alt="payment"
                src="/images/payment/ApplePay.png"
                width={90}
                height={64}
              />
            </li>
            <li className="item">
              <img
                alt="payment"
                src="/images/payment/DinersClub.png"
                width={90}
                height={64}
              />
            </li>
            <li className="item">
              <img
                alt="payment"
                src="/images/payment/Discover.png"
                width={80}
                height={50}
              />
            </li>
            <li className="item">
              <img
                alt="payment"
                src="/images/payment/GooglePay.png"
                width={90}
                height={64}
              />
            </li>
            <li className="item">
              <img
                alt="payment"
                src="/images/payment/Mastercard-2.png"
                width={80}
                height={50}
              />
            </li>
            <li className="item">
              <img
                alt="payment"
                src="/images/payment/Mastercard.png"
                width={90}
                height={64}
              />
            </li>
            <li className="item">
              <img
                alt="payment"
                src="/images/payment/Shop.png"
                width={80}
                height={50}
              />
            </li>
            <li className="item">
              <img
                alt="payment"
                src="/images/payment/UnionPay.png"
                width={80}
                height={50}
              />
            </li>
            <li className="item">
              <img
                alt="payment"
                src="/images/payment/Visa.png"
                width={90}
                height={64}
              />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
