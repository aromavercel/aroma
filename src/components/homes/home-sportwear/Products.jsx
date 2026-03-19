"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { sportProducts, sportProducts2 } from "@/data/products";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products() {
  return (
    <section>
      <div className="container-2">
        <div className="flat-animate-tab overflow-visible">
          <div className="flat-title-tab-categories text-center wow fadeInUp">
            <h4 className="title">Trending Now</h4>
            <div className="tab-slide">
              <ul
                className="menu-tab-fill style-primary justify-content-center"
                role="tablist"
              >
                <li className="item-slide-effect" />
                <li className="nav-tab-item active" role="presentation">
                  <a
                    href="#womens"
                    className="display-xs tab-link active"
                    data-bs-toggle="tab"
                  >
                    Women
                  </a>
                </li>
                <li className="nav-tab-item" role="presentation">
                  <a
                    href="#mens"
                    className="display-xs tab-link"
                    data-bs-toggle="tab"
                  >
                    Men
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="tab-content">
            <div className="tab-pane active show" id="womens" role="tabpanel">
              <div className="fl-control-sw pos2">
                <Swiper
                  dir="ltr"
                  className="swiper tf-swiper wrap-sw-over"
                  {...{
                    slidesPerView: 2,
                    spaceBetween: 12,
                    speed: 1000,
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
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 12,
                        slidesPerGroup: 3,
                      },
                      1200: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                        slidesPerGroup: 4,
                      },
                    },
                  }}
                  modules={[Pagination, Navigation]}
                >
                  {sportProducts.map((product, i) => (
                    <SwiperSlide key={i} className="swiper-slide">
                      <ProductCard1 product={product} />
                    </SwiperSlide>
                  ))}
                  <div className="d-flex d-xl-none sw-dot-default sw-pagination-women justify-content-center" />
                </Swiper>
                <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-women" />
                <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-women" />
              </div>
            </div>
            <div className="tab-pane" id="mens" role="tabpanel">
              <div className="fl-control-sw pos2">
                <Swiper
                  dir="ltr"
                  className="swiper tf-swiper wrap-sw-over"
                  {...{
                    slidesPerView: 2,
                    spaceBetween: 12,
                    speed: 1000,
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
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 12,
                        slidesPerGroup: 3,
                      },
                      1200: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                        slidesPerGroup: 4,
                      },
                    },
                  }}
                  modules={[Pagination, Navigation]}
                >
                  {sportProducts2.map((product, i) => (
                    <SwiperSlide key={i} className="swiper-slide">
                      <ProductCard1 product={product} />
                    </SwiperSlide>
                  ))}
                  <div className="d-flex d-xl-none sw-dot-default sw-pagination-women justify-content-center" />
                </Swiper>
                <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-women" />
                <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-women" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
