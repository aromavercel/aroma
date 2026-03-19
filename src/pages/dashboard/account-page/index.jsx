import Account from "@/components/dashboard/Account";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Breadcumb from "@/components/common/Breadcumb";

const metadata = {
  title: "Minha conta || Aroma Expresso",
  description: "Gerencie seus dados, pedidos e endereços na Aroma Expresso.",
};

export default function AccountPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <Breadcumb pageName="Conta" pageTitle="Minha conta" />

      <Account />
      <Footer1 />
    </>
  );
}
