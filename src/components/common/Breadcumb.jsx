import { Link } from "react-router-dom";
import React from "react";

export default function Breadcumb({
  pageName = "Addresses",
  pageTitle: _pageTitle = "My Orders",
  backLink,
  backLabel = "Voltar ao catálogo",
  fullWidth = false,
  trail = [],
}) {
  const containerClass = fullWidth ? "container-full" : "container";
  const segments = Array.isArray(trail) ? trail.filter((s) => s && s.label && s.to) : [];

  return (
    <div className="breadcrumb-sec">
      <div className={containerClass}>
        <div className="breadcrumb-wrap">
          <div className="breadcrumb-list">
            <Link to="/" className="breadcrumb-item">
              Início
            </Link>
            {segments.map((s) => (
              <React.Fragment key={`${s.to}-${s.label}`}>
                <div className="breadcrumb-item dot">
                  <span />
                </div>
                <Link to={s.to} className="breadcrumb-item">
                  {s.label}
                </Link>
              </React.Fragment>
            ))}
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
