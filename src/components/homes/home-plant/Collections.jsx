"use client";
import { categoryItems4 } from "@/data/collections";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Collections() {
  return (
    <>
      <section>
        <div className="container">
          <div className="flat-title wow fadeInUp">
            <h3 className="title font-7">Shop By Collections</h3>
          </div>
        </div>
        <div className="slider-layout-right wow fadeInUp">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper tf-sw-right wrap-sw-over"
            {...{
              slidesPerView: 2,
              spaceBetween: 12,
              speed: 800,
              observer: true,
              observeParents: true,
              slidesPerGroup: 2,
              pagination: { el: ".sw-pagination-cls", clickable: true },
              breakpoints: {
                768: {
                  slidesPerView: 2.7,
                  spaceBetween: 12,
                  slidesPerGroup: 2,
                },
                992: {
                  slidesPerView: 3.7,
                  spaceBetween: 24,
                  slidesPerGroup: 3,
                },
                1200: {
                  slidesPerView: 4.7,
                  spaceBetween: 24,
                  slidesPerGroup: 3,
                },
              },
            }}
            modules={[Pagination]}
          >
            {categoryItems4.map((item) => (
              <SwiperSlide key={item.id} className="swiper-slide">
                <div className="wg-cls hover-img">
                  <Link
                    to={`/shop-default`}
                    className="d-block radius-16 image img-style"
                  >
                    <img
                      src={item.imgSrc}
                      alt={item.title}
                      className="ls-is-cached lazyloaded"
                      width={513}
                      height={513}
                    />
                  </Link>
                  <div className="cls-content gap-6">
                    <Link
                      to={`/shop-default`}
                      className="text-xl fw-medium link"
                    >
                      {item.title}
                    </Link>
                    <Link
                      to={`/shop-default`}
                      className=" tf-btn btn-line-dark"
                    >
                      <span className="text-xs">Shop Now</span>
                      <i className="icon icon-arrow-top-left fs-7" />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-cls justify-content-center" />
          </Swiper>
        </div>
      </section>
    </>
  );
}
