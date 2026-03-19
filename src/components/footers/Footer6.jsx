"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

export default function Footer6() {
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
    <footer id="footer" className="footer-default xl-pb-70 bg-yellow-7">
      <div className="footer-body line-top">
        <div className="container">
          <div className="row-footer">
            <div className="footer-col-block s1 border-0">
              <div className="footer-logo mb_32">
                <Link to={`/home-jewelry`}>
                  <img
                    className="logo"
                    alt="logo"
                    width={128}
                    height={33}
                    src="/images/logo/logo.svg"
                  />
                </Link>
              </div>
              <div className="footer-heading footer-heading-mobile text-xl fw-medium font-11 d-sm-none d-flex">
                BUSINESS CONTACT
              </div>
              <div className="tf-collapse-content">
                <div className="footer-contact">
                  <p className="body-mb_12 font-11">
                    Find a location nearest you.
                  </p>
                  <Link
                    to={`/store-location`}
                    className="tf-btn btn-line-dark fw-normal mb_12 body-text font-11"
                  >
                    <span className="text-sm text-transform-none">
                      See Our Stores
                    </span>
                  </Link>
                  <p className="body-mb_12 font-11">(64) 8344 1233</p>
                  <p className="body-text mb_40 font-11">hello@ecomposer.com</p>
                  <ul className="tf-social-icon style-white">
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
                      <a
                        href="https://www.snapchat.com/"
                        className="social-item social-linkedin"
                      >
                        <i className="icon icon-linkedin" />
                      </a>
                    </li>
                    <li>
                      <a href="https://x.com/" className="social-item social-x">
                        <i className="icon icon-x" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-inner-wrap s3 border-0 mb_20">
              <div className="footer-col-block inner-col">
                <div className="footer-heading footer-heading-mobile text-xl fw-medium font-11">
                  QUICK LINK
                </div>
                <div className="tf-collapse-content">
                  <ul className="footer-menu-list">
                    <li>
                      <Link className="font-11 body-text" to={`/about-us`}>
                        Our Story
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="font-11 body-text"
                        to={`/store-location`}
                      >
                        Visit Our Store
                      </Link>
                    </li>
                    <li>
                      <Link className="font-11 body-text" to={`/contact-us`}>
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link className="font-11 body-text" to={`/account-page`}>
                        Account
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="footer-col-block inner-col">
                <div className="footer-heading footer-heading-mobile text-xl fw-medium font-11">
                  CONNECT US
                </div>
                <div className="tf-collapse-content">
                  <ul className="footer-menu-list">
                    <li>
                      <a
                        className="font-11 body-text"
                        href="https://www.facebook.com/"
                      >
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a
                        className="font-11 body-text"
                        href="https://www.instagram.com/"
                      >
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a className="font-11 body-text" href="https://x.com/">
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a
                        className="font-11 body-text"
                        href="https://www.pinterest.com/"
                      >
                        Pinterest
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-inner-wrap footer-col-block s2 border-0">
              <div className="footer-heading footer-heading-mobile text-xl fw-medium font-11">
                SUBSCRIBE TO NEWSLETTER
              </div>
              <div className="tf-collapse-content">
                <div className="footer-newsletter">
                  <p className="font-11 body-text">
                    Subcribe for 15% off your first order and unlock your inner
                    potential with us.
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
                          className="subscribe-email rounded-0 bg-white h-46"
                          placeholder="Your email"
                          tabIndex={0}
                          aria-required="true"
                          required
                        />
                      </fieldset>
                      <div className="button-submit">
                        <button
                          type="submit"
                          className="subscribe-button animate-btn font-11 body-text rounded-0 h-46 border-0"
                        >
                          Submit
                          <i className="icon-arrow-top-left fs-10" />
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
      <div className="footer-bottom line-3">
        <div className="container">
          <div className="footer-bottom-wrap">
            <p className="text-dark-8 text-md font-9">
              All Rights Reserved 2025 Vineta.
            </p>
            <ul className="tf-payment">
              <li className="item">
                <img
                  alt="payment"
                  width={80}
                  height={50}
                  src="/images/payment/EximBank.png"
                />
              </li>
              <li className="item">
                <img
                  alt="payment"
                  width={90}
                  height={64}
                  src="/images/payment/ApplePay.png"
                />
              </li>
              <li className="item">
                <img
                  alt="payment"
                  width={90}
                  height={64}
                  src="/images/payment/DinersClub.png"
                />
              </li>
              <li className="item">
                <img
                  alt="payment"
                  width={80}
                  height={50}
                  src="/images/payment/Discover.png"
                />
              </li>
              <li className="item">
                <img
                  alt="payment"
                  width={90}
                  height={64}
                  src="/images/payment/GooglePay.png"
                />
              </li>
              <li className="item">
                <img
                  alt="payment"
                  width={80}
                  height={50}
                  src="/images/payment/Mastercard-2.png"
                />
              </li>
              <li className="item">
                <img
                  alt="payment"
                  width={90}
                  height={64}
                  src="/images/payment/Mastercard.png"
                />
              </li>
              <li className="item">
                <img
                  alt="payment"
                  width={80}
                  height={50}
                  src="/images/payment/Shop.png"
                />
              </li>
              <li className="item">
                <img
                  alt="payment"
                  width={80}
                  height={50}
                  src="/images/payment/UnionPay.png"
                />
              </li>
              <li className="item">
                <img
                  alt="payment"
                  width={90}
                  height={64}
                  src="/images/payment/Visa.png"
                />
              </li>
            </ul>
            <ul className="d-flex gap-48 flex-wrap">
              <li>
                <Link className="link" to={`/term-and-condition`}>
                  Terms
                </Link>
              </li>
              <li>
                <Link className="link" to={`/privacy-policy`}>
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
