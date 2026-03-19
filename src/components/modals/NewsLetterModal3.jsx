"use client";
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
export default function Newsletter3() {
  const modalElement = useRef();
  useEffect(() => {
    const showModal = async () => {
      const bootstrap = await import("bootstrap"); // dynamically import bootstrap
      const myModal = new bootstrap.Modal(
        document.getElementById("newsletterPopup"),
        {
          keyboard: false,
        }
      );

      // Show the modal after a delay using a promise
      await new Promise((resolve) => setTimeout(resolve, 2000));
      myModal.show();

      modalElement.current?.addEventListener("hidden.bs.modal", () => {
        myModal.hide();
      });
    };

    showModal();
  }, []);
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

  return (
    <div
      className="modal modalCentered auto-popup fade modal-newsletter style-absolute"
      id="newsletterPopup"
      ref={modalElement}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-top">
            <img
              className="lazyload"
              data-src="/images/section/newsletter-1.jpg"
              src="/images/section/newsletter-1.jpg"
              alt="images"
            />
            <span
              className="icon icon-close btn-hide-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="modal-bottom text-center">
            <h5 className="title">Sign up to our Newsletter</h5>
            <p className="text text-sm text-main">
              Be the first to get the latest news about trends, <br />{" "}
              promotions, and much more!
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
              <div className="mb_20">
                <fieldset className="email position-relative">
                  <i className="icon icon-mail" />
                  <input
                    type="email"
                    name="email"
                    className=""
                    placeholder="Your email address"
                    tabIndex={0}
                    aria-required="true"
                    required
                  />
                </fieldset>
              </div>
              <button
                className="subscribe-button tf-btn animate-btn d-inline-flex bg-dark-2 w-100"
                type="submit"
              >
                Send
              </button>
            </form>
            <ul className="tf-social-icon style-default justify-content-center">
              <li>
                <a href="https://x.com/" className="social-x">
                  <i className="icon icon-x" />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/" className="social-facebook">
                  <i className="icon icon-fb2" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  className="social-instagram"
                >
                  <i className="icon icon-instagram" />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/" className="social-youtube">
                  <i className="icon icon-youtube" />
                </a>
              </li>
            </ul>
            <p className="text text-sm mb-0 text-main">
              Will be used in accordance with our{" "}
              <Link to={`/privacy-policy`} className="fw-medium">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
