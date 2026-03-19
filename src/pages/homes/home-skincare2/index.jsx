import MetaComponent from "@/components/common/MetaComponent";
import Footer7 from "@/components/footers/Footer7";
import Header2 from "@/components/headers/Header2";
import Topbar4 from "@/components/headers/Topbar4";
import Banner from "@/components/homes/home-skincare2/Banner";
import Faqs from "@/components/homes/home-skincare2/Faqs";
import Features from "@/components/homes/home-skincare2/Features";
import Features2 from "@/components/homes/home-skincare2/Features2";
import Hero from "@/components/homes/home-skincare2/Hero";
import Products1 from "@/components/homes/home-skincare2/Products1";
import SingleProduct from "@/components/homes/home-skincare2/SingleProduct";
import React from "react";
const metadata = {
  title: "Home Skincare 02 || Vineta - Multipurpose Reactjs eCommerce",
  description: "Vineta - Multipurpose Reactjs eCommerce",
};
export default function HomePageSkincare2() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar4 parentClass="tf-topbar bg-brown-10 topbar-bg marquee-topbar" />
      <Header2 />
      <Hero />
      <SingleProduct />
      <Features />
      <Features2 />
      <Banner />
      <Products1 />
      <Faqs />
      <Footer7 />
    </>
  );
}
