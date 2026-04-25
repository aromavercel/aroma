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
              Usamos cookies para melhorar sua experiência. Ao continuar
              navegando, você concorda com o uso de cookies conforme descrito em
              nossa política.
            </p>
            <div className="button-group">
              <Link
                className="btn-out-line-white btn-submit-total tf-btn"
                to={`/politica-de-privacidade`}
              >
                Política de Privacidade
              </Link>
              <button
                id="accept-cookie"
                onClick={() => setHasAccepted(true)}
                className="accept-button btn-out-line-white btn-submit-total tf-btn"
              >
                Aceitar cookies
              </button>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
}
