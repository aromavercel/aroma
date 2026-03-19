"use client";
import { brands, sizes } from "@/data/filterOptions";
import React from "react";
import Slider from "rc-slider";
import { products1 } from "@/data/products";
import { Link } from "react-router-dom";

export default function Sidebar({ allProps }) {
  return (
    <>
      {" "}
      <div className="canvas-header d-flex d-xl-none">
        <span className="title">Filter</span>
        <span className="icon-close icon-close-popup close-filter" />
      </div>
      <div className="canvas-body">
        <div className="widget-facet">
          <div
            className="facet-title text-xl fw-medium"
            data-bs-target="#collections"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="collections"
          >
            <span>Collections</span>
            <span className="icon icon-arrow-up" />
          </div>
          <div id="collections" className="collapse show">
            <ul className="collapse-body list-categories current-scrollbar">
              <li className="cate-item">
                <Link className="text-sm link" to={`/shop-default`}>
                  <span>Men’s top</span> <span className="count">(20)</span>
                </Link>
              </li>
              <li className="cate-item">
                <Link className="text-sm link" to={`/shop-default`}>
                  <span>Men</span> <span className="count">(20)</span>
                </Link>
              </li>
              <li className="cate-item">
                <Link className="text-sm link" to={`/shop-default`}>
                  <span>Women</span> <span className="count">(20)</span>
                </Link>
              </li>
              <li className="cate-item">
                <Link className="text-sm link" to={`/shop-default`}>
                  <span>Kid</span> <span className="count">(20)</span>
                </Link>
              </li>
              <li className="cate-item">
                <Link className="text-sm link" to={`/shop-default`}>
                  <span>T-shirt</span> <span className="count">(20)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="widget-facet">
          <div
            className="facet-title text-xl fw-medium"
            data-bs-target="#availability"
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="availability"
          >
            <span>Availability</span>
            <span className="icon icon-arrow-up" />
          </div>
          <div id="availability" className="collapse show">
            <ul className="collapse-body filter-group-check current-scrollbar">
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
        <div className="widget-facet">
          <div
            className="facet-title text-xl fw-medium"
            data-bs-target="#price"
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="price"
          >
            <span>Price</span>
            <span className="icon icon-arrow-up" />
          </div>
          <div id="price" className="collapse show">
            <div className="collapse-body widget-price filter-price">
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
        <div className="widget-facet">
          <div
            className="facet-title text-xl fw-medium"
            data-bs-target="#color"
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="color"
          >
            <span>Color</span>
            <span className="icon icon-arrow-up" />
          </div>
          <div id="color" className="collapse show">
            <div className="collapse-body filter-color-box flat-check-list">
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
        <div className="widget-facet">
          <div
            className="facet-title text-xl fw-medium"
            data-bs-target="#size"
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="size"
          >
            <span>Size</span>
            <span className="icon icon-arrow-up" />
          </div>
          <div id="size" className="collapse show">
            <div className="collapse-body filter-size-box flat-check-list">
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
        <div className="widget-facet">
          <div
            className="facet-title text-xl fw-medium"
            data-bs-target="#brand"
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="brand"
          >
            <span>Brand</span>
            <span className="icon icon-arrow-up" />
          </div>
          <div id="brand" className="collapse show">
            <ul className="collapse-body filter-group-check current-scrollbar">
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
        <div className="widget-facet">
          <div className="facet-title text-xl fw-medium">
            <span>On sale</span>
          </div>
          <ul className="collapse-body list-recent">
            {products1.slice(0, 2).map((product, i) => (
              <li key={i}>
                <div className="recent-blog-item">
                  <Link
                    to={`/product-detail/${product.id}`}
                    className="img-product"
                  >
                    <img
                      alt="img"
                      src={product.imgSrc}
                      width={113}
                      height={168}
                    />
                  </Link>
                  <div className="content">
                    <Link
                      to={`/product-detail/${product.id}`}
                      className="title text-md link fw-medium"
                    >
                      {product.title}
                    </Link>
                    <div className="price text-md fw-medium">
                      <span className="new-price">
                        ${product.price.toFixed(2)}
                      </span>{" "}
                      {product.oldPrice && (
                        <span className="old-price">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm">3 color available</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="widget-facet">
          <div className="sb-banner hover-img">
            <div className="image img-style">
              <img
                src="/images/blog/sb-banner.jpg"
                alt="banner"
                className="lazyload"
                width={732}
                height={1036}
              />
            </div>
            <div className="banner-content">
              <p className="title">
                Elevate <br />
                Your Style
              </p>
              <a href="#" className="tf-btn btn-white hover-primary">
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
