import Footer1 from "@/components/footers/Footer1";
import Header11 from "@/components/headers/Header11";
import Topbar4 from "@/components/headers/Topbar4";
import Banner from "@/components/homes/home-vegetable/Banner";
import Categories from "@/components/homes/home-vegetable/Categories";
import Collections from "@/components/homes/home-vegetable/Collections";
import Contact from "@/components/homes/home-vegetable/Contact";
import Features from "@/components/homes/home-vegetable/Features";
import Features2 from "@/components/homes/home-vegetable/Features2";
import Products from "@/components/homes/home-vegetable/Products";
import Products2 from "@/components/homes/home-vegetable/Products2";
import Products3 from "@/components/homes/home-vegetable/Products3";
import Products4 from "@/components/homes/home-vegetable/Products4";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Vegetable || Vineta - Multipurpose Reactjs eCommerce Template",
  description: "Vineta - Multipurpose Reactjs eCommerce Template",
};
export default function HomePageVegetable() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar4 />
      <Header11 />
      <Collections />
      <Categories />
      <Products />

      <Features />
      <Products2 />
      <Products3 />
      <Banner />
      <Products4 />
      <Contact />
      <Features2 />
      <Footer1 />
    </>
  );
}
