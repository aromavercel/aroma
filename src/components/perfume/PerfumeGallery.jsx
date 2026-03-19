"use client";

import React, { useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

/**
 * Galeria de imagens do perfume no estilo Vineta (product-detail):
 * thumbs verticais + imagem principal com navegação.
 */
export default function PerfumeGallery({ images = [], alt = "Perfume" }) {
  const [thumbSwiper, setThumbSwiper] = useState(null);
  const items = images.length ? images.map((imgSrc, id) => ({ id, imgSrc })) : [{ id: 0, imgSrc: "" }];

  return (
    <>
      <Swiper
        dir="ltr"
        className="swiper tf-product-media-thumbs other-image-zoom"
        slidesPerView={4}
        direction="vertical"
        onSwiper={setThumbSwiper}
        modules={[Thumbs]}
        spaceBetween={8}
      >
        {items.map(({ id, imgSrc }, index) => (
          <SwiperSlide key={id} className="swiper-slide stagger-item">
            <div className="item">
              {imgSrc ? (
                <img
                  className="lazyload"
                  data-src={imgSrc}
                  alt={`${alt} ${index + 1}`}
                  src={imgSrc}
                  width={828}
                  height={1241}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="d-flex align-items-center justify-content-center bg-light" style={{ width: "100%", aspectRatio: "2/3", minHeight: 120 }}>
                  <span className="icon icon-user text-muted" />
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flat-wrap-media-product">
        <Swiper
          modules={[Thumbs, Navigation]}
          dir="ltr"
          className="swiper tf-product-media-main"
          thumbs={{ swiper: thumbSwiper }}
          navigation={{
            prevEl: ".perfume-gallery-prev",
            nextEl: ".perfume-gallery-next",
          }}
        >
          {items.map(({ id, imgSrc }, i) => (
            <SwiperSlide key={id} className="swiper-slide">
              <div className="item">
                {imgSrc ? (
                  <img
                    className="tf-image-zoom lazyload"
                    data-src={imgSrc}
                    alt={i === 0 ? alt : ""}
                    src={imgSrc}
                    width={828}
                    height={1241}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center bg-light" style={{ width: "100%", aspectRatio: "2/3", minHeight: 320 }}>
                    <span className="icon icon-user text-muted" style={{ fontSize: "4rem" }} />
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-next nav-swiper thumbs-next perfume-gallery-next" />
        <div className="swiper-button-prev nav-swiper thumbs-prev perfume-gallery-prev" />
      </div>
    </>
  );
}
