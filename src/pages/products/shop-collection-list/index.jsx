import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import Features2 from "@/components/products/Features2";
import SubCollections2 from "@/components/products/SubCollections2";
import { Link } from "react-router-dom";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Breadcumb from "@/components/products/Breadcumb";
const metadata = {
  title:
    "Shop Collection List || Vineta - Multipurpose Reactjs eCommerce Template",
  description: "Vineta - Multipurpose Reactjs eCommerce Template",
};
export default function ProductPageCollectionList() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <>
        {/* Title Page */}
        <Breadcumb showCollection={false} />
      </>
      <SubCollections2 />
      <Features2 />
      <Footer1 />
    </>
  );
}
