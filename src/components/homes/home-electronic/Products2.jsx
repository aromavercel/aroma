"use client";
import CountdownTimer from "@/components/common/Countdown";
import ProductCard3 from "@/components/productCards/ProductCard3";
import { products7 } from "@/data/products";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products2() {
  return (
    <section className="bg-surface flat-spacing-8">
      <div className="container">
        <div className="flat-title mb_1 style-between wow fadeInUp">
          <div className="box-title">
            <h4 className="title">Hot Deals</h4>
            <p className="desc text-main text-md">
              Explore our most popular pieces that customers can't get enough of
            </p>
          </div>
          <div className="wg-countdown-2">
            <span className="js-countdown">
              <CountdownTimer style={2} />
            </span>
          </div>
        </div>
        <div className="fl-control-sw wow fadeInUp">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper sw-height"
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
            {products7.map((product, i) => (
              <SwiperSlide className="swiper-slide" key={i}>
                <ProductCard3 countdownStyle="style-2" product={product} />
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-deal justify-content-center" />
          </Swiper>
          <div className="swiper-button-next d-none d-xl-flex nav-swiper nav-next-deal" />
          <div className="swiper-button-prev d-none d-xl-flex nav-swiper nav-prev-deal" />
        </div>
      </div>
    </section>
  );
}
