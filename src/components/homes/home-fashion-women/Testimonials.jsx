"use client";
import { testimonials5 } from "@/data/testimonials";
import React, { useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Testimonials() {
  const [thumbSwiper, setThumbSwiper] = useState(null);
  return (
    <div className="flat-spacing-3">
      <div className="container">
        <div className="wrapper-thumbs-tes-2 flat-thumbs-tes">
          <div className="box-left">
            <Swiper
              dir="ltr"
              className="swiper tf-tes-main"
              navigation={{
                prevEl: ".snbpt1",
                nextEl: ".snbnt1",
              }}
              modules={[Thumbs, Navigation]}
              thumbs={{ swiper: thumbSwiper }}
            >
              {testimonials5.map((testimonial, index) => (
                <SwiperSlide key={index} className="swiper-slide">
                  <div className="box-testimonial-main wow fadeInLeft">
                    <span className="quote icon-quote2" />
                    <div className="content">
                      <div className="list-star-default">
                        <i className="icon-star" />
                        <i className="icon-star" />
                        <i className="icon-star" />
                        <i className="icon-star" />
                        <i className="icon-star" />
                      </div>
                      <div className="title-review">{testimonial.quote}</div>
                      <p className="text-review display-xs">
                        {testimonial.reviewText}
                      </p>
                      <div className="box-author">
                        <div className="img d-md-none">
                          <img
                            alt="author"
                            src={testimonial.imgSrc}
                            width={755}
                            height={897}
                          />
                        </div>
                        <div className="info">
                          <div className="name text-md fw-medium">
                            {testimonial.author}
                          </div>
                          <a href="#" className="meta link">
                            Purchase item:{" "}
                            <span className="fw-medium">
                              {testimonial.purchaseItem}
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="box-nav-swiper">
                <div className="swiper-button-prev nav-swiper size-30 style-line nav-prev-tes snbpt1" />
                <div className="swiper-button-next nav-swiper size-30 style-line nav-next-tes snbnt1" />
              </div>
            </Swiper>
          </div>
          <div className="box-right">
            <Swiper
              dir="ltr"
              className="swiper tf-thumb-tes"
              onSwiper={setThumbSwiper}
              modules={[Thumbs]}
            >
              {testimonials5.map((elm, i) => (
                <SwiperSlide key={i} className="swiper-slide hover-img">
                  <div className="img-sw-thumb img-style">
                    <img
                      className="lazyload"
                      alt="img"
                      src={elm.imgSrc}
                      width={755}
                      height={897}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
