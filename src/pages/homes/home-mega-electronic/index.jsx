import Footer1 from "@/components/footers/Footer1";
import Header10 from "@/components/headers/Header10";
import Topbar from "@/components/headers/Topbar";
import Banner from "@/components/homes/home-mega-electronic/Banner";
import Blogs from "@/components/homes/home-mega-electronic/Blogs";
import Collections from "@/components/homes/home-mega-electronic/Collections";
import Features from "@/components/homes/home-mega-electronic/Features";
import Products from "@/components/homes/home-mega-electronic/Products";
import Products2 from "@/components/homes/home-mega-electronic/Products2";
import Testimonials from "@/components/homes/home-mega-electronic/Testimonials";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Home Mega Electronic || Vineta - Multipurpose Reactjs eCommerce Template",
  description: "Vineta - Multipurpose Reactjs eCommerce Template",
};
export default function HomePageMegaElectric() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header10 />
      <Collections />
      <Products />
      <Banner />
      <Products2 />
      <Testimonials />
      <Blogs />
      <Features />
      <Footer1 />
    </>
  );
}
