import Features3 from "@/components/common/Featires3";
import MetaComponent from "@/components/common/MetaComponent";
import Footer4 from "@/components/footers/Footer4";
import Header2 from "@/components/headers/Header2";
import Topbar4 from "@/components/headers/Topbar4";
import Categories from "@/components/homes/home-jewelry2/Categories";
import Collections from "@/components/homes/home-jewelry2/Collections";
import Hero from "@/components/homes/home-jewelry2/Hero";
import InstagramPosts from "@/components/homes/home-jewelry2/InstagramPosts";
import Lookbook from "@/components/homes/home-jewelry2/Lookbook";
import Products1 from "@/components/homes/home-jewelry2/Products1";
import Testimonials from "@/components/homes/home-jewelry2/Testimonials";
import TextSlider from "@/components/homes/home-jewelry2/TextSlider";
import React from "react";
const metadata = {
  title: "Home Jewelry 02 || Vineta - Multipurpose Reactjs eCommerce",
  description: "Vineta - Multipurpose Reactjs eCommerce",
};
export default function HomePageJewwlry2() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar4 parentClass="tf-topbar bg-brown-10 topbar-bg marquee-topbar" />
      <Header2 />
      <Hero />
      <Features3
        itemClass="tf-icon-box style-lg rounded-0 wow fadeInLeft"
        parentClass={"flat-spacing-6 pt-0"}
      />
      <Products1 />
      <Categories />
      <TextSlider />
      <Collections />
      <Lookbook />
      <Testimonials />
      <InstagramPosts />
      <Footer4 />
    </>
  );
}
