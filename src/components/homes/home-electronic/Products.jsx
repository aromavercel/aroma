"use client";
import ProductCard2 from "@/components/productCards/ProductCard2";
import { products6 } from "@/data/products";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
export default function Products() {
  return (
    <section className="flat-spacing-8 bg-surface">
      <div className="container">
        <div className="flat-title style-between align-items-end wow fadeInUp">
          <div className="box-title">
            <h4 className="title">Top Picks You’ll Love</h4>
            <p className="desc text-main text-md">
              Explore our most popular pieces that customers can't get enough of
            </p>
          </div>
          <Link to={`/shop-default`} className="btn-underline">
            View all
          </Link>
        </div>
        <div className="fl-control-sw">
          <Swiper
            dir="ltr"
            className="sw-height swiper tf-swiper"
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
            {products6.map((product) => (
              <SwiperSlide className="swiper-slide" key={product.id}>
                <ProductCard2 product={product} />
              </SwiperSlide>
            ))}

            <div className="d-flex d-xl-none sw-dot-default sw-pagination-top-pick justify-content-center" />
          </Swiper>
          <div className="swiper-button-next d-none d-xl-flex nav-swiper nav-next-top-pick" />
          <div className="swiper-button-prev d-none d-xl-flex nav-swiper nav-prev-top-pick" />
        </div>
      </div>
    </section>
  );
}
