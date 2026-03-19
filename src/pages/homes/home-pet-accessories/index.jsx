import Brands from "@/components/common/Brands";
import Footer1 from "@/components/footers/Footer1";
import Header7 from "@/components/headers/Header7";
import Topbar from "@/components/headers/Topbar";
import Banner from "@/components/homes/home-pet-accessories/Banner";
import Banner2 from "@/components/homes/home-pet-accessories/Banner2";
import Blogs from "@/components/homes/home-pet-accessories/Blogs";
import Collections from "@/components/homes/home-pet-accessories/Collections";
import Contact from "@/components/homes/home-pet-accessories/Contact";
import Features from "@/components/homes/home-pet-accessories/Features";
import Hero from "@/components/homes/home-pet-accessories/Hero";
import Products from "@/components/homes/home-pet-accessories/Products";
import Products2 from "@/components/homes/home-pet-accessories/Products2";
import Testimonials from "@/components/homes/home-pet-accessories/Testimonials";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Home Pet Accessories || Vineta - Multipurpose Reactjs eCommerce Template",
  description: "Vineta - Multipurpose Reactjs eCommerce Template",
};
export default function HomePagePetAccessories() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header7 />
      <Hero />
      <Collections />
      <Products />
      <Blogs />
      <Banner />
      <Products2 />
      <Brands parentClass="flat-spacing-2 pb-0" />
      <Banner2 />
      <Testimonials />
      <Contact />
      <Features />
      <Footer1 />
    </>
  );
}
