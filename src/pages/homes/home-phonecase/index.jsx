import Footer2 from "@/components/footers/Footer2";
import Header6 from "@/components/headers/Header6";
import Topbar from "@/components/headers/Topbar";
import Banner from "@/components/homes/home-phonecase/Banner";
import Banner2 from "@/components/homes/home-phonecase/Banner2";
import Categories from "@/components/homes/home-phonecase/Categories";
import Collections from "@/components/homes/home-phonecase/Collections";
import Features from "@/components/homes/home-phonecase/Features";
import Features2 from "@/components/homes/home-phonecase/Features2";
import Hero from "@/components/homes/home-phonecase/Hero";
import Products from "@/components/homes/home-phonecase/Products";
import Products2 from "@/components/homes/home-phonecase/Products2";
import Testimonials from "@/components/homes/home-phonecase/Testimonials";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Phonecase || Vineta - Multipurpose Reactjs eCommerce Template",
  description: "Vineta - Multipurpose Reactjs eCommerce Template",
};
export default function HomePagePhoneCase() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="bg-surface-2 home-phonecase">
        <Topbar />
        <Header6 />

        <Hero />
        <Categories />
        <Products />
        <Collections />
        <Banner />
        <Features />
        <Products2 />
        <Banner2 />
        <Testimonials />
        <Features2 />

        <Footer2 />
      </div>
    </>
  );
}
