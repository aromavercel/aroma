import { Link } from "react-router-dom";
import React from "react";

/**
 * Breadcrumb compacto em linha (igual à página de produto/perfume):
 * "Início • …" à esquerda e opcionalmente link de volta à direita.
 * `pageTitle` mantido por compatibilidade com chamadas antigas; o rastro usa `pageName`.
 */
export default function Breadcumb({
  pageName = "Addresses",
  pageTitle: _pageTitle = "My Orders",
  backLink,
  backLabel = "Voltar ao catálogo",
  fullWidth = false,
}) {
  const containerClass = fullWidth ? "container-full" : "container";

  return (
    <div className="breadcrumb-sec">
      <div className={containerClass}>
        <div className="breadcrumb-wrap">
          <div className="breadcrumb-list">
            <Link to="/" className="breadcrumb-item">
              Início
            </Link>
            <div className="breadcrumb-item dot">
              <span />
            </div>
            <div className="breadcrumb-item current">{pageName}</div>
          </div>
          {backLink ? (
            <div className="breadcrumb-prev-next">
              <Link
                to={backLink}
                className="breadcrumb-back-catalog link text-decoration-none"
              >
                <i className="icon icon-arr-left" aria-hidden />
                <span>{backLabel}</span>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
