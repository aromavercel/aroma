"use client";
import ProductCard15 from "@/components/productCards/ProductCard15";
import { pickleballProducts } from "@/data/products";

import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products1() {
  return (
    <section>
      <div className="container-full">
        <div className="bg_grey-16 md-radius-80 overflow-hidden flat-spacing-30 relative">
          <div className="tf-overlay">
            <img
              src="/images/section/bg-pickleball.jpg"
              alt="slider"
              className="lazyload effect-paralax"
              width={1840}
              height={882}
            />
          </div>
          <div className="container">
            <div className="flat-title relative mb_5">
              <h3 className="title fw-normal letter-0 font-10 text-white">
                Top Picks
              </h3>
            </div>
            <div className="fl-control-sw2 wrap-pos-nav sw-over-product wow fadeInUp">
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
                  pagination: {
                    el: ".sw-pagination-top-pick",
                    clickable: true,
                  },
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
                {pickleballProducts.map((product) => (
                  <SwiperSlide className="swiper-slide" key={product.id}>
                    <ProductCard15 product={product} />
                  </SwiperSlide>
                ))}

                <div className="d-flex style-white mt_5 sw-dot-default sw-pagination-top-pick justify-content-center" />
              </Swiper>
              <div className="d-none d-xxl-flex swiper-button-next nav-swiper nav-next-top-pick" />
              <div className="d-none d-xxl-flex swiper-button-prev nav-swiper nav-prev-top-pick" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
