import React from "react";

export default function ResetPass() {
  return (
    <div
      className="offcanvas offcanvas-end popup-style-1 popup-reset-pass"
      id="resetPass"
    >
      <div className="canvas-wrapper">
        <div className="canvas-header popup-header">
          <span className="title">Reset Your Password</span>
          <button
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="canvas-body popup-inner">
          <form action="#" className="form-login">
            <div className="">
              <p className="text text-sm text-main-2">
                Forgot your password? No worries! Enter your registered email to
                receive a link and securely reset it in just a few steps.
              </p>
              <fieldset className="email mb_12">
                <input type="email" placeholder="Enter Your Email*" />
              </fieldset>
            </div>
            <div className="bot">
              <div className="button-wrap">
                <button
                  className="subscribe-button tf-btn animate-btn bg-dark-2 w-100"
                  type="submit"
                >
                  Reset Password
                </button>
                <button
                  type="button"
                  data-bs-dismiss="offcanvas"
                  className="tf-btn btn-out-line-dark2 w-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
