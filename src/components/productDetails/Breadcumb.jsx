import React from "react";
import { Link } from "react-router-dom";
export default function Breadcumb({ product, backLink = "/shop-default" }) {
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
              <a href="#" className="breadcrumb-prev">
                <i className="icon icon-arr-left" />
              </a>
              <Link to={backLink} className="breadcrumb-back">
                <i className="icon icon-shop" />
              </Link>
              <a href="#" className="breadcrumb-next">
                <i className="icon icon-arr-right2" />
              </a>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
