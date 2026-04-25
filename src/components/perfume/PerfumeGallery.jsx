"use client";

import React, { useEffect, useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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

/**
 * Galeria de imagens do perfume no estilo Vineta (product-detail):
 * thumbs verticais + imagem principal com navegação.
 * No mobile (≤767px) só a imagem principal: o swiper de thumbs em coluna cheia gerava uma faixa estranha abaixo da foto.
 */
export default function PerfumeGallery({ images = [], alt = "Perfume" }) {
  const [thumbSwiper, setThumbSwiper] = useState(null);
  const isMobileGallery = usePerfumeGalleryMobile();
  const items = images.length ? images.map((imgSrc, id) => ({ id, imgSrc })) : [{ id: 0, imgSrc: "" }];

  const mainModules = isMobileGallery ? [Navigation] : [Thumbs, Navigation];
  const canUseThumbs = !isMobileGallery && thumbSwiper && !thumbSwiper.destroyed;
  const mainThumbs = canUseThumbs ? { swiper: thumbSwiper } : undefined;

  // Ao alternar para mobile, o swiper de thumbs é desmontado; evita manter referência destruída.
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
      ) : null}
      <div className="flat-wrap-media-product">
        <Swiper
          key={isMobileGallery ? "perfume-main-mobile" : "perfume-main-desktop"}
          modules={mainModules}
          dir="ltr"
          className="swiper tf-product-media-main"
          thumbs={mainThumbs}
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
