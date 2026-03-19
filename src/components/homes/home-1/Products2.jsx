"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { products2 } from "@/data/products";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products2() {
  return (
    <section className="flat-spacing-3 pt-0 overflow-hidden">
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h4 className="title">Today’s Picks</h4>
        </div>
        <div className="fl-control-sw2 pos2 wow fadeInUp">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper wrap-sw-over"
            {...{
              slidesPerView: 2,
              spaceBetween: 12,
              speed: 800,
              observer: true,
              observeParents: true,
              slidesPerGroup: 2,
              navigation: {
                clickable: true,
                nextEl: ".nav-next-top-pick",
                prevEl: ".nav-prev-top-pick",
              },
              pagination: { el: ".sw-pagination-top-pick", clickable: true },
              breakpoints: {
                768: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
                1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
              },
            }}
            modules={[Pagination, Navigation]}
          >
            {products2.map((product, i) => (
              <SwiperSlide key={i}>
                <ProductCard1 product={product} />
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none  sw-dot-default sw-pagination-top-pick justify-content-center" />
          </Swiper>
          <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-top-pick" />
          <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-top-pick" />
        </div>
      </div>
    </section>
  );
}
