import Footer1 from "@/components/footers/Footer1";
import Header9 from "@/components/headers/Header9";
import Topbar from "@/components/headers/Topbar";
import Banner from "@/components/homes/home-electric-accessories/Banner";
import Brands from "@/components/homes/home-electric-accessories/Brands";
import Categories from "@/components/homes/home-electric-accessories/Categories";
import Collectiions from "@/components/homes/home-electric-accessories/Collectiions";
import Features from "@/components/homes/home-electric-accessories/Features";
import Hero from "@/components/homes/home-electric-accessories/Hero";
import Products from "@/components/homes/home-electric-accessories/Products";
import Products2 from "@/components/homes/home-electric-accessories/Products2";
import Products3 from "@/components/homes/home-electric-accessories/Products3";
import Products4 from "@/components/homes/home-electric-accessories/Products4";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Home Electric Accessories || Vineta - Multipurpose Reactjs eCommerce Template",
  description: "Vineta - Multipurpose Reactjs eCommerce Template",
};
export default function HomePageElectricAccessories() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header9 />
      <Hero />
      <Products />
      <Collectiions />
      <Categories />
      <Products2 />
      <Brands />
      <Products3 />
      <Banner />
      <Products4 />
      <Features />
      <Footer1 />
    </>
  );
}
