import { Link } from "react-router-dom";
import React from "react";
import ProgressBarComponent from "../common/Progressbar";

export default function Cartmodal2() {
  return (
    <div
      className="offcanvas offcanvas-end popup-style-1  popup-shopping-cart style-empty"
      id="shoppingCart"
    >
      <div className="canvas-wrapper">
        <div className="popup-header">
          <span className="title">Shopping cart</span>
          <span
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
          />
        </div>
        <div className="wrap">
          <div className="tf-mini-cart-threshold">
            <div className="text">
              Spend <span className="fw-medium">$100</span> more to get{" "}
              <span className="fw-medium">Free Shipping</span>
            </div>
            <div className="tf-progress-bar tf-progress-ship">
              <ProgressBarComponent max={75}>
                <i className="icon icon-car" />
              </ProgressBarComponent>
            </div>
          </div>
          <div className="cart-empty-wrap">
            <img
              alt=""
              src="/images/section/cart-empty.png"
              width={227}
              height={227}
            />
            <p className="display-sm">Your cart is empty</p>
            <Link
              to="/catalogo"
              className="tf-btn animate-btn d-inline-flex bg-dark-2 w-max-content"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
