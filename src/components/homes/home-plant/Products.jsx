"use client";

import ProductCard14 from "@/components/productCards/ProductCard14";

import { products34 } from "@/data/products";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products() {
  return (
    <>
      <section className="flat-spacing-2 bg-gradient-2">
        <div className="container">
          <div
            className="flat-title wow fadeInUp"
            style={{ visibility: "visible", animationName: "fadeInUp" }}
          >
            <h3 className="title letter-0 text-start font-7">
              Featured Products
            </h3>
          </div>
          <div
            className="fl-control-sw2 wrap-pos-nav sw-over-product wow fadeInUp"
            style={{ visibility: "visible", animationName: "fadeInUp" }}
          >
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
                  nextEl: ".nav-next-product",
                  prevEl: ".nav-prev-product",
                },
                pagination: { el: ".sw-pagination-product", clickable: true },
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
              modules={[Pagination, Navigation]}
            >
              {products34.map((product, i) => (
                <SwiperSlide key={i} className="swiper-slide">
                  <ProductCard14 ratioClass="asp-ratio-0" product={product} />
                </SwiperSlide>
              ))}

              <div className="d-flex d-xl-none  sw-dot-default sw-pagination-product justify-content-center" />
            </Swiper>
            <div
              className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-product"
              style={{ top: "calc(50% - 72px)" }}
            />
            <div
              className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-product "
              style={{ top: "calc(50% - 72px)" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
