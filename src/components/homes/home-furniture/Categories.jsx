"use client";
import { categories4 } from "@/data/collections";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <section className="flat-spacing-3">
      <div className="container-2">
        <div className="flat-title wow fadeInUp">
          <h4 className="title">Curated Just for You</h4>
          <p className="desc text-main text-md">
            Discover a selection of timeless designs and trends that match your
            style, all in one place.
          </p>
        </div>
        <div className="fl-control-sw2 pos1 wow fadeInUp">
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
              pagination: { el: ".sw-pagination-categories", clickable: true },
              breakpoints: {
                575: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 2 },
                768: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 3 },
                1200: { slidesPerView: 6, spaceBetween: 64, slidesPerGroup: 3 },
              },
            }}
            modules={[Pagination, Navigation]}
          >
            {categories4.map((category, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div className="wg-cls style-circle hover-img">
                  <Link
                    to={`/shop-default`}
                    className="image img-style d-block"
                  >
                    <img
                      src={category.imgSrc}
                      alt={category.imgAlt}
                      className="lazyload"
                      width={356}
                      height={356}
                    />
                  </Link>
                  <div className="cls-content text-center">
                    <Link
                      to={`/shop-default`}
                      className="link text-xl-2 fw-medium"
                    >
                      {category.title}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <span className="d-flex d-xl-none sw-dot-default sw-pagination-categories justify-content-center" />
          </Swiper>
          <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-categories" />
          <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-categories" />
        </div>
      </div>
    </section>
  );
}
