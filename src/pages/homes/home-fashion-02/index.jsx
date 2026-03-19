import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Topbar from "@/components/headers/Topbar";

import Banner from "@/components/homes/home-fashion-02/Banner";
import Banner2 from "@/components/homes/home-fashion-02/Banner2";
import Blogs from "@/components/homes/home-fashion-02/Blogs";
import Brands from "@/components/common/Brands";
import Features from "@/components/homes/home-fashion-02/Features";
import Hero from "@/components/homes/home-fashion-02/Hero";
import Products from "@/components/homes/home-fashion-02/Products";
import Products2 from "@/components/homes/home-fashion-02/Products2";
import Testimonials from "@/components/homes/home-fashion-02/Testimonials";
import React from "react";
import ProductsModal from "@/components/modals/ProductsModal";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Fashion 02 || Vineta - Multipurpose Reactjs eCommerce Template",
  description: "Vineta - Multipurpose Reactjs eCommerce Template",
};
export default function HomePageFashion2() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header2 />
      <Hero />
      <Products />
      <Banner />
      <Products2 />
      <Banner2 />
      <Brands />
      <Testimonials />
      <Blogs />
      <Features />
      <Footer1 />
      <ProductsModal />
    </>
  );
}
