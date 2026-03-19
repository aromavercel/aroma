"use client";
import { products1 } from "@/data/products";
import { Link } from "react-router-dom";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard1 from "../productCards/ProductCard1";

export default function NavProducts() {
  return (
    <Swiper
      dir="ltr"
      className="swiper tf-swiper wrap-sw-over"
      {...{
        slidesPerView: 2,
        spaceBetween: 24,
        speed: 800,
        observer: true,
        observeParents: true,
        slidesPerGroup: 2,
        navigation: {
          clickable: true,
          nextEl: ".nav-next-product-header",
          prevEl: ".nav-prev-product-header",
        },
        pagination: { el: ".sw-pagination-product-header", clickable: true },
      }}
      modules={[Pagination, Navigation]}
    >
      {products1.slice(0, 4).map((product, i) => (
        <SwiperSlide key={i} className="swiper-slide">
          <ProductCard1 textCenter product={product} />
        </SwiperSlide>
      ))}

      <div className="sw-dot-default sw-pagination-product-header justify-content-center" />
    </Swiper>
  );
}
