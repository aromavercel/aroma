"use client";
import { brands, sizes } from "@/data/filterOptions";
import React from "react";
import Slider from "rc-slider";
export default function FilterDropdown({ allProps }) {
  return (
    <div className="tf-filter-dropdown">
      <span className="title-filter">Filter:</span>
      <div className="meta-dropdown-filter">
        <div className="dropdown dropdown-filter">
          <div
            className="dropdown-toggle"
            id="availability"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
          >
            <span className="text-value">Availability</span>
            <span className="icon icon-arr-down" />
          </div>
          <div className="dropdown-menu" aria-labelledby="availability">
            <ul className="filter-group-check">
              <li
                className="list-item"
                onClick={() => allProps.setAvailability(true)}
              >
                <input
                  type="radio"
                  className="tf-check"
                  readOnly
                  checked={allProps.availability == true}
                />
                <label className="label">
                  <span>In stock</span>&nbsp;
                  <span className="count">(20)</span>
                </label>
              </li>
              <li
                className="list-item"
                onClick={() => allProps.setAvailability(false)}
              >
                <input
                  type="radio"
                  className="tf-check"
                  checked={allProps.availability == false}
                  readOnly
                />
                <label className="label">
                  <span>Out of stock</span>&nbsp;
                  <span className="count">(3)</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="dropdown dropdown-filter">
          <div
            className="dropdown-toggle"
            id="price"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
          >
            <span className="text-value">Price</span>
            <span className="icon icon-arr-down" />
          </div>
          <div className="dropdown-menu" aria-labelledby="price">
            <div className="widget-price filter-price">
              <div
                className="price-val-range"
                id="price-value-range"
                data-min={0}
                data-max={500}
              >
                <Slider
                  value={allProps.price}
                  onChange={(price) => allProps.setPrice(price)}
                  range
                  min={0}
                  max={500}
                />
              </div>
              <div className="box-value-price">
                <span className="text-sm">Price:</span>
                <div className="price-box">
                  <div
                    className="price-val"
                    id="price-min-value"
                    data-currency="$"
                  >
                    {allProps.price[0]}
                  </div>
                  <span>-</span>
                  <div
                    className="price-val"
                    id="price-max-value"
                    data-currency="$"
                  >
                    {allProps.price[1]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-filter">
          <div
            className="dropdown-toggle"
            id="color"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
          >
            <span className="text-value">Color</span>
            <span className="icon icon-arr-down" />
          </div>
          <div className="dropdown-menu" aria-labelledby="color">
            <div className="filter-color-box flat-check-list">
              {[
                { bgClass: "bg-yellow", name: "Yellow", hasLine: false },
                { bgClass: "bg-dark", name: "Black", hasLine: false },
                { bgClass: "bg-white", name: "White", hasLine: true },
                { bgClass: "bg-purple-3", name: "Purple", hasLine: false },
                {
                  bgClass: "bg-light-orange",
                  name: "Light Orange",
                  hasLine: false,
                },
                {
                  bgClass: "bg-light-pink-4",
                  name: "Light Pink",
                  hasLine: false,
                },
                { bgClass: "bg-pink", name: "Pink", hasLine: false },
                {
                  bgClass: "bg-dark-green",
                  name: "Dark Green",
                  hasLine: false,
                },
                { bgClass: "bg-grey-4", name: "Grey", hasLine: false },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`check-item color-item color-check ${
                    allProps.color == item.name ? "active" : ""
                  } ${item.hasLine ? "line" : ""}`}
                  onClick={() => allProps.setColor(item.name)}
                >
                  <span className={`color ${item.bgClass}`} />
                  <span className="color-text">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-filter">
          <div
            className="dropdown-toggle"
            id="size"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
          >
            <span className="text-value">Size</span>
            <span className="icon icon-arr-down" />
          </div>
          <div className="dropdown-menu" aria-labelledby="size">
            <div className="filter-size-box flat-check-list">
              {sizes.map((item) => (
                <div
                  key={item.size}
                  onClick={() => allProps.setSize(item.size)}
                  className={`check-item size-item size-check ${
                    item.size == allProps.size ? "active" : ""
                  } `}
                >
                  <span className="size">{item.size}</span>&nbsp;
                  <span className="count">({item.count})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-filter">
          <div
            className="dropdown-toggle"
            id="price"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
          >
            <span className="text-value">Brand</span>
            <span className="icon icon-arr-down" />
          </div>
          <div className="dropdown-menu" aria-labelledby="brand">
            <ul className="filter-group-check">
              {brands.map((brand) => (
                <li
                  key={brand.name}
                  className="list-item"
                  onClick={() => allProps.setBrands(brand.name)}
                >
                  <input
                    type="radio"
                    className="tf-check"
                    readOnly
                    checked={allProps.brands.includes(brand.name)}
                  />
                  <label className="label">
                    <span>{brand.name}</span>&nbsp;
                    <span className="count">({brand.count})</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
