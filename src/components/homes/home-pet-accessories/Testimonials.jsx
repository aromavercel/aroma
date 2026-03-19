"use client";
import { testimonials8 } from "@/data/testimonials";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Testimonials() {
  return (
    <section className="flat-spacing-3 pt-0">
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h4 className="title font-5">Customer Favorites</h4>
          <p className="desc text-main text-md">
            Discover expert advice, style inspiration, and product updates on
            our blog.
          </p>
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
            slidesPerGroup: 1,
            pagination: { el: ".sw-pagination-tes", clickable: true },
            breakpoints: {
              768: { slidesPerView: 2, spaceBetween: 24, slidesPerGroup: 2 },
              1200: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 3 },
            },
          }}
          modules={[Pagination]}
        >
          {testimonials8.map((testimonial, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="wg-testimonial">
                <div className="content">
                  <div className="content-top">
                    <div className="box-author">
                      <p className="name-author text-sm fw-medium">
                        {testimonial.name}
                      </p>
                      <div className="box-verified text-main">
                        <i className="icon-verifi" />
                        <p className="text-xs fst-italic">
                          {testimonial.status}
                        </p>
                      </div>
                    </div>
                    <div className="list-star-default">
                      <i className="icon-star" />
                      <i className="icon-star" />
                      <i className="icon-star" />
                      <i className="icon-star" />
                      <i className="icon-star" />
                    </div>
                    <p className="text-review text-sm text-main">
                      {testimonial.review}
                    </p>
                  </div>
                  <span className="br-line d-block" />
                  <div className="box-avt">
                    <div className="avatar">
                      <img
                        alt="product"
                        src={testimonial.avatar}
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="box-price">
                      <p className="name-item text-xs">
                        Item purchased:
                        <a
                          href="#"
                          className="fw-medium text-sm link text-line-clamp-1"
                        >
                          {testimonial.itemName}
                        </a>
                      </p>
                      <p className="price text-md fw-medium">
                        {testimonial.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <span className="sw-dot-default sw-pagination-tes justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
