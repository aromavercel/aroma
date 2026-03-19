import MetaComponent from "@/components/common/MetaComponent";
import Footer6 from "@/components/footers/Footer6";
import Header5 from "@/components/headers/Header5";
import Topbar from "@/components/headers/Topbar";
import Banner from "@/components/homes/home-furniture2/Banner";
import Categories from "@/components/homes/home-furniture2/Categories";
import Collections from "@/components/homes/home-furniture2/Collections";
import Features from "@/components/homes/home-furniture2/Features";
import Hero from "@/components/homes/home-furniture2/Hero";
import InstagramPosts from "@/components/homes/home-furniture2/InstagramPosts";
import Lookbook from "@/components/homes/home-furniture2/Lookbook";
import Products1 from "@/components/homes/home-furniture2/Products1";
import Testimonials from "@/components/homes/home-furniture2/Testimonials";
import React from "react";
const metadata = {
  title: "Home Furniture 02 || Vineta - Multipurpose Reactjs eCommerce",
  description: "Vineta - Multipurpose Reactjs eCommerce",
};
export default function HomePageFurniture2() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header5 />
      <Hero />
      <Collections />
      <Products1 />
      <Banner />
      <Categories />
      <Lookbook />
      <Testimonials />
      <InstagramPosts />

      <Features />
      <Footer6 />
    </>
  );
}
