"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { products4 } from "@/data/products";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h4 className="title">Top Picks You’ll Love</h4>
          <p className="desc text-main text-md">
            Explore our most popular pieces that customers can't get enough of
          </p>
        </div>
        <div className="hover-sw-nav hover-sw-2">
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
            {products4.map((product, i) => (
              <SwiperSlide key={i}>
                <ProductCard1
                  product={product}
                  tooltipDirection="top"
                  key={i}
                  styleClass={product.style}
                />
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none mt_5 sw-dot-default sw-pagination-top-pick justify-content-center" />
          </Swiper>
          <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-top-pick" />
          <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-top-pick" />
        </div>
      </div>
    </section>
  );
}
