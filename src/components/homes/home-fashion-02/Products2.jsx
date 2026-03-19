"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { products5 } from "@/data/products";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products2() {
  return (
    <section>
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h4 className="title">Limited Time Deals</h4>
          <p className="desc text-main text-md">
            Explore our most popular pieces that customers can't get enough of
          </p>
        </div>
        <div className="hover-sw-nav hover-sw-2 wow fadeInUp">
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
                nextEl: ".nav-next-deal",
                prevEl: ".nav-prev-deal",
              },
              pagination: { el: ".sw-pagination-deal", clickable: true },
              breakpoints: {
                768: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
                1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
              },
            }}
            modules={[Pagination, Navigation]}
          >
            {products5.map((product, i) => (
              <SwiperSlide key={i}>
                <ProductCard1
                  product={product}
                  styleClass={product.style}
                  tooltipDirection="top"
                />
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none mt_5 sw-dot-default sw-pagination-deal justify-content-center" />
          </Swiper>
          <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-deal" />
          <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-deal" />
        </div>
      </div>
    </section>
  );
}
