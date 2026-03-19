import Footer3 from "@/components/footers/Footer3";
import Header12 from "@/components/headers/Header12";

import Topbar from "@/components/headers/Topbar";
import Banner from "@/components/homes/home-plant/Banner";
import Banner2 from "@/components/homes/home-plant/Banner2";
import Blogs from "@/components/homes/home-plant/Blogs";
import Collections from "@/components/homes/home-plant/Collections";
import Features from "@/components/homes/home-plant/Features";
import Hero from "@/components/homes/home-plant/Hero";
import Products from "@/components/homes/home-plant/Products";
import Shopgram from "@/components/homes/home-plant/Shopgram";
import Testimonials from "@/components/homes/home-plant/Testimonials";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Plant || Vineta - Multipurpose Reactjs eCommerce Template",
  description: "Vineta - Multipurpose Reactjs eCommerce Template",
};
export default function HomePagePlant() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="bg-surface-3 primary-3">
        <Topbar />
        <Header12 />
        <Hero />
        <Features />
        <Banner />
        <Products />
        <Banner2 />
        <Collections />
        <Testimonials />
        <Blogs />
        <Shopgram />
        <Footer3 />
      </div>
    </>
  );
}
