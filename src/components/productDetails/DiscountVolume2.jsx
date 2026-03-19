"use client";

import React, { useState } from "react";

export default function DiscountVolume2() {
  const [activeIndex, setActiveIndex] = useState(0);

  const discounts = [
    {
      imgSrc: "/images/products/recent/recent3.jpg",
      count: "1x Pants",
      newPrice: "$130",
      oldPrice: "$140",
      tag: "",
      tagClass: "",
    },
    {
      imgSrc: "/images/products/recent/recent4.jpg",
      count: "2x Pants",
      newPrice: "$230",
      oldPrice: "($140/item)",
      discountTag: "-10%",
      tag: "Most Popular",
      tagClass: "bg-primary",
    },
    {
      imgSrc: "/images/products/recent/recent5.jpg",
      count: "1x Pants",
      newPrice: "$130",
      oldPrice: "$140",
      tag: "Best Value",
      tagClass: "bg-violet",
    },
  ];

  return (
    <div className="tf-product-volume-discount-thumbnail">
      <h6 className="title-discount text-center">Buy more, Save more!</h6>
      <div className="list-volume-discount-thumbnail flat-check-list">
        {discounts.map((discount, index) => (
          <div
            key={index}
            className={`check-item volume-discount-thumbnail-item ${
              index === activeIndex ? "active" : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <div className="image-box">
              <img
                className="lazyload"
                data-src={discount.imgSrc}
                alt="img-product"
                src={discount.imgSrc}
                width={212}
                height={240}
              />
            </div>
            <div className="content-discount">
              <div className="count text-sm">
                <span className="text-xl fw-medium">{discount.count}</span>
              </div>
              <div className="d-flex align-items-center">
                <span className="text-xl price-new">{discount.newPrice}</span>
                {discount.discountTag && (
                  <span className="tag-sold">{discount.discountTag}</span>
                )}
              </div>
              <div className="price-old text-decoration-line-through">
                {discount.oldPrice}
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
