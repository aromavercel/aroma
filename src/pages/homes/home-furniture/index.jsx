import Footer1 from "@/components/footers/Footer1";
import Header4 from "@/components/headers/Header4";
import Topbar from "@/components/headers/Topbar";
import Categories from "@/components/homes/home-furniture/Categories";
import Collections from "@/components/homes/home-furniture/Collections";
import Collections2 from "@/components/homes/home-furniture/Collections2";
import Featires from "@/components/common/Featires3";
import Hero from "@/components/homes/home-furniture/Hero";
import Lookbook from "@/components/homes/home-furniture/Lookbook";
import Products from "@/components/homes/home-furniture/Products";
import Testimonials from "@/components/homes/home-furniture/Testimonials";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Furniture || Vineta - Multipurpose Reactjs eCommerce Template",
  description: "Vineta - Multipurpose Reactjs eCommerce Template",
};
export default function HomePageFurniture() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header4 />
      <Hero />
      <Featires />
      <Products />
      <Collections />
      <Categories />
      <Collections2 />
      <Lookbook />
      <Testimonials />
      <Footer1 />
    </>
  );
}
