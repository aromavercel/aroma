"use client";
import { bannerItems } from "@/data/collections";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Collections() {
  return (
    <section>
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          {...{
            slidesPerView: 1,
            spaceBetween: 12,
            speed: 1000,
            observer: true,
            observeParents: true,
            navigation: {
              clickable: true,
              nextEl: ".nav-next-shop",
              prevEl: ".nav-prev-shop",
            },
            pagination: { el: ".sw-pagination-shop", clickable: true },
            breakpoints: {
              768: { slidesPerView: 2, spaceBetween: 12 },
              1200: { slidesPerView: 2, spaceBetween: 24 },
            },
          }}
          modules={[Pagination, Navigation]}
        >
          {bannerItems.map((item, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div className="banner-shop style-top hover-img radius-20">
                <div className="image img-style">
                  <img
                    src={item.imgSrc}
                    alt={item.alt}
                    className="lazyload"
                    width={744}
                    height={744}
                  />
                </div>
                <div className="content wow fadeInUp text-center justify-items-center">
                  <div className="box-title">
                    <h4 className="text-white">{item.title}</h4>
                    <p className="text-md text-white">{item.description}</p>
                  </div>
                  <Link
                    to={`/shop-default`}
                    className="tf-btn animate-btn btn-space1 btn-green-2"
                  >
                    Buy Now
                    <i className="icon icon-arr-right3" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex d-xl-none sw-dot-default sw-pagination-shop justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
