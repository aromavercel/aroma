"use client";
import { features } from "@/data/features";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features() {
  return (
    <div className="flat-spacing-3">
      <div className="container">
        <div className="flat-title">
          <h4 className="title">Why Shop With Us?</h4>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          {...{
            slidesPerView: 1,
            spaceBetween: 12,
            speed: 800,
            observer: true,
            observeParents: true,
            pagination: { el: ".sw-pagination-iconbox", clickable: true },
            breakpoints: {
              575: { slidesPerView: 2, spaceBetween: 12 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1200: { slidesPerView: 3, spaceBetween: 34 },
            },
          }}
          modules={[Pagination]}
        >
          {features.map((feature, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className={`tf-icon-box radius-16 ${feature.bgClass} style-4 fadeInLeft wow`}
                data-wow-delay={feature.wowDelay}
              >
                <img alt="" src={feature.imgSrc} width="64" height="64" />
                <div className="content">
                  <div className="text-xl fw-medium">{feature.title}</div>
                  <p className="text-main text-md">
                    {feature.description.split(" ").slice(0, -2).join(" ")}{" "}
                    <br className="d-none d-xl-block" />{" "}
                    {feature.description.split(" ").slice(-2).join(" ")}.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex d-xl-none sw-dot-default sw-pagination-iconbox justify-content-center"></div>
        </Swiper>
      </div>
    </div>
  );
}
