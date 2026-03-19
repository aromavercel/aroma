"use client";

import React, { useState } from "react";

const colorOptionsDefault = [
  {
    id: "values-black",
    value: "Black",
    color: "dark-3",
  },
  {
    id: "values-yellow",
    value: "Yellow",
    color: "yellow",
  },
  {
    id: "values-grey",
    value: "Grey",
    color: "grey-2",
  },
];
export default function ColorSelect3({
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
      <div
        className="tf-variant-dropdown has-color full"
        data-bs-toggle="dropdown"
      >
        <div className="btn-select">
          <span className="text-sort-value value-currentColor">Black</span>
          <span className="icon icon-arrow-down" />
        </div>
        <div className="dropdown-menu">
          {colorOptions.map(({ id, value, color }) => (
            <div
              key={id}
              onClick={() => {
                handleSelectColor(value);
              }}
              className={`select-item  color-btn  ${
                activeColor
                  ? activeColor == value
                    ? "active"
                    : ""
                  : activeColorDefault == value
                  ? "active"
                  : ""
              }`}
            >
              <span className={`box-color bg-${color}`}></span>
              <span className="text-value-item">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
