"use client";

import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const testimonials = [
  {
    title: "Beautiful, Healthy Plants!",
    desc: "I ordered a few indoor plants, and they arrived in perfect condition. They’ve added so much life to my living room! I’ll definitely be back for more.",
    author: "Vineta",
    item: "Olive Tree",
  },
  {
    title: "Gorgeous, Thriving Plants!",
    desc: "I ordered a few indoor plants, and they arrived in perfect condition. They’ve added so much life to my living room.",
    author: "Lisa",
    item: "Olive Tree",
  },
  {
    title: "Vibrant, Lush Greenery!",
    desc: "I recently got a few indoor plants, and they arrived in flawless condition. They’ve brought so much freshness to my home.",
    author: "Emily",
    item: "Ficus Audrey Tree",
  },
];
export default function Testimonials() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-wrapper-testimonial bg-dark-green-4">
          <img
            className="img-item-1 absolute"
            alt=""
            src="/images/cls-categories/plant/leaf.png"
            width={220}
            height={234}
          />
          <img
            className="img-item-2 absolute"
            alt=""
            src="/images/cls-categories/plant/leaf-2.png"
            width={192}
            height={200}
          />
          <Swiper
            dir="ltr"
            className="swiper tf-swiper"
            {...{
              slidesPerView: 1,
              speed: 800,
              spaceBetween: 24,
              pagination: { el: ".sw-pagination-tes", clickable: true },
            }}
            modules={[Pagination]}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div className="wg-testimonial-3 text-center wow fadeInUp">
                  <div className="box-top">
                    <i className="icon icon-leaf text-white fs-42" />
                    <p className="text-md text-white">HAPPY CUSTOMERS</p>
                  </div>
                  <div className="box-title-desc">
                    <h3 className="title-review text-white font-7 fw-semibold">
                      “{testimonial.title}”
                    </h3>
                    <p className="text-white desc display-xs">
                      {testimonial.desc}
                    </p>
                  </div>
                  <div className="box-author">
                    <p className="text-md fw-medium text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-white">
                      Item purchased:{" "}
                      <span className="text-sm">{testimonial.item}</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="sw-dot-default style-white sw-pagination-tes justify-content-center" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
