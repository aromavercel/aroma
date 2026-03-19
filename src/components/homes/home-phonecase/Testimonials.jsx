"use client";
import { testimonials7 } from "@/data/testimonials";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Testimonials() {
  return (
    <section className="bg-white mx_40 radius-16 flat-spacing-2">
      <div className="container">
        <div className="flat-title gap-10 wow fadeInUp">
          <p className="desc text-md">Experience with our products</p>
          <h4 className="title">Testimonials</h4>
        </div>
        <Swiper
          dir="ltr"
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
          {testimonials7.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="wg-testimonial">
                <div className="content">
                  <div className="content-top">
                    <div className="box-author">
                      <p className="name-author text-sm fw-medium">
                        {item.author}
                      </p>
                      <div className="box-verified text-main">
                        <i className="icon-verifi" />
                        <p className="text-xs fst-italic">Verified Buyer</p>
                      </div>
                    </div>
                    <div className="list-star-default">
                      {[...Array(5)].map((_, starIndex) => (
                        <i key={starIndex} className="icon-star" />
                      ))}
                    </div>
                    <p className="text-review text-sm text-main">
                      {item.review}
                    </p>
                  </div>
                  <span className="br-line d-block" />
                  <div className="box-avt">
                    <div className="avatar">
                      <img
                        alt="author"
                        src={item.image}
                        width={540}
                        height={576}
                      />
                    </div>
                    <div className="box-price">
                      <p className="name-item text-xs">
                        <a href={"#"} className="text-line-clamp-2">
                          Item purchased:{" "}
                          <span className="fw-medium text-sm link">
                            {item.product}
                          </span>
                        </a>
                      </p>
                      <p className="price text-md fw-medium">
                        ${item.price}.00
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
