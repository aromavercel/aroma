"use client";
import { items } from "@/data/collections";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Collectiions() {
  return (
    <section>
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
          {items.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="banner-shop style-bottom style-lg-bottom hover-img">
                <Link to={`/shop-default`} className="img-style d-block">
                  <img
                    src={item.imgSrc}
                    alt=""
                    className="lazyload"
                    width={708}
                    height={467}
                  />
                </Link>
                <div className="content text-center wow fadeInUp">
                  <div className="box-title">
                    <h4>
                      <Link
                        to={`/shop-default`}
                        className="title link text-white"
                      >
                        {item.title}
                      </Link>
                    </h4>
                  </div>
                  <Link
                    to={`/shop-default`}
                    className="tf-btn btn-white hover-dark"
                  >
                    {item.btnText}
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
