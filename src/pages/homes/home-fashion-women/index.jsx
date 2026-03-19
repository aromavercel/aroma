import Brands from "@/components/common/Brands";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";

import Banner from "@/components/homes/home-fashion-women/Banner";
import Collections from "@/components/homes/home-fashion-women/Collections";
import Features from "@/components/homes/home-fashion-women/Features";
import Hero from "@/components/homes/home-fashion-women/Hero";
import Products from "@/components/homes/home-fashion-women/Products";
import Shopgram from "@/components/homes/home-fashion-women/Shopgram";
import Testimonials from "@/components/homes/home-fashion-women/Testimonials";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Home Fashion Women || Vineta - Multipurpose Reactjs eCommerce Template",
  description: "Vineta - Multipurpose Reactjs eCommerce Template",
};
export default function HomePageFashionWoman() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 parentClass="header-default header-absolute" />
      <Hero />
      <Collections />
      <Products />
      <Banner />
      <Testimonials />
      <Brands />
      <Shopgram />
      <Features />
      <Footer1 />
    </>
  );
}
