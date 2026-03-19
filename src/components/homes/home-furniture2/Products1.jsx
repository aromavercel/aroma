"use client";

import ProductCard16 from "@/components/productCards/ProductCard16";
import { furnitureProducts2 } from "@/data/products";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products1() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-title style-between align-items-end wow fadeInUp">
          <div className="box-title">
            <h3 className="title fw-normal font-11">NEW IN</h3>
          </div>
          <div className="box-nav-swiper style-2 d-none d-xl-flex">
            <div className="swiper-button-prev nav-swiper nav-prev-hot relative" />
            <div className="swiper-button-next nav-swiper nav-next-hot relative" />
          </div>
        </div>
        <div>
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
                nextEl: ".nav-next-hot",
                prevEl: ".nav-prev-hot",
              },
              pagination: { el: ".sw-pagination-hot", clickable: true },
              breakpoints: {
                768: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
                1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
              },
            }}
            modules={[Pagination, Navigation]}
          >
            {furnitureProducts2.map((product, i) => (
              <SwiperSlide key={i} className="swiper-slide">
                <ProductCard16 product={product} />
              </SwiperSlide>
            ))}

            <div className="d-flex d-xl-none sw-dot-default sw-pagination-hot justify-content-center" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
