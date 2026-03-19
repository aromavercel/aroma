import Footer1 from "@/components/footers/Footer1";
import Header8 from "@/components/headers/Header8";
import Topbar from "@/components/headers/Topbar";
import Banner from "@/components/homes/home-sportwear/Banner";
import Brands from "@/components/homes/home-sportwear/Brands";
import Collections from "@/components/homes/home-sportwear/Collections";
import Collections2 from "@/components/homes/home-sportwear/Collections2";
import Features from "@/components/homes/home-sportwear/Features";
import Hero from "@/components/homes/home-sportwear/Hero";
import Products from "@/components/homes/home-sportwear/Products";
import Products2 from "@/components/homes/home-sportwear/Products2";
import ShopGram from "@/components/homes/home-sportwear/ShopGram";
import Testimonials from "@/components/homes/home-sportwear/Testimonials";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Sportwear || Vineta - Multipurpose Reactjs eCommerce Template",
  description: "Vineta - Multipurpose Reactjs eCommerce Template",
};
export default function HomePageSportwear() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header8 />
      <Hero />
      <Features />
      <Collections />
      <Products />
      <Banner />
      <Products2 />
      <Collections2 />
      <Brands />
      <Testimonials />
      <ShopGram />
      <Footer1 />
    </>
  );
}
