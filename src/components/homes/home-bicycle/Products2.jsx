"use client";
import ProductCard5 from "@/components/productCards/ProductCard5";
import { bicycleProducts2 } from "@/data/products";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
export default function Products2() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-title-v2 text-center justify-items-center wow fadeInUp">
          <Link
            to={`/shop-sub-collection`}
            className="tf-btn btn-out-line-green btn-small text-uppercase"
          >
            Gear Up
          </Link>
          <h4>
            Top-quality equipment <br className="d-none d-xl-block" />
            for all your cycling needs
          </h4>
        </div>
        <div className="fl-control-sw wow fadeInUp">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper"
            {...{
              slidesPerView: 2,
              spaceBetween: 12,
              speed: 1000,
              observer: true,
              observeParents: true,
              slidesPerGroup: 2,
              navigation: {
                clickable: true,
                nextEl: ".nav-next-gear-up",
                prevEl: ".nav-prev-gear-up",
              },
              pagination: { el: ".sw-pagination-gear-up", clickable: true },
              breakpoints: {
                768: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
                1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
              },
            }}
            modules={[Pagination, Navigation]}
          >
            {bicycleProducts2.map((product, i) => (
              <SwiperSlide className="swiper-slide" key={i}>
                <ProductCard5
                  product={product}
                  styleClass="style-border style-2"
                  tooltipDirection="top"
                />
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-gear-up justify-content-center" />
          </Swiper>
          <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-gear-up" />
          <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-gear-up" />
        </div>
      </div>
    </section>
  );
}
