"use client";

import ProductCard5 from "@/components/productCards/ProductCard5";
import { bicycleProducts } from "@/data/products";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
export default function Products() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-title-v2 justify-items-center text-center wow fadeInUp">
          <Link
            to={`/shop-sub-collection`}
            className="tf-btn btn-out-line-green btn-small text-uppercase"
          >
            Featured Products
          </Link>
          <h4 className="text-capitalize">
            Discover our top picks for <br className="d-none d-xl-block" />
            every ride
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
                nextEl: ".nav-next-feature",
                prevEl: ".nav-prev-feature",
              },
              pagination: { el: ".sw-pagination-feature", clickable: true },
              breakpoints: {
                768: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
                1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
              },
            }}
            modules={[Pagination, Navigation]}
          >
            {bicycleProducts.map((product, i) => (
              <SwiperSlide key={i} className="swiper-slide">
                <ProductCard5
                  product={product}
                  countdownStyleclass="style-3 bg-white text-primary line-primary"
                  styleClass="style-border style-2"
                  tooltipDirection="top"
                />
              </SwiperSlide>
            ))}

            <div className="d-flex d-xl-none sw-dot-default sw-pagination-feature justify-content-center" />
          </Swiper>
          <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-feature" />
          <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-feature" />
        </div>
      </div>
    </section>
  );
}
