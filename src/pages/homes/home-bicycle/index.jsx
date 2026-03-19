import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import Brands from "@/components/common/Brands2";
import Hero from "@/components/homes/home-bicycle/Hero";
import React from "react";
import Categories from "@/components/homes/home-bicycle/Categories";
import Products from "@/components/homes/home-bicycle/Products";
import Collections from "@/components/homes/home-bicycle/Collections";
import Products2 from "@/components/homes/home-bicycle/Products2";
import VideoBanner from "@/components/homes/home-bicycle/VideoBanner";
import Blogs from "@/components/homes/home-bicycle/Blogs";
import Features from "@/components/homes/home-bicycle/Features";
import Footer1 from "@/components/footers/Footer1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Bicycle || Vineta - Multipurpose Reactjs eCommerce Template",
  description: "Vineta - Multipurpose Reactjs eCommerce Template",
};
export default function HomePageBicycle() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 parentClass="header-default header-absolute" />
      <Hero />
      <Brands parentClass="flat-spacing-4" />
      <Categories />
      <Products />
      <Collections />
      <Products2 />
      <VideoBanner />
      <Blogs />
      <Features />
      <Footer1 />
    </>
  );
}
