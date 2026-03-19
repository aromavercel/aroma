"use client";
import { testimonials4, thumbSlides } from "@/data/testimonials";
import React, { useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Testimonials() {
  const [thumbSwiper, setThumbSwiper] = useState(null);
  return (
    <div className="flat-spacing-9 pt-0">
      <div className="container">
        <div className="wrapper-thumbs-tes flat-thumbs-tes" data-effect="fade">
          <div className="box-left">
            <Swiper
              dir="ltr"
              className="swiper tf-thumb-tes"
              data-space-lg={0}
              data-space={0}
              onSwiper={setThumbSwiper}
              modules={[Thumbs]}
            >
              {thumbSlides.map((elm, i) => (
                <SwiperSlide key={i} className="swiper-slide">
                  <div className="img-sw-thumb">
                    <img
                      className="lazyload"
                      alt="img"
                      src={elm.imgSrc}
                      width={elm.width}
                      height={elm.height}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="box-right wow fadeInUp">
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
              {testimonials4.map((item, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="box-testimonial-main">
                    <span className="quote text-white icon-quote" />
                    <div className="content">
                      <div className="list-star-default">
                        {Array.from({ length: item.stars }).map((_, i) => (
                          <i className="icon-star" key={i} />
                        ))}
                      </div>
                      <div className="title-review text-white">
                        {item.title}
                      </div>
                      <p className="text-review display-xs text-white">
                        {item.review}
                      </p>
                      <div className="box-author">
                        <div className="img d-md-none">
                          <img
                            alt={item.imgAlt}
                            src={item.imgSrc}
                            width={item.imgWidth}
                            height={item.imgHeight}
                          />
                        </div>
                        <div className="info">
                          <div className="name text-white text-md fw-medium">
                            {item.author}
                          </div>
                          <a href={"#"} className="meta text-white link">
                            Purchase item:{" "}
                            <span className="fw-medium">{item.product}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="box-nav-swiper">
                <div className="swiper-button-prev nav-swiper size-30 line-white nav-prev-tes snbpt1" />
                <div className="swiper-button-next nav-swiper size-30 line-white nav-next-tes snbnt1" />
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
