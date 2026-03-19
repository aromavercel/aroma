"use client";
import { products16 } from "@/data/products";
import React, { useEffect } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import { useContextElement } from "@/context/Context";
export default function Products2() {
  const { setQuickViewItem } = useContextElement();

  useEffect(() => {
    // Play video on mouseenter for .hover-video
    const hoverVideos = document.querySelectorAll(".hover-video");
    hoverVideos.forEach((video) => {
      video.addEventListener("mouseenter", () => {
        video.muted = true; // Mute the video
        video.play();
      });
    });

    // Handle mouseenter and mouseleave for .cls-video
    const clsVideos = document.querySelectorAll(".cls-video");
    clsVideos.forEach((container) => {
      const video = container.querySelector("video");
      const poster = container.querySelector(".poster");

      const handleMouseEnter = () => {
        poster.classList.add("hide");
        video.muted = true; // Mute the video
        video.play();
      };

      const handleMouseLeave = () => {
        video.pause();
        poster.classList.remove("hide");
      };

      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup event listeners on unmount
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    // Cleanup hover-video event listeners on unmount
    return () => {
      hoverVideos.forEach((video) => {
        video.removeEventListener("mouseenter", () => {
          video.play();
        });
      });
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <section className="flat-spacing-3 pb-0">
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h4 className="title font-5">Most-Loved Items</h4>
          <p className="desc text-main text-md">
            Check out our best-sellers, loved by pets and owners alike.
          </p>
        </div>
        <div className="hover-sw-nav">
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
                nextEl: ".nav-next-video",
                prevEl: ".nav-prev-video",
              },
              pagination: { el: ".sw-pagination-video", clickable: true },
              breakpoints: {
                577: { slidesPerView: 2, spaceBetween: 12, slidesPerGroup: 2 },
                1200: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 4 },
              },
            }}
            modules={[Pagination, Navigation]}
          >
            {products16.map((product, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div className="cls-video">
                  <img
                    src={product.posterSrc}
                    alt="poster"
                    className="poster lazyload"
                    width={464}
                    height={649}
                  />
                  <video
                    className="hover-video"
                    width={464}
                    height={649}
                    playsInline
                    muted
                    loop
                  >
                    <source src={product.videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="cls-content">
                    <div className="box-product">
                      <div className="img-product">
                        <img
                          alt={product.imgSrc}
                          className="lazyload"
                          src={product.imgSrc}
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className="info-product">
                        <Link
                          to={`/product-detail/${product.id}`}
                          className="name link fw-medium text-md text-white text-line-clamp-2"
                        >
                          {product.title}
                        </Link>
                        <p className="price-wrap fw-medium text-md text-white">
                          <span className="price-new">
                            {" "}
                            ${product.price.toFixed(2)}{" "}
                          </span>{" "}
                          <span className="price-old">
                            {" "}
                            ${product.oldPrice.toFixed(2)}{" "}
                          </span>
                        </p>
                      </div>
                    </div>
                    <a
                      href="#quickView"
                      onClick={() => setQuickViewItem(product)}
                      data-bs-toggle="modal"
                      className="icon hover-tooltip"
                    >
                      <i className="icon-view" />
                      <span className="tooltip">Quick view</span>
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-video justify-content-center" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
