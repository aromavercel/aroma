import Address from "@/components/dashboard/Address";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Breadcumb from "@/components/common/Breadcumb";

const metadata = {
  title: "Endereços || Aroma Expresso",
  description: "Gerencie seus endereços de entrega na Aroma Expresso.",
};

export default function AccountAddressPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <Breadcumb pageName="Endereços" pageTitle="Endereços" />
      <Address />
      <Footer1 />
    </>
  );
}
