import React from "react";
import { Link } from "react-router-dom";

export default function Breadcumb({
  product,
  backLink = "/shop-default",
  backLabel = "Voltar ao catálogo",
}) {
  return (
    <>
      <div className="breadcrumb-sec">
        <div className="container">
          <div className="breadcrumb-wrap">
            <div className="breadcrumb-list">
              <Link to={`/`} className="breadcrumb-item">
                Início
              </Link>
              <div className="breadcrumb-item dot">
                <span />
              </div>
              <div className="breadcrumb-item current">
                {" "}
                {product?.title ? product?.title : "Linen Blend Pants"}
              </div>
            </div>
            <div className="breadcrumb-prev-next">
              <Link
                to={backLink}
                className="breadcrumb-back-catalog link text-decoration-none"
              >
                <i className="icon icon-arr-left" aria-hidden />
                <span>{backLabel}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
