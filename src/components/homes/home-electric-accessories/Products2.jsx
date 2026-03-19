"use client";
import ProductCard5 from "@/components/productCards/ProductCard5";

import { electronicProducts } from "@/data/products";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products2() {
  const [activeTab, setActiveTab] = useState("What’s Hot?");
  const [filtered, setFiltered] = useState(electronicProducts);

  const tabs = [
    { id: 1, name: "What’s Hot?" },
    { id: 2, name: "Best Sellers" },
    { id: 3, name: "Just Arrivals" },
  ];
  useEffect(() => {
    setFiltered(
      electronicProducts.filter((elm) =>
        elm.tabFilterCategories.includes(activeTab)
      )
    );
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <section>
      <div className="container">
        <div className="flat-animate-tab flat-controltab-nav">
          <div className="flat-title">
            <ul className="menu-tab-line style2 style-lg style-lg2">
              {tabs.map((tab) => (
                <li key={tab.id} className="nav-tab-item">
                  <a
                    className={` tab-link ${
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
          <div className="tab-content sw-height">
            <div className="tab-pane active show">
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
                    nextEl: ".nav-next-hot",
                    prevEl: ".nav-prev-hot",
                  },
                  pagination: { el: ".sw-pagination-hot", clickable: true },
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
                {filtered.map((product, i) => (
                  <SwiperSlide key={i} className="swiper-slide">
                    <ProductCard5
                      product={product}
                      styleClass="style-2 style-border-2 border-type-2"
                    />
                  </SwiperSlide>
                ))}
                <div className="d-flex d-xl-none sw-dot-default sw-pagination-hot justify-content-center" />
              </Swiper>
              <div className="box-nav-swiper style-2">
                <div className="swiper-button-prev nav-swiper nav-prev-hot relative" />
                <div className="swiper-button-next nav-swiper nav-next-hot relative" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
