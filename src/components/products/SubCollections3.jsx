"use client";
import { slidesData } from "@/data/collections";

import { Link } from "react-router-dom";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SubCollections3({ parentClass = "flat-spacing-24" }) {
  return (
    <div className={parentClass}>
      <div className="container-6">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          {...{
            slidesPerView: 3,
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
              575: { slidesPerView: 5, spaceBetween: 12, slidesPerGroup: 2 },
              768: { slidesPerView: 6, spaceBetween: 24, slidesPerGroup: 3 },
              1200: { slidesPerView: 8, spaceBetween: 64, slidesPerGroup: 3 },
            },
          }}
          modules={[Pagination, Navigation]}
        >
          {slidesData.map((slide) => (
            <SwiperSlide className="swiper-slide" key={slide.id}>
              <div className="wg-cls style-circle-md hover-img">
                <Link to={`/shop-default`} className="image img-style d-block">
                  <img
                    src={slide.imageSrc}
                    alt={slide.alt}
                    className="lazyload"
                    width={198}
                    height={198}
                  />
                </Link>
                <div className="cls-content text-center">
                  <Link to={`/shop-default`} className="link text-sm fw-medium">
                    {slide.title}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          {/* item 8 */}
          <SwiperSlide className="swiper-slide">
            <div className="wg-cls style-circle-md">
              <Link to={`/shop-default`} className="image shop-all">
                <svg
                  width={65}
                  height={19}
                  viewBox="0 0 65 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5458 19C6.82728 19 5.6816 18.0383 5.08272 16.1409L0.5 1.24761H3.20797L7.53031 15.4651C7.71258 16.0889 8.02504 16.4008 8.5458 16.4008C9.06657 16.4008 9.37903 16.0889 9.56129 15.4651L13.8316 1.24761H16.5656L11.9828 16.1409C11.384 18.0383 10.2122 19 8.5458 19Z"
                    fill="black"
                  />
                  <path
                    d="M20.2853 3.40493C19.3479 3.40493 18.5928 2.65116 18.5928 1.71546C18.5928 0.779754 19.3479 0 20.2853 0C21.2227 0 21.9518 0.779754 21.9518 1.71546C21.9518 2.65116 21.2227 3.40493 20.2853 3.40493ZM19.0094 5.92613H21.5872V18.6621H19.0094V5.92613Z"
                    fill="black"
                  />
                  <path
                    d="M30.3956 8.08345C27.8959 8.08345 26.6461 10.1368 26.6461 12.5021V18.6621H24.0683V12.2421C24.0683 8.52531 26.2815 5.61423 30.3956 5.61423C34.5617 5.61423 36.827 8.52531 36.827 12.2161V18.6621H34.2492V12.528C34.2492 10.1368 32.9473 8.08345 30.3956 8.08345Z"
                    fill="black"
                  />
                  <path
                    d="M44.8059 18.948C41.1345 19 38.1401 15.959 38.1401 12.2681C38.1401 8.60328 41.1345 5.58824 44.8059 5.61423C47.1493 5.61423 49.3105 6.67989 50.4822 8.96717L48.347 10.1628C47.5919 8.78522 46.3161 8.05746 44.8059 8.05746C42.5666 8.05746 40.7179 9.95486 40.7179 12.2681C40.7179 14.6074 42.5666 16.5308 44.8059 16.5308C46.3161 16.5308 47.5919 15.803 48.347 14.4254L50.4822 15.5951C49.3105 17.9083 47.1493 18.948 44.8059 18.948Z"
                    fill="black"
                  />
                  <path
                    d="M62.1625 17.1C59.2001 19.6008 55.1774 19.3205 52.6385 16.3237C50.2677 13.5254 50.3421 9.54794 53.2647 7.08068C56.2071 4.59664 59.8354 5.17603 62.1389 7.89495L62.8114 8.6888L55.0179 15.2682C56.6489 16.7506 58.9134 16.8473 60.663 15.3703C61.8559 14.3633 62.4923 12.941 62.1609 11.3825L64.3277 10.8809C64.8851 13.2697 64.0711 15.4887 62.1625 17.1ZM54.0213 13.9309L59.7671 9.08027C58.376 7.59941 56.3517 7.50426 54.7412 8.86377C53.0911 10.2568 52.9927 12.3143 54.0213 13.9309Z"
                    fill="black"
                  />
                </svg>
              </Link>
              <div className="cls-content text-center">
                <Link to={`/shop-default`} className="link text-sm fw-medium">
                  Shop All
                </Link>
              </div>
            </div>
          </SwiperSlide>

          <span className="d-flex d-xl-none sw-dot-default sw-pagination-categories justify-content-center" />
        </Swiper>
      </div>
    </div>
  );
}
