import React from "react";

export default function ShareModal() {
  return (
    <div
      className="modal modalCentered fade modal-share-social popup-style-2"
      id="shareSocial"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <span className="title text-xl-2 fw-medium">Share</span>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="wrap-code style-1">
            <div className="coppyText" id="coppyText">
              http://vince.com
            </div>
            <div
              className="btn-coppy-text tf-btn animate-btn d-inline-flex w-max-content"
              id="btn-coppy-text"
            >
              Copy
            </div>
          </div>
          <ul className="topbar-left tf-social-icon style-1">
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
    </div>
  );
}
