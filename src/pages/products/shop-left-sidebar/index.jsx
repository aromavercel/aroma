import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import Breadcumb from "@/components/products/Breadcumb";
import Features from "@/components/products/Features";

import Products2 from "@/components/products/Products2";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Shop Left Sidebar || Vineta - Multipurpose Reactjs eCommerce Template",
  description: "Vineta - Multipurpose Reactjs eCommerce Template",
};
export default function ProductPageLeftSidebar() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <Breadcumb />

      <Products2 />
      <Features />
      <Footer1 />
    </>
  );
}
