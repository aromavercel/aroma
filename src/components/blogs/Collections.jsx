"use client";
import { blogCategories } from "@/data/blogs";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Collections() {
  return (
    <div className="flat-spacing-24 pb-0">
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper hover-sw-nav wow fadeInUp"
          {...{
            slidesPerView: 2,
            spaceBetween: 12,
            speed: 800,
            observer: true,
            observeParents: true,
            slidesPerGroup: 2,
            navigation: {
              clickable: true,
              nextEl: ".nav-next-cls",
              prevEl: ".nav-prev-cls",
            },
            pagination: { el: ".sw-pagination-cls", clickable: true },
            breakpoints: {
              768: { slidesPerView: 3, spaceBetween: 20, slidesPerGroup: 3 },
              1200: { slidesPerView: 5, spaceBetween: 20, slidesPerGroup: 3 },
            },
          }}
          modules={[Pagination, Navigation]}
        >
          {blogCategories.map((category, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="wg-cls style-abs2 hover-img">
                <Link
                  to={`/blog-single/${category.id}`}
                  className="image-wrap relative"
                >
                  <div className="image img-style">
                    <img
                      src={category.imgSrc}
                      alt=""
                      className="lazyload"
                      width={408}
                      height={408}
                    />
                  </div>
                  <div className="cls-btn text-center">
                    <button className="tf-btn btn-white hover-dark">
                      View all
                    </button>
                  </div>
                  <span className="tf-overlay" />
                </Link>
                <div className="cls-content text-center">
                  <Link
                    to={`/blog-single/${category.id}`}
                    className="text-type text-xl-2 fw-medium link"
                  >
                    {category.title}
                  </Link>
                  <span className="count-item body-text-2 text-main">
                    10 posts
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex d-xl-none sw-dot-default sw-pagination-category justify-content-center" />
        </Swiper>
      </div>
    </div>
  );
}
