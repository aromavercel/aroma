import Footer1 from "@/components/footers/Footer1";
import Header5 from "@/components/headers/Header5";
import Topbar from "@/components/headers/Topbar";
import Banner from "@/components/homes/home-skincare/Banner";
import Banner2 from "@/components/homes/home-skincare/Banner2";
import Categories from "@/components/homes/home-skincare/Categories";
import Hero from "@/components/homes/home-skincare/Hero";
import ImageCompare from "@/components/homes/home-skincare/ImageCompare";
import Marquee from "@/components/homes/home-skincare/Marquee";
import Products from "@/components/homes/home-skincare/Products";
import Products2 from "@/components/homes/home-skincare/Products2";
import ShopGram from "@/components/homes/home-skincare/ShopGram";
import Testimonials from "@/components/homes/home-skincare/Testimonials";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Skincare || Vineta - Multipurpose Reactjs eCommerce Template",
  description: "Vineta - Multipurpose Reactjs eCommerce Template",
};
export default function HomePageSkincare() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="font-2 bg-surface-5">
        <Topbar />
        <Header5 />
        <Hero />
        <Marquee />
        <Categories />
        <Products />
        <Banner />
        <Products2 />
        <Banner2 />
        <Testimonials />
        <ImageCompare />
        <ShopGram />
        <Footer1 />
      </div>
    </>
  );
}
