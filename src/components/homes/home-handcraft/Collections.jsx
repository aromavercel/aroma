"use client";
import { handcraftBanners } from "@/data/collections";

import { Link } from "react-router-dom";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Collections() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          {...{
            slidesPerView: 1,
            spaceBetween: 12,
            speed: 800,
            observer: true,
            observeParents: true,
            slidesPerGroup: 1,
            navigation: {
              clickable: true,
              nextEl: ".nav-next-cls",
              prevEl: ".nav-prev-cls",
            },
            pagination: { el: ".sw-pagination-cls", clickable: true },
            breakpoints: {
              768: { slidesPerView: 1, spaceBetween: 12, slidesPerGroup: 2 },
              1024: { slidesPerView: 2, spaceBetween: 24, slidesPerGroup: 2 },
            },
          }}
          modules={[Pagination, Navigation]}
        >
          {handcraftBanners.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="banner-shop hover-img style-left-center">
                <a href="#" className="img-style d-block">
                  <img
                    src={item.image}
                    alt=""
                    className="lazyload"
                    width={1062}
                    height={602}
                  />
                </a>
                <div className="content">
                  <div className="box-title wow fadeInUp">
                    <a
                      href="#"
                      className="title link fw-normal font-9 text-md display-md-2"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <p
                      className="text-md font-9 text-grey-3"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                  <Link
                    to={`/shop-default`}
                    className="tf-btn animate-btn btn-red btn-lg fw-medium bg-brown-14 border-0"
                  >
                    {item.linkTitle}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex d-lg-none sw-dot-default sw-pagination-cls justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
