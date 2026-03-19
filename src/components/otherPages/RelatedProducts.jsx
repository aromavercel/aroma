"use client";
import { products36 } from "@/data/products";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard1 from "../productCards/ProductCard1";
import { Navigation, Pagination } from "swiper/modules";

export default function RelatedProducts() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h4 className="title">Você também pode gostar</h4>
        </div>
        <div className="fl-control-sw pos2">
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
                nextEl: ".nav-next-also",
                prevEl: ".nav-prev-also",
              },
              pagination: { el: ".sw-pagination-also", clickable: true },
              breakpoints: {
                768: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
                1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
              },
            }}
            modules={[Pagination, Navigation]}
          >
            {products36.map((elm, i) => (
              <SwiperSlide key={i}>
                <ProductCard1
                  product={elm}
                  styleClass="style-2"
                  tooltipDirection="top"
                />
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-also justify-content-center" />
          </Swiper>
          <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-also" />
          <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-also" />
        </div>
      </div>
    </section>
  );
}
