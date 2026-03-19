"use client";
import React, { useState } from "react";

export default function SizeSelect2() {
  const sizes = ["Small", "Medium", "Large", "Extra Large"];
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <div className="variant-picker-item variant-size">
      <div className="variant-picker-label">
        <div>
          Size:
          <span className="variant-picker-label-value value-currentSize">
            {selectedSize}
          </span>
        </div>
        <a href="#sizeGuide" data-bs-toggle="modal" className="size-guide link">
          Size Guide
        </a>
      </div>
      <div className="tf-variant-dropdown full" data-bs-toggle="dropdown">
        <div className="btn-select">
          <span className="text-sort-value value-currentSize">
            {selectedSize}
          </span>
          <span className="icon icon-arrow-down" />
        </div>
        <div className="dropdown-menu">
          {sizes.map((size, index) => (
            <div
              key={index}
              className={`select-item size-btn ${
                size === selectedSize ? "active" : ""
              }`}
              onClick={() => setSelectedSize(size)}
            >
              <span className="text-value-item">{size}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
