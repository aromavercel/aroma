import { Link } from "react-router-dom";
import React from "react";

export default function Breadcumb({
  pageName = "Addresses",
  pageTitle = "My Orders",
}) {
  return (
    <section className="tf-page-title">
      <div className="container">
        <div className="box-title text-center">
          <h4 className="title">{pageTitle}</h4>
          <div className="breadcrumb-list">
            <Link className="breadcrumb-item" to={`/`}>
              Home
            </Link>
            <div className="breadcrumb-item dot">
              <span />
            </div>
            <div className="breadcrumb-item current">{pageName}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
