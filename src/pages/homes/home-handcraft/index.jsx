import MetaComponent from "@/components/common/MetaComponent";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar4 from "@/components/headers/Topbar4";

import Banner from "@/components/homes/home-handcraft/Banner";
import Blogs from "@/components/homes/home-handcraft/Blogs";
import Categories from "@/components/homes/home-handcraft/Categories";
import Collections from "@/components/homes/home-handcraft/Collections";
import Features from "@/components/homes/home-handcraft/Features";
import Hero from "@/components/homes/home-handcraft/Hero";
import Products1 from "@/components/homes/home-handcraft/Products1";
import Testimonials from "@/components/homes/home-handcraft/Testimonials";
import React from "react";
const metadata = {
  title: "Home HandCraft || Vineta - Multipurpose Reactjs eCommerce",
  description: "Vineta - Multipurpose Reactjs eCommerce",
};
export default function HomePageHandcraft() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar4 parentClass="tf-topbar bg-brown-10 topbar-bg marquee-topbar" />
      <Header1 parentClass="header-default line" />
      <Hero />
      <Banner />
      <Products1 />
      <Collections />
      <Categories />
      <Testimonials />
      <Blogs />
      <Features />
      <Footer1 />
    </>
  );
}
