"use client";
import { categoryItems } from "@/data/collections";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <section>
      <div className="container">
        <div className="flat-title-v2 text-center justify-items-center wow fadeInUp">
          <Link
            to={`/shop-sub-collection`}
            className="tf-btn btn-out-line-green btn-small text-uppercase"
          >
            Categories
          </Link>
          <h4>
            Explore a variety of high-performance bikes,
            <br className="d-none d-xl-block" />
            built for speed, durability, and adventure.
          </h4>
        </div>
      </div>
      <div className="slider-layout-right">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper tf-sw-right"
          {...{
            slidesPerView: 2,
            spaceBetween: 12,
            speed: 1000,
            observer: true,
            observeParents: true,
            slidesPerGroup: 2,
            pagination: { el: ".sw-pagination-cls-2", clickable: true },
            breakpoints: {
              768: { slidesPerView: 2.7, spaceBetween: 12, slidesPerGroup: 2 },
              992: { slidesPerView: 3.7, spaceBetween: 24, slidesPerGroup: 3 },
              1200: {
                slidesPerView: 4.58,
                spaceBetween: 24,
                slidesPerGroup: 3,
              },
            },
          }}
        >
          {categoryItems.map((item, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div className="wg-cls style-abs type-2 hover-img">
                <Link to={`/shop-default`} className="image img-style d-block">
                  <img
                    src={item.imgSrc}
                    alt={item.alt}
                    className="lazyload"
                    width={513}
                    height={665}
                  />
                </Link>
                <div className="cls-btn text-center">
                  <Link
                    to={`/shop-default`}
                    className="tf-btn btn-cls btn-white hover-dark"
                  >
                    {item.buttonText}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex d-xl-none sw-dot-default sw-pagination-cls-2 justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
