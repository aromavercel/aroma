"use client";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const features = [
  {
    bgClass: "bg-light-pink-11",
    imgSrc: "/images/section/icon-ship.svg",
    title: "Free Shipping",
    description: "Enjoy free shipping on all orders",
  },
  {
    bgClass: "bg-light-purple-9",
    imgSrc: "/images/section/icon-gift.svg",
    title: "Gift Package",
    description: "Perfectly packaged for gifting",
  },
  {
    bgClass: "bg-light-green-11",
    imgSrc: "/images/section/icon-return.svg",
    title: "Easy Return",
    description: "Within 14 days for a return",
  },
  {
    bgClass: "bg-light-pink-12",
    imgSrc: "/images/section/icon-sp.svg",
    title: "24/7 Support",
    description: "Outstanding premium support",
  },
];

export default function Features2() {
  return (
    <div className="flat-spacing pt-0">
      <div className="container">
        <Swiper
          dir="ltr"
          className="fadeInUp wow swiper tf-swiper sw-height"
          {...{
            slidesPerView: 1,
            spaceBetween: 12,
            speed: 800,
            observer: true,
            observeParents: true,
            pagination: { el: ".sw-pagination-iconbox", clickable: true },
            breakpoints: {
              575: { slidesPerView: 2, spaceBetween: 12 },
              768: { slidesPerView: 3, spaceBetween: 24 },
              1200: { slidesPerView: 4, spaceBetween: 42 },
            },
          }}
          modules={[Pagination]}
        >
          {features.map((feature, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className={`tf-icon-box radius-16 ${feature.bgClass} style-4`}
              >
                <img alt="" src={feature.imgSrc} width={64} height={64} />
                <div className="content">
                  <div className="title text-dark-purple fw-bold font-8">
                    {feature.title}
                  </div>
                  <p className="desc text-dark">{feature.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex d-xl-none sw-dot-default sw-pagination-iconbox justify-content-center" />
        </Swiper>
      </div>
    </div>
  );
}
