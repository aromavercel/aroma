"use client";
import { products1 } from "@/data/products";
import { Link } from "react-router-dom";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard1 from "../productCards/ProductCard1";

export default function SearchModal() {
  return (
    <div className="modal popup-search fade" id="search">
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="header">
            <button
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="looking-for-wrap">
                  <div className="heading">What are you looking for?</div>
                  <form className="form-search">
                    <fieldset className="text">
                      <input
                        type="text"
                        placeholder="Search"
                        className=""
                        name="text"
                        tabIndex={0}
                        defaultValue=""
                        aria-required="true"
                        required
                      />
                    </fieldset>
                    <button className="" type="submit">
                      <i className="icon icon-search" />
                    </button>
                  </form>
                  <div className="popular-searches justify-content-md-center">
                    <div className="text fw-medium">Popular searches:</div>
                    <ul>
                      <li>
                        <a className="link" href="#">
                          Featured
                        </a>
                      </li>
                      <li>
                        <a className="link" href="#">
                          Trendy
                        </a>
                      </li>
                      <li>
                        <a className="link" href="#">
                          New
                        </a>
                      </li>
                      <li>
                        <a className="link" href="#">
                          Sale
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-10">
                <div className="featured-product">
                  <div className="text-xl-2 fw-medium featured-product-heading">
                    Featured product
                  </div>
                  <Swiper
                    dir="ltr"
                    className="swiper tf-swiper wrap-sw-over"
                    {...{
                      slidesPerView: 2,
                      spaceBetween: 12,
                      speed: 1000,
                      observer: true,
                      observeParents: true,
                      slidesPerGroup: 2,
                      pagination: {
                        el: ".sw-pagination-search",
                        clickable: true,
                      },
                      breakpoints: {
                        768: {
                          slidesPerView: 3,
                          spaceBetween: 12,
                          slidesPerGroup: 3,
                        },
                        1200: {
                          slidesPerView: 4,
                          spaceBetween: 24,
                          slidesPerGroup: 4,
                        },
                      },
                    }}
                    modules={[Pagination]}
                  >
                    {products1.map((product, i) => (
                      <SwiperSlide key={i} className="swiper-slide">
                        <ProductCard1 product={product} />
                      </SwiperSlide>
                    ))}
                    <div className="d-flex d-xl-none sw-dot-default sw-pagination-search justify-content-center" />
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
