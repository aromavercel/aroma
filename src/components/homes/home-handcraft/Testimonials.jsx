"use client";

import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const testimonialData = [
  {
    image: "/images/testimonial/tes-handcraft-1.jpg",
    name: "Vineta P",
    product: "Woven Shoulder Bag",
    review:
      '"Beautifully made and even more stunning in person. The handmade quality adds such a special touch — you can tell it was made with love."',
  },
  {
    image: "/images/testimonial/tes-handcraft-1.jpg",
    name: "Themesflat",
    product: "Loose Fit Bag",
    review:
      "I was pleasantly surprised by how fast my order arrived. The customer service team was helpful and responsive. Great shopping experience!",
  },
];

export default function Testimonials() {
  const [swiperThumb, setSwiperThumb] = useState(null);
  return (
    <div className="flat-spacing-2 bg-yellow-6">
      <div className="container position-relative">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="wrapper-thumbs-tes-3 flat-thumbs-tes tes-nav-style-1">
              <div className="swiper-button-prev d-none d-xl-flex nav-swiper nav-prev-tes" />
              <div className="box-right">
                <Swiper
                  dir="ltr"
                  className="swiper tf-thumb-tes"
                  style={{
                    maxWidth: "100%",
                    overflow: "hidden",
                    position: "relative",
                  }}
                  slidesPerView={1}
                  breakpoints={{
                    0: { spaceBetween: 12 },
                    575: {
                      spaceBetween: 12,
                    },
                    768: {
                      spaceBetween: 12,
                    },
                    992: {
                      spaceBetween: 24,
                    },
                  }}
                  onSwiper={setSwiperThumb}
                  modules={[Thumbs]}
                >
                  {testimonialData.map((item, index) => (
                    <SwiperSlide
                      className="swiper-slide hover-shine hover-img"
                      key={index}
                    >
                      <div className="shine-item img-sw-thumb img-style">
                        <img
                          className="lazyload"
                          data-src={item.image}
                          src={item.image}
                          alt="img"
                          width={650}
                          height={639}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="box-left wow fadeInUp">
                <Swiper
                  dir="ltr"
                  className="swiper tf-tes-main"
                  style={{
                    maxWidth: "100%",
                    overflow: "hidden",
                    position: "relative",
                  }}
                  breakpoints={{
                    0: { spaceBetween: 12 },
                    575: {
                      spaceBetween: 12,
                    },
                    768: {
                      spaceBetween: 12,
                    },
                    992: {
                      spaceBetween: 24,
                    },
                  }}
                  slidesPerView={1}
                  modules={[Thumbs, Navigation, Pagination]}
                  thumbs={{ swiper: swiperThumb }}
                  pagination={{
                    el: ".sw-pagination-tes",
                    clickable: true,
                  }}
                  navigation={{
                    nextEl: ".nav-next-tes",
                    prevEl: ".nav-prev-tes",
                  }}
                >
                  {testimonialData.map((item, index) => (
                    <SwiperSlide className="swiper-slide" key={index}>
                      <div className="box-testimonial-main text-center">
                        <span className="quote">
                          <svg
                            width={100}
                            height={100}
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_7300_4125)">
                              <path
                                d="M21.4285 56.6429H0.5V14.7858H42.3571V57.0248L28.2623 85.2141H7.95176L21.8758 57.3665L22.2376 56.6429H21.4285Z"
                                stroke="#252525"
                              />
                              <path
                                d="M78.5731 56.6429H57.6445V14.7858H99.5016V57.0248L85.4068 85.2141H65.0963L79.0203 57.3665L79.3821 56.6429H78.5731Z"
                                stroke="#252525"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_7300_4125">
                                <rect width={100} height={100} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        <div className="content">
                          <div className="list-star-default justify-content-center">
                            <i className="icon-star" />
                            <i className="icon-star" />
                            <i className="icon-star" />
                            <i className="icon-star" />
                            <i className="icon-star" />
                          </div>
                          <p className="text-review">{item.review}</p>
                          <div>
                            <div className="name text-md fw-semibold mb_8">
                              {item.name}
                            </div>
                            <p className="name-item text-md fs-14 d-flex align-items-center justify-content-center">
                              <span className="text-main">
                                Product purchased:&nbsp;
                              </span>
                              <a
                                href="#"
                                className="fw-medium text-sm link text-line-clamp-1"
                              >
                                {item.product}
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}

                  <span className="sw-dot-default sw-pagination-tes justify-content-center" />
                </Swiper>
              </div>
              <div className="swiper-button-next d-none d-xl-flex nav-swiper nav-next-tes" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
