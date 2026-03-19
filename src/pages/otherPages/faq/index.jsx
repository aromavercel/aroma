import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import Faqs from "@/components/otherPages/Faqs";
import React from "react";
import { Link } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import Breadcumb from "@/components/common/Breadcumb";
const metadata = {
  title: "Perguntas Frequentes || Aroma Express",
  description: "Perguntas frequentes do Aroma Express - Envio, pagamento, devolução e troca.",
};
export default function FaqPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <Breadcumb pageName="Perguntas Frequentes" pageTitle="Perguntas Frequentes" />

      <Faqs />
      <Footer1 />
    </>
  );
}
