import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import Contact from "@/components/otherPages/Contact";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import Breadcumb from "@/components/common/Breadcumb";

const metadata = {
  title: "Contato | Aroma",
  description: "Fale com a equipe Aroma para dúvidas, sugestões ou suporte.",
};

export default function ContactusPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <Breadcumb pageName="Contato" pageTitle="Contato" />
      <Contact />
      <Footer1 />
    </>
  );
}
