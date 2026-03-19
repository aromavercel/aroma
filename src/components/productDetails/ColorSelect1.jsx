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

export default function ColorSelect1({
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
        <span
          className="text-title variant-picker-label-value value-currentColor"
          style={{ textTransform: "capitalize" }}
        >
          {activeColor || activeColorDefault}
        </span>
      </div>
      <div className="variant-picker-values">
        {colorOptions.map(({ id, value, color }) => (
          <React.Fragment key={id}>
            <div
              onClick={() => {
                handleSelectColor(value);
              }}
              className={`hover-tooltip tooltip-bot color-btn ${
                activeColor
                  ? activeColor == value
                    ? "active"
                    : ""
                  : activeColorDefault == value
                  ? "active"
                  : ""
              }`}
              htmlFor={id}
            >
              <span className={`check-color bg-${color}`} />
              <span className="tooltip">{value}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
