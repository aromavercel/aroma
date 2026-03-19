"use client";
import { offerSections } from "@/data/collections";

import { Link } from "react-router-dom";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Categories() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-title style-between align-items-end wow fadeInUp">
          <div className="box-title">
            <h3 className="title fw-normal font-11">SHOP BY CATEGORY</h3>
          </div>
          <div className="box-nav-swiper style-2 d-none d-xl-flex">
            <div className="swiper-button-prev nav-swiper nav-prev-category relative" />
            <div className="swiper-button-next nav-swiper nav-next-category relative" />
          </div>
        </div>
        <Swiper
          dir="ltr"
          {...{
            slidesPerView: 1,
            spaceBetween: 15,
            speed: 800,
            observer: true,
            observeParents: true,
            slidesPerGroup: 1,
            navigation: {
              clickable: true,
              nextEl: ".nav-next-category",
              prevEl: ".nav-prev-category",
            },
            pagination: { el: ".sw-pagination-category", clickable: true },
            breakpoints: {
              768: { slidesPerView: 2, spaceBetween: 15, slidesPerGroup: 1 },
              1200: { slidesPerView: 3, spaceBetween: 30, slidesPerGroup: 1 },
            },
          }}
          modules={[Pagination, Navigation]}
        >
          {offerSections.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="wg-offer hover-img">
                <Link
                  to={`/shop-default`}
                  className="image d-block img-style rounded-0"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="lazyload"
                    width={item.width}
                    height={item.height}
                  />
                </Link>
                <div className="content text-center wow fadeInUp">
                  <div className="box-title gap-4">
                    <div className="display-xs fw-medium font-11 mb_20">
                      {item.label}
                    </div>
                    <Link
                      to={`/shop-default`}
                      className="tf-btn btn-line-dark body-text fw-medium font-11 gap-21 mx-auto"
                    >
                      <span>SHOP NOW</span>
                      <i className="icon-arrow-top-left" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex d-xl-none sw-dot-default sw-pagination-category justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
