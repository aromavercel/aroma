"use client";
import ProductCard7 from "@/components/productCards/ProductCard7";

import { bannersCollections } from "@/data/collections";
import { iconFeatures } from "@/data/features";
import { Link } from "react-router-dom";

import {
  electronicProducts2,
  electronicProducts3,
  electronicProducts4,
} from "@/data/products";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CountdownTimer from "@/components/common/Countdown";
import ProductCard13 from "@/components/productCards/ProductCard13";

export default function Products() {
  const [activeTab, setActiveTab] = useState("New Arrivals");
  const [filtered, setFiltered] = useState(electronicProducts4);

  const tabs = [
    { id: 1, name: "New Arrivals" },
    { id: 2, name: "Featured" },
    { id: 3, name: "Trending" },
  ];
  useEffect(() => {
    setFiltered(
      electronicProducts4.filter((elm) =>
        elm.tabFilterCategories.includes(activeTab)
      )
    );
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const [activeCategory, setActiveCategory] = useState("Earphones"); // Default active category
  const [filtered2, setFiltered2] = useState(electronicProducts2);
  useEffect(() => {
    setFiltered2(
      electronicProducts2.filter((elm) =>
        elm.filterCategories.includes(activeCategory)
      )
    );
  }, [activeCategory]);

  const categories = [
    {
      name: "Smartphones",
      image: "/images/cls-categories/electronic/smartphone.png",
    },
    {
      name: "Earphones",
      image: "/images/cls-categories/electronic/earphone.png",
    },
    {
      name: "Cables",
      image: "/images/cls-categories/electronic/cable.png",
    },
    {
      name: "Smart Watches",
      image: "/images/cls-categories/electronic/smart-watch.png",
    },
    {
      name: "Chargers",
      image: "/images/cls-categories/electronic/charge.png",
    },
    {
      name: "Screen Protectors",
      image: "/images/cls-categories/electronic/screen-protector.png",
    },
    {
      name: "Headphones",
      image: "/images/cls-categories/electronic/headphone.png",
    },
    {
      name: "Keyboards",
      image: "/images/cls-categories/electronic/keyboard.png",
    },
  ];

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
  };

  return (
    <section className="">
      <div className="container">
        <div className="row">
          <div className="col-xl-3">
            <div className="canvas-sidebar sidebar-filter canvas-filter left">
              <div className="canvas-wrapper">
                <div className="canvas-header d-flex d-xl-none">
                  <span className="title">Sidebar</span>
                  <span className="icon-close icon-close-popup close-filter" />
                </div>
                <div className="canvas-body">
                  <div className="mega-box mega-cate-box">
                    <span className="categories-title">
                      <i className="icon icon-categories" />
                      categories
                    </span>
                    <ul className="mega-categories">
                      {categories.map((category) => (
                        <li key={category.name}>
                          <a
                            className={`cate-item ${
                              activeCategory === category.name ? "active" : ""
                            }`}
                            onClick={() => handleCategoryClick(category.name)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="img">
                              <img
                                alt="img"
                                src={category.image}
                                width={440}
                                height={440}
                              />
                            </div>
                            <span className="name-cate">{category.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mega-box wg-cls style-abs type-2 hover-img">
                    <Link
                      to={`/shop-default`}
                      className="image img-style d-block"
                    >
                      <img
                        src="/images/cls-categories/electronic/headphone-cls2.jpg"
                        alt=""
                        className="lazyload"
                        width={513}
                        height={696}
                      />
                    </Link>
                    <div className="cls-btn text-center">
                      <Link
                        to={`/shop-default`}
                        className="tf-btn btn-cls btn-white hover-dark"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                  <div className="mega-box">
                    <div className="mega-title-box">
                      <div className="title display-xs fw-medium">
                        Special Offers
                      </div>
                      <div className="box-nav-swiper">
                        <div className="swiper-button-prev nav-swiper size-36 nav-prev-offer" />
                        <div className="swiper-button-next nav-swiper size-36 nav-next-offer" />
                      </div>
                    </div>
                    <Swiper
                      dir="ltr"
                      className="swiper tf-swiper"
                      {...{
                        slidesPerView: 1,
                        spaceBetween: 12,
                        speed: 800,
                        observer: true,
                        observeParents: true,
                        navigation: {
                          clickable: true,
                          nextEl: ".nav-next-offer",
                          prevEl: ".nav-prev-offer",
                        },
                        pagination: {
                          el: ".sw-pagination-offer",
                          clickable: true,
                        },
                      }}
                      modules={[Navigation, Pagination]}
                    >
                      {electronicProducts3.map((product, i) => (
                        <SwiperSlide key={i} className="swiper-slide">
                          <ProductCard13 product={product} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="mega-box mega-iconbox">
                    <div className="tf-icon-box style-2">
                      <div className="box-icon">
                        <i className="icon icon-shipping text-primary" />
                      </div>
                      <div className="content">
                        <div className="title">Free Shipping</div>
                        <p className="desc">
                          Enjoy free delivery on all orders
                        </p>
                      </div>
                    </div>
                    <div className="tf-icon-box style-2">
                      <div className="box-icon">
                        <i className="icon icon-gift text-primary" />
                      </div>
                      <div className="content">
                        <div className="title">Gift Package</div>
                        <p className="desc">Perfectly packaged for gifting</p>
                      </div>
                    </div>
                    <div className="tf-icon-box style-2">
                      <div className="box-icon">
                        <i className="icon icon-return text-primary" />
                      </div>
                      <div className="content">
                        <div className="title">Easy Returns</div>
                        <p className="desc">Within 14 days for a return</p>
                      </div>
                    </div>
                    <div className="tf-icon-box style-2">
                      <div className="box-icon">
                        <i className="icon icon-support text-primary" />
                      </div>
                      <div className="content">
                        <div className="title">24/7 Premium Support</div>
                        <p className="desc">Outstanding premium support</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9">
            <div className="flat-title style-between">
              <div className="box-title">
                <h4 className="title">Hot Deals</h4>
                <p className="desc text-main text-md">
                  Explore our most popular pieces that customers can't get
                  enough of
                </p>
              </div>
              <div className="wg-countdown-2">
                <span
                  className="js-countdown"
                  data-timer={46556}
                  data-labels="Days,Hours,Mins,Secs"
                >
                  <CountdownTimer style={2} />
                </span>
              </div>
            </div>
            <div className="tab-content">
              <div
                className="tab-pane fade active show"
                id="earPhone"
                role="tabpanel"
              >
                <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                  {/* item 1 */}

                  {filtered2.length &&
                    filtered2.map((product, i) => (
                      <ProductCard7 product={product} key={i} />
                    ))}
                </div>
              </div>
            </div>
            {/* Banner Shop */}
            <div className="flat-spacing-2">
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
                    nextEl: ".nav-next-cls",
                    prevEl: ".nav-prev-cls",
                  },
                  pagination: { el: ".sw-pagination-cls", clickable: true },
                  breakpoints: {
                    768: {
                      slidesPerView: 1,
                      spaceBetween: 12,
                      slidesPerGroup: 2,
                    },
                    1024: {
                      slidesPerView: 2,
                      spaceBetween: 18,
                      slidesPerGroup: 2,
                    },
                  },
                }}
                modules={[Pagination, Navigation]}
              >
                {bannersCollections.map((banner, index) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    <div className="banner-shop style-bottom hover-img">
                      <Link to={`/shop-default`} className="img-style d-block">
                        <img
                          src={banner.imgSrc}
                          alt=""
                          className="lazyload"
                          width={792}
                          height={665}
                        />
                      </Link>
                      <div className="content text-center wow fadeInUp">
                        <div className="box-title">
                          <h4>
                            <Link
                              to={`/shop-default`}
                              className="title link text-white"
                              dangerouslySetInnerHTML={{ __html: banner.title }}
                            ></Link>
                          </h4>
                          <p className="text-sm text-white">
                            {banner.description}
                          </p>
                        </div>
                        <Link
                          to={`/shop-default`}
                          className="tf-btn animate-btn"
                        >
                          {banner.buttonText}
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="d-flex d-lg-none sw-dot-default sw-pagination-cls justify-content-center" />
              </Swiper>
            </div>
            {/* /Banner Shop */}
            {/* Just For You */}
            <div className="flat-animate-tab">
              <div className="flat-title style-between align-items-end flex-wrap">
                <div className="box-title">
                  <h4 className="title">Just For You</h4>
                  <p className="desc text-main text-md">
                    Explore our most popular pieces that customers can't get
                    enough of
                  </p>
                </div>
                <ul className="menu-tab-line style-md2" role="tablist">
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
                <div
                  className="tab-pane active show"
                  id="newArrival"
                  role="tabpanel"
                >
                  <Swiper
                    dir="ltr"
                    className="swiper wrap-sw-over tf-swiper"
                    {...{
                      slidesPerView: 2,
                      spaceBetween: 12,
                      speed: 800,
                      observer: true,
                      observeParents: true,
                      slidesPerGroup: 2,
                      pagination: {
                        el: ".sw-pagination-newArrivals",
                        clickable: true,
                      },
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
                    modules={[Pagination]}
                    // autoHeight
                  >
                    {filtered.map((product, i) => (
                      <SwiperSlide key={i}>
                        <ProductCard7 product={product} />
                      </SwiperSlide>
                    ))}
                    <div className="d-flex d-xl-none sw-dot-default sw-pagination-newArrivals justify-content-center" />
                  </Swiper>
                </div>
              </div>
            </div>
            {/* Just For You */}
          </div>
        </div>
      </div>
    </section>
  );
}
