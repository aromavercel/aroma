import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import Wishlist from "@/components/otherPages/Wishlist";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import Breadcumb from "@/components/common/Breadcumb";

const metadata = {
  title: "Lista de desejos || Aroma Expresso",
  description: "Gerencie seus perfumes favoritos na Aroma Expresso.",
};

export default function WishlistPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <Breadcumb pageName="Lista de desejos" pageTitle="Lista de desejos" />
      <Wishlist />
      <Footer1 />
    </>
  );
}
