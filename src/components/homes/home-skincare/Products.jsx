"use client";
import ProductCard4 from "@/components/productCards/ProductCard4";
import { products11 } from "@/data/products";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products() {
  const [activeTab, setActiveTab] = useState("What’s Hot?");
  const [filtered, setFiltered] = useState(products11);

  const tabs = [
    { id: 1, name: "What’s Hot?" },
    { id: 2, name: "Best Sellers" },
    { id: 3, name: "Just Arrivals" },
  ];
  useEffect(() => {
    setFiltered(
      products11.filter((elm) => elm.tabFilterCategories.includes(activeTab))
    );
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flat-spacing-2 bg-orange">
      <div className="container">
        <div className="flat-animate-tab flat-controltab-nav">
          <div className="flat-title">
            <ul className="menu-tab-line style-lg style-lg2">
              {tabs.map((tab) => (
                <li key={tab.id} className="nav-tab-item">
                  <a
                    className={`font-2 tab-link ${
                      activeTab === tab.name ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(tab.name)}
                    style={{ cursor: "pointer" }}
                  >
                    {tab.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="tab-content">
            <div className="tab-pane active show" id="hot" role="tabpanel">
              <Swiper
                dir="ltr"
                className="swiper tf-swiper"
                {...{
                  slidesPerView: 2,
                  spaceBetween: 12,
                  speed: 1000,
                  observer: true,
                  observeParents: true,
                  slidesPerGroup: 2,
                  navigation: {
                    clickable: true,
                    nextEl: ".nav-next-hot",
                    prevEl: ".nav-prev-hot",
                  },
                  pagination: { el: ".sw-pagination-hot", clickable: true },
                  breakpoints: {
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 24,
                      slidesPerGroup: 3,
                    },
                    1200: {
                      slidesPerView: 4,
                      spaceBetween: 24,
                      slidesPerGroup: 4,
                    },
                  },
                }}
                modules={[Navigation, Pagination]}
              >
                {filtered.map((product) => (
                  <SwiperSlide className="swiper-slide" key={product.id}>
                    <ProductCard4 product={product} />
                  </SwiperSlide>
                ))}
                <div className="d-flex d-xl-none sw-dot-default sw-pagination-hot justify-content-center" />
              </Swiper>
              <div className="box-nav-swiper style-2">
                <div className="swiper-button-prev d-xl-flex nav-swiper nav-prev-hot relative" />
                <div className="swiper-button-next d-xl-flex nav-swiper nav-next-hot relative" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
