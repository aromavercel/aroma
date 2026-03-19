"use client";

import { useEffect, useRef, useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PhotoSwipeLightbox from "photoswipe/lightbox";

import Drift from "drift-zoom";
const slides = [
  {
    id: 1,
    color: "Black",
    size: "small",
    imgSrc: "/images/products/fashion/women-black-1.jpg",
  },
  {
    id: 2,
    color: "Black",
    size: "medium",
    imgSrc: "/images/products/fashion/women-black-2.jpg",
  },
  {
    id: 3,
    color: "Black",
    size: "large",
    imgSrc: "/images/products/fashion/women-black-3.jpg",
  },
  {
    id: 4,
    color: "Black",
    size: "extra large",
    imgSrc: "/images/products/fashion/women-black-4.jpg",
  },
  {
    id: 5,
    color: "Yellow",
    size: "small",
    imgSrc: "/images/products/fashion/women-yellow-1.jpg",
  },
  {
    id: 6,
    color: "Yellow",
    size: "medium",
    imgSrc: "/images/products/fashion/women-yellow-2.jpg",
  },
  {
    id: 7,
    color: "Grey",
    size: "large",
    imgSrc: "/images/products/fashion/women-grey-1.jpg",
  },
  {
    id: 8,
    color: "Grey",
    size: "extra large",
    imgSrc: "/images/products/fashion/women-grey-2.jpg",
  },
];

export default function Slider2({
  activeColor = "Black",
  setActiveColor = () => {},
  firstItem,
  slideItems = slides,
}) {
  const items = [...slideItems];
  items[0].imgSrc = firstItem ?? items[0].imgSrc;

  const [thumbSwiper, setThumbSwiper] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  useEffect(() => {
    // Function to initialize Drift
    // Function to check window width
    const checkWindowSize = () => window.innerWidth >= 1200;

    // Only proceed if window is wide enough
    if (!checkWindowSize()) return;

    const imageZoom = () => {
      const driftAll = document.querySelectorAll(".tf-image-zoom");
      const pane = document.querySelector(".tf-zoom-main");

      driftAll.forEach((el) => {
        new Drift(el, {
          zoomFactor: 2,
          paneContainer: pane,
          inlinePane: false,
          handleTouch: false,
          hoverBoundingBox: true,
          containInline: true,
        });
      });
    };
    imageZoom();
    const zoomElements = document.querySelectorAll(".tf-image-zoom");

    const handleMouseOver = (event) => {
      const parent = event.target.closest(".section-image-zoom");
      if (parent) {
        parent.classList.add("zoom-active");
      }
    };

    const handleMouseLeave = (event) => {
      const parent = event.target.closest(".section-image-zoom");
      if (parent) {
        parent.classList.remove("zoom-active");
      }
    };

    zoomElements.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup event listeners on component unmount
    return () => {
      zoomElements.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []); // Empty dependency array to run only once on mount
  const lightboxRef = useRef(null);
  useEffect(() => {
    // Initialize PhotoSwipeLightbox
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery-swiper-started",
      children: ".item",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();

    // Store the lightbox instance in the ref for later use
    lightboxRef.current = lightbox;

    // Cleanup: destroy the lightbox when the component unmounts
    return () => {
      lightbox.destroy();
    };
  }, []);
  useEffect(() => {
    if (!(items[activeIndex].color == activeColor)) {
      const slideIndex =
        items.filter((elm) => elm.color == activeColor)[0]?.id - 1;
      swiperRef.current.slideTo(slideIndex);
    }
  }, [activeColor]);
  useEffect(() => {
    setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.slideTo(1);
        swiperRef.current.slideTo(
          items.filter((elm) => elm.color == activeColor)[0]?.id - 1
        );
      }
    });
  }, []);

  return (
    <>
      <div className="flat-wrap-media-product">
        <Swiper
          modules={[Thumbs, Navigation]}
          dir="ltr"
          className="swiper tf-product-media-main"
          id="gallery-swiper-started"
          thumbs={{ swiper: thumbSwiper }}
          navigation={{
            prevEl: ".snbp1",
            nextEl: ".snbn1",
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            if (items[swiper.activeIndex]) {
              setActiveIndex(swiper.activeIndex);
              setActiveColor(items[swiper.activeIndex]?.color);
            }
          }}
        >
          {items.map((elm, i) => (
            <SwiperSlide
              key={i}
              className="swiper-slide"
              data-color="black"
              data-size="small"
            >
              <a
                href={elm.imgSrc}
                target="_blank"
                className="item"
                data-pswp-width="552px"
                data-pswp-height="827px"
              >
                <img
                  className="tf-image-zoom lazyload"
                  data-zoom={elm.imgSrc}
                  data-src={elm.imgSrc}
                  alt="img-product"
                  src={elm.imgSrc}
                  width={828}
                  height={1241}
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-next nav-swiper thumbs-next snbn1" />
        <div className="swiper-button-prev nav-swiper thumbs-prev snbp1" />
      </div>
      <Swiper
        dir="ltr"
        className="swiper tf-product-media-thumbs other-image-zoom"
        slidesPerView={4}
        direction="vertical"
        onSwiper={setThumbSwiper}
        modules={[Thumbs]}
        spaceBetween={8}
      >
        {items.map(({ color, size, imgSrc }, index) => (
          <SwiperSlide
            key={index}
            className="swiper-slide stagger-item"
            data-color={color}
            data-size={size}
          >
            <div className="item">
              <img
                className="lazyload"
                data-src={imgSrc}
                alt="img-product"
                src={imgSrc}
                width={828}
                height={1241}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
