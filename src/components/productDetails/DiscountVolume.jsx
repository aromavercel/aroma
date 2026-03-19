"use client";
import React, { useState } from "react";

export default function DiscountVolume() {
  const [activeIndex, setActiveIndex] = useState(0);

  const discounts = [
    {
      name: "Buy 2 items for 10% OFF",
      savings: "You save $10",
      newPrice: "$250",
      oldPrice: "$260",
      tag: "",
      tagClass: "",
    },
    {
      name: "Buy 2 items for 10% OFF",
      savings: "You save $10",
      newPrice: "$250",
      oldPrice: "$260",
      tag: "Most Popular",
      tagClass: "bg-primary",
    },
    {
      name: "Buy 2 items for 10% OFF",
      savings: "You save $10",
      newPrice: "$250",
      oldPrice: "$260",
      tag: "Best Value",
      tagClass: "bg-violet pos2",
    },
  ];

  return (
    <div className="tf-product-volume-discount">
      <h6 className="title-discount text-center">Buy more, Save more!</h6>
      <div className="flat-check-list list-volume-discount">
        {discounts.map((discount, index) => (
          <div
            key={index}
            className={`check-item volume-discount-item cursor-pointer ${
              index === activeIndex ? "active" : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <div className="check">
              <span />
            </div>
            <div className="content-discount">
              <div className="info-discount">
                <p className="name text-md">{discount.name}</p>
                <p className="text text-xs">{discount.savings}</p>
              </div>
              <span className="tag-shipping text-xs">FREE SHIPPING</span>
              <div className="discount-price">
                <span className="price-new text-md fw-medium">
                  {discount.newPrice}
                </span>
                <span className="price-old fw-medium">{discount.oldPrice}</span>
              </div>
            </div>
            {discount.tag && (
              <div className={`tag-sale ${discount.tagClass}`}>
                {discount.tag}
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="tf-btn btn-primary w-100 animate-btn">
        Grab this deal
      </button>
    </div>
  );
}
