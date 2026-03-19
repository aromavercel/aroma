import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import Features2 from "@/components/products/Features2";
import Products1 from "@/components/products/Products1";

import SubCollections3 from "@/components/products/SubCollections3";
import { Link } from "react-router-dom";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Breadcumb from "@/components/products/Breadcumb";
const metadata = {
  title:
    "Shop Sub Collections 02 || Vineta - Multipurpose Reactjs eCommerce Template",
  description: "Vineta - Multipurpose Reactjs eCommerce Template",
};
export default function ProductPageSubCollection2() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <Breadcumb />
      <SubCollections3 parentClass="flat-spacing-2" />

      <Products1 parentClass="flat-spacing-24 pt-0" />
      <Features2 />
      <Footer1 />
    </>
  );
}
