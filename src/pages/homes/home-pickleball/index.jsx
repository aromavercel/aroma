import Brands2 from "@/components/common/Brands2";
import MetaComponent from "@/components/common/MetaComponent";
import Footer5 from "@/components/footers/Footer5";
import Header14 from "@/components/headers/Header14";
import Topbar4 from "@/components/headers/Topbar4";
import Banner from "@/components/homes/home-pickleball/Banner";
import Collections from "@/components/homes/home-pickleball/Collections";
import Collections2 from "@/components/homes/home-pickleball/Collections2";
import Features from "@/components/homes/home-pickleball/Features";
import Hero from "@/components/homes/home-pickleball/Hero";
import Products1 from "@/components/homes/home-pickleball/Products1";
import SingleProduct from "@/components/homes/home-pickleball/SingleProduct";
import Testimonials from "@/components/homes/home-pickleball/Testimonials";
import TextSlider from "@/components/homes/home-pickleball/TextSlider";
import React from "react";
const metadata = {
  title: "Home Pickleball || Vineta - Multipurpose Reactjs eCommerce",
  description: "Vineta - Multipurpose Reactjs eCommerce",
};
export default function HomePagePickleball() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar4 parentClass="tf-topbar bg-gradient-6 topbar-bg marquee-topbar" />
      <Header14 />
      <Hero />
      <Features />
      <Collections />
      <Brands2 parentClass="flat-spacing-16 pt-0" />
      <Products1 />
      <Banner />
      <SingleProduct />
      <TextSlider />
      <Collections2 />
      <Testimonials />
      <Footer5 />
    </>
  );
}
