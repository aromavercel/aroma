import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Topbar from "@/components/headers/Topbar";
import Features from "@/components/homes/home-1/Features";
import Banner from "@/components/homes/home-jewelry/Banner";
import Categories from "@/components/homes/home-jewelry/Categories";
import Collections from "@/components/homes/home-jewelry/Collections";
import Hero from "@/components/homes/home-jewelry/Hero";
import Lookbook from "@/components/homes/home-jewelry/Lookbook";
import Products from "@/components/homes/home-jewelry/Products";
import ShopGram from "@/components/homes/home-jewelry/ShopGram";
import Testimonials from "@/components/homes/home-jewelry/Testimonials";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Jewelry || Vineta - Multipurpose Reactjs eCommerce Template",
  description: "Vineta - Multipurpose Reactjs eCommerce Template",
};
export default function HomePageJewwlry() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header2 />
      <Hero />
      <Categories />
      <Banner />
      <Products />
      <Collections />
      <Lookbook />
      <Testimonials />
      <ShopGram />
      <Features titleClass="title fw-semibold text-uppercase" />
      <Footer1 />
    </>
  );
}
