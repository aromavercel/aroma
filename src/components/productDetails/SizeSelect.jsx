"use client";
import { useState } from "react";

const SizePicker = () => {
  const [currentSize, setCurrentSize] = useState("Small");
  const [activeSize, setActiveSize] = useState("small");

  const sizes = [
    { label: "S", value: "small", display: "Small" },
    { label: "M", value: "medium", display: "Medium" },
    { label: "L", value: "large", display: "Large" },
    { label: "XL", value: "extra large", display: "Extra Large" },
  ];

  const handleSizeClick = (size) => {
    setActiveSize(size.value);
    setCurrentSize(size.display);
  };

  return (
    <div className="variant-picker-item variant-size">
      <div className="variant-picker-label">
        <div>
          Size:
          <span className="variant-picker-label-value value-currentSize">
            {currentSize}
          </span>
        </div>
        <a href="#sizeGuide" data-bs-toggle="modal" className="size-guide link">
          Size Guide
        </a>
      </div>
      <div className="variant-picker-values">
        {sizes.map((size) => (
          <span
            key={size.value}
            className={`size-btn ${activeSize === size.value ? "active" : ""}`}
            data-size={size.value}
            onClick={() => handleSizeClick(size)}
          >
            {size.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SizePicker;
