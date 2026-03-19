"use client";

import React from "react";

export default function BuyXGetY() {
  return (
    <form className="form-buyX-getY" onSubmit={(e) => e.preventDefault()}>
      <h6 className="title-buyX-getY">Special Deal</h6>
      <div className="group-item-product">
        <div className="item-product">
          <div className="ribbon effect-flash text-md">Buy 1</div>
          <div className="img-product">
            <img
              alt="img-product"
              src="/images/products/group/buyx1.jpg"
              width="408"
              height="408"
            />
          </div>
          <div className="info-product">
            <a
              href="#"
              className="name-product text-md fw-medium text-line-clamp-2"
            >
              Turtleneck T-shirt
            </a>
            <span className="price-product text-md fw-medium">$55.00</span>
            <div className="variant-product tf-select">
              <select>
                <option>Black</option>
                <option>White</option>
                <option>Yellow</option>
                <option>Blue</option>
                <option>Pink</option>
                <option>Green</option>
              </select>
            </div>
          </div>
        </div>
        <img
          className="arrow"
          alt=""
          src="/images/section/arr.png"
          width="78"
          height="78"
        />
        <div className="item-product">
          <div className="ribbon effect-flash text-md">Get 1 Off 20%</div>
          <div className="img-product">
            <img
              alt="img-product"
              src="/images/products/group/buyx2.jpg"
              width="408"
              height="408"
            />
          </div>
          <div className="info-product">
            <a
              href="#"
              className="name-product text-md fw-medium text-line-clamp-2"
            >
              Loose Fit Tee
            </a>
            <div className="price-product text-md fw-medium">
              <span className="new-price">$55.00</span>
              <span className="old-price">$75.00</span>
            </div>
            <div className="variant-product tf-select">
              <select>
                <option>Yellow</option>
                <option>White</option>
                <option>Black</option>
                <option>Blue</option>
                <option>Pink</option>
                <option>Green</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <button className="tf-btn btn-primary effect-flash">
        Grab this deal
      </button>
    </form>
  );
}
