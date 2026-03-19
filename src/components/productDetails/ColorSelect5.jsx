"use client";

import React, { useState } from "react";

const colorOptionsDefault = [
  {
    id: "values-black",
    value: "Black",
    color: "dark-3",
    img: "/images/products/fashion/women-black-1.jpg",
  },
  {
    id: "values-yellow",
    value: "Yellow",
    color: "yellow",
    img: "/images/products/fashion/women-yellow-1.jpg",
  },
  {
    id: "values-grey",
    value: "Grey",
    color: "grey-2",
    img: "/images/products/fashion/women-grey-1.jpg",
  },
];
export default function ColorSelect5({
  activeColor = "",
  setActiveColor,
  colorOptions = colorOptionsDefault,
}) {
  const [activeColorDefault, setActiveColorDefault] = useState("Black");

  const handleSelectColor = (value) => {
    if (setActiveColor) {
      setActiveColor(value);
    } else {
      setActiveColorDefault(value);
    }
  };
  return (
    <div className="variant-picker-item variant-color">
      <div className="variant-picker-label">
        Colors:
        <span className="variant-picker-label-value value-currentColor">
          {activeColor || activeColorDefault}
        </span>
      </div>

      <div className="variant-picker-values">
        {colorOptions.map(({ id, value, img }) => (
          <div
            key={id}
            onClick={() => {
              handleSelectColor(value);
            }}
            className={`hover-tooltip tooltip-bot color-btn style-image-square  ${
              activeColor
                ? activeColor == value
                  ? "active"
                  : ""
                : activeColorDefault == value
                ? "active"
                : ""
            }`}
          >
            <div className="img">
              <img
                className="lazyloaded"
                alt="img"
                src={img}
                width={828}
                height={1241}
              />
            </div>

            <span className="tooltip">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
