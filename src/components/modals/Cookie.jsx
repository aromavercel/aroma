"use client";

import { Link } from "react-router-dom";
import { useState } from "react";

export default function Cookie() {
  const [hasAccepted, setHasAccepted] = useState(false);
  return (
    <>
      {!hasAccepted && (
        <div className="cookie-banner" id="cookie-banner">
          <div className="overplay" />
          <div className="content">
            <p className="text-md">
              The cookie settings on this website are set to "allow all cookies"
              to give you the very best experience. Please click Accept Cookies
              to continue to use the site.
            </p>
            <div className="button-group">
              <Link
                className="btn-out-line-white btn-submit-total tf-btn"
                to={`/privacy-policy`}
              >
                Privacy Policy
              </Link>
              <button
                id="accept-cookie"
                onClick={() => setHasAccepted(true)}
                className="accept-button btn-out-line-white btn-submit-total tf-btn"
              >
                Accept Cookies
              </button>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
}
