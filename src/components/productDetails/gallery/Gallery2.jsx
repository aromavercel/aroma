"use client";
import React, { useEffect, useRef, useState } from "react";

import PhotoSwipeLightbox from "photoswipe/lightbox";
import Drift from "drift-zoom";

const imageData = [
  {
    id: 1,
    scroll: "Black",
    size: "small",
    width: 828,
    height: 1241,
    alt: "",
    src: "/images/products/fashion/women-black-1.jpg",
  },
  {
    id: 2,
    scroll: "Black",
    size: "medium",
    width: 828,
    height: 1241,
    alt: "",
    src: "/images/products/fashion/women-black-2.jpg",
  },
  {
    id: 3,
    scroll: "Black",
    size: "large",
    width: 828,
    height: 1241,
    alt: "",
    src: "/images/products/fashion/women-black-3.jpg",
  },
  {
    id: 4,
    scroll: "Black",
    size: "extra large",
    width: 828,
    height: 1241,
    alt: "",
    src: "/images/products/fashion/women-black-4.jpg",
  },
  {
    id: 5,
    scroll: "Yellow",
    size: "small",
    width: 828,
    height: 1241,
    alt: "",
    src: "/images/products/fashion/women-yellow-1.jpg",
  },
  {
    id: 6,
    scroll: "Yellow",
    size: "medium",
    width: 828,
    height: 1241,
    alt: "",
    src: "/images/products/fashion/women-yellow-2.jpg",
  },
  {
    id: 7,
    scroll: "Grey",
    size: "large",
    width: 828,
    height: 1241,
    alt: "",
    src: "/images/products/fashion/women-grey-1.jpg",
  },
  {
    id: 8,
    scroll: "Grey",
    size: "extra large",
    width: 828,
    height: 1241,
    alt: "",
    src: "/images/products/fashion/women-grey-2.jpg",
  },
];
export default function Gallery2({
  activeColor = "beige",
  setActiveColor = () => {},
  firstItem = imageData[0].src,
}) {
  const finalItem = [...imageData];
  finalItem[0].src = firstItem ?? finalItem[0].src;
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
      gallery: "#gallery-started",
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

  const observerRef = useRef(null);

  const scrollToTarget = () => {
    // Find the element with the specific data-value attribute
    const heightScroll = window.scrollY;
    const targetElement = document.querySelector(
      `[data-scroll='${activeColor}']`
    );

    // Check if the element exists
    if (targetElement) {
      // Get the element's bounding rectangle
      setTimeout(() => {
        if (window.scrollY == heightScroll) {
          targetElement?.scrollIntoView({
            behavior: "smooth", // Smooth scrolling animation
            block: "center", // Center the element in the viewport
          });
        }
      }, 200);

      // Scroll only if the element is not already in view
    }
  };

  useEffect(() => {
    scrollToTarget();
  }, [activeColor]);

  useEffect(() => {
    setTimeout(() => {
      const options = {
        rootMargin: "-50% 0px",
      };

      // Create the observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const scrollValue = entry.target.getAttribute("data-scroll");
            setActiveColor(scrollValue);
          }
        });
      }, options);

      // Observe all items
      const elements = document.querySelectorAll(".item-scroll-target");
      elements.forEach((el) => observer.observe(el));
      observerRef.current = observer;
    }, 1000);

    // Cleanup on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  return (
    <div
      className="wrapper-gallery-scroll flat-single-grid flat-single-grid-2"
      id="gallery-started"
    >
      {finalItem.map((image, index) => (
        <a
          key={index}
          href={image.src}
          data-scroll={image.scroll}
          target="_blank"
          className="item item-scroll-target"
          data-pswp-width="552px"
          data-pswp-height="827px"
        >
          <img
            className="tf-image-zoom lazyload"
            data-zoom={image.src}
            data-src={image.src}
            alt={image.alt}
            src={image.src}
            width={image.width}
            height={image.height}
          />
        </a>
      ))}
    </div>
  );
}
