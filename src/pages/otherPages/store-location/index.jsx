import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import StoreLocations from "@/components/otherPages/StoreLocations";
import React from "react";
import { Link } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import Breadcumb from "@/components/common/Breadcumb";
const metadata = {
  title: "Lojas | Aroma",
  description: "Encontre nossas lojas e pontos de atendimento.",
};
export default function StoreLocationPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <Breadcumb pageName="Lojas" pageTitle="Lojas" />
      <StoreLocations />
      <Footer1 />
    </>
  );
}
