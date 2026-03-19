"use client";
import { categories2, categories22 } from "@/data/collections";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-animate-tab">
          <div className="flat-title-tab-categories wow fadeInUp text-center">
            <h4 className="title">Categories</h4>
            <ul className="menu-tab-line justify-content-center" role="tablist">
              <li className="nav-tab-item" role="presentation">
                <a
                  href="#womens"
                  className="tab-link active"
                  data-bs-toggle="tab"
                >
                  Womens
                </a>
              </li>
              <li className="nav-tab-item" role="presentation">
                <a href="#mens" className="tab-link" data-bs-toggle="tab">
                  Mens
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            <div className="tab-pane active show" id="womens" role="tabpanel">
              <Swiper
                dir="ltr"
                className="swiper tf-swiper"
                {...{
                  slidesPerView: 2,
                  spaceBetween: 12,
                  speed: 800,
                  observer: true,
                  observeParents: true,
                  slidesPerGroup: 2,
                  navigation: {
                    clickable: true,
                    nextEl: ".nav-next-women",
                    prevEl: ".nav-prev-women",
                  },
                  pagination: { el: ".sw-pagination-women", clickable: true },
                  breakpoints: {
                    575: {
                      slidesPerView: 3,
                      spaceBetween: 12,
                      slidesPerGroup: 2,
                    },
                    768: {
                      slidesPerView: 4,
                      spaceBetween: 24,
                      slidesPerGroup: 3,
                    },
                    1200: {
                      slidesPerView: 6,
                      spaceBetween: 64,
                      slidesPerGroup: 3,
                    },
                  },
                }}
                modules={[Pagination, Navigation]}
              >
                {categories2.map((item, index) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    <div className="wg-cls style-circle hover-img">
                      <Link
                        to={`/shop-sub-collection`}
                        className="image img-style d-block"
                      >
                        <img
                          src={item.imgSrc}
                          alt="categories"
                          className="lazyload"
                          width={300}
                          height={300}
                        />
                      </Link>
                      <div className="cls-content text-center">
                        <Link
                          to={`/shop-sub-collection`}
                          className="link text-md fw-medium"
                        >
                          {item.title}
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <span className="d-flex d-xl-none sw-dot-default sw-pagination-women justify-content-center" />
              </Swiper>
            </div>
            <div className="tab-pane" id="mens" role="tabpanel">
              <Swiper
                dir="ltr"
                className="swiper tf-swiper"
                {...{
                  slidesPerView: 2,
                  spaceBetween: 12,
                  speed: 800,
                  observer: true,
                  observeParents: true,
                  slidesPerGroup: 2,
                  navigation: {
                    clickable: true,
                    nextEl: ".nav-next-women",
                    prevEl: ".nav-prev-women",
                  },
                  pagination: { el: ".sw-pagination-women", clickable: true },
                  breakpoints: {
                    575: {
                      slidesPerView: 3,
                      spaceBetween: 12,
                      slidesPerGroup: 2,
                    },
                    768: {
                      slidesPerView: 4,
                      spaceBetween: 24,
                      slidesPerGroup: 3,
                    },
                    1200: {
                      slidesPerView: 6,
                      spaceBetween: 64,
                      slidesPerGroup: 3,
                    },
                  },
                }}
                modules={[Pagination, Navigation]}
              >
                {categories22.map((item, index) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    <div className="wg-cls style-circle hover-img">
                      <Link
                        to={`/shop-sub-collection`}
                        className="image img-style d-block"
                      >
                        <img
                          src={item.imgSrc}
                          alt="categories"
                          className="lazyload"
                          width={300}
                          height={300}
                        />
                      </Link>
                      <div className="cls-content text-center">
                        <Link
                          to={`/shop-sub-collection`}
                          className="link text-md fw-medium"
                        >
                          {item.title}
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <span className="d-flex d-xl-none sw-dot-default sw-pagination-women justify-content-center" />
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
