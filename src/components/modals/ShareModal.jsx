import React from "react";
import AromaSocialIcons from "@/components/common/AromaSocialIcons";

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
          <AromaSocialIcons className="topbar-left tf-social-icon style-1" />
        </div>
      </div>
    </div>
  );
}
