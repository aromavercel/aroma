"use client";

import React, { useEffect, useRef, useState } from "react";
import { EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/effect-fade";

const MOBILE_GALLERY_MQ = "(max-width: 767px)";

function usePerfumeGalleryMobile() {
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(MOBILE_GALLERY_MQ).matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_GALLERY_MQ);
    const onChange = () => setMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return mobile;
}

export default function PerfumeGallery({ images = [], alt = "Perfume" }) {
  const [thumbSwiper, setThumbSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const mainSwiperRef = useRef(null);
  const isMobileGallery = usePerfumeGalleryMobile();
  const items = images.length ? images.map((imgSrc, id) => ({ id, imgSrc })) : [{ id: 0, imgSrc: "" }];

  const imagesSig = images.join("|");
  useEffect(() => {
    setActiveIndex(0);
    const m = mainSwiperRef.current;
    if (m && !(typeof m.destroyed === "boolean" && m.destroyed)) {
      try {
        m.slideTo(0, 0);
      } catch {
      }
    }
  }, [imagesSig]);

  const syncThumbStrip = (index) => {
    const thumb = thumbSwiper;
    if (!thumb || (typeof thumb.destroyed === "boolean" && thumb.destroyed)) return;
    try {
      thumb.slideTo(index);
    } catch {
    }
  };

  const handleMainSlideChange = (swiper) => {
    const i = swiper.activeIndex;
    setActiveIndex(i);
    syncThumbStrip(i);
  };

  const handleThumbClick = (index) => {
    const main = mainSwiperRef.current;
    if (!main || (typeof main.destroyed === "boolean" && main.destroyed)) return;
    try {
      main.slideTo(index);
    } catch {
    }
    setActiveIndex(index);
    syncThumbStrip(index);
  };

  useEffect(() => {
    if (isMobileGallery) setThumbSwiper(null);
  }, [isMobileGallery]);

  return (
    <>
      {!isMobileGallery ? (
        <Swiper
          dir="ltr"
          className="swiper tf-product-media-thumbs other-image-zoom"
          slidesPerView={4}
          direction="vertical"
          onSwiper={setThumbSwiper}
          spaceBetween={8}
          watchSlidesProgress
          threshold={14}
        >
          {items.map(({ id, imgSrc }, index) => (
            <SwiperSlide
              key={id}
              className={`swiper-slide stagger-item${activeIndex === index ? " swiper-slide-thumb-active" : ""}`}
              onClick={() => handleThumbClick(index)}
              style={{ cursor: "pointer" }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleThumbClick(index);
                }
              }}
            >
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
                    draggable={false}
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
      ) : null}
      <div className="flat-wrap-media-product">
        <Swiper
          key={isMobileGallery ? "perfume-main-mobile-fade" : "perfume-main-desktop-slide"}
          {...(isMobileGallery
            ? {
                modules: [Navigation, EffectFade],
                effect: "fade",
                fadeEffect: { crossFade: true },
                speed: 320,
              }
            : {
                modules: [Navigation],
                slidesPerView: 1,
                spaceBetween: 0,
                roundLengths: true,
                speed: 400,
              })}
          dir="ltr"
          className={`swiper tf-product-media-main${isMobileGallery ? " perfume-gallery-mobile-fade" : ""}`}
          navigation={{
            prevEl: ".perfume-gallery-prev",
            nextEl: ".perfume-gallery-next",
          }}
          onSwiper={(swiper) => {
            mainSwiperRef.current = swiper;
          }}
          onSlideChange={handleMainSlideChange}
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
