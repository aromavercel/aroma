"use client";
import { categories3 } from "@/data/collections";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-title text-start wow fadeInUp">
          <h4 className="title">Categories</h4>
        </div>
        <div className="wow fadeInUp">
          <div className="fl-control-sw pos1">
            <Swiper
              dir="ltr"
              className="swiper tf-swiper"
              {...{
                slidesPerView: 2,
                spaceBetween: 12,
                speed: 800,
                observer: true,
                observeParents: true,
                slidesPerGroup: 2,
                navigation: {
                  clickable: true,
                  nextEl: ".nav-next-categories",
                  prevEl: ".nav-prev-categories",
                },
                pagination: {
                  el: ".sw-pagination-categories",
                  clickable: true,
                },
                breakpoints: {
                  575: {
                    slidesPerView: 3,
                    spaceBetween: 12,
                    slidesPerGroup: 3,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 12,
                    slidesPerGroup: 4,
                  },
                  992: {
                    slidesPerView: 5,
                    spaceBetween: 24,
                    slidesPerGroup: 4,
                  },
                  1200: {
                    slidesPerView: 6,
                    spaceBetween: 24,
                    slidesPerGroup: 4,
                  },
                },
              }}
              modules={[Pagination, Navigation]}
            >
              {categories3.map((category, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="wg-cls style-square hover-img">
                    <Link
                      to={`/shop-sub-collection`}
                      className="image img-style d-block"
                    >
                      <img
                        src={category.imgSrc}
                        alt={category.alt}
                        className="lazyload"
                        width={440}
                        height={440}
                      />
                    </Link>
                    <div className="cls-content text-center">
                      <Link
                        to={`/shop-sub-collection`}
                        className="link text-md fw-medium"
                      >
                        {category.title}
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              <div className="d-flex d-xl-none sw-dot-default sw-pagination-categories justify-content-center" />
            </Swiper>
            <div className="swiper-button-next d-none d-xl-flex nav-swiper nav-next-categories" />
            <div className="swiper-button-prev d-none d-xl-flex nav-swiper nav-prev-categories" />
          </div>
        </div>
      </div>
    </section>
  );
}
