import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import { checkAdmin } from "@/api/auth";
import MetaComponent from "@/components/common/MetaComponent";
import Breadcumb from "@/components/common/Breadcumb";

const metadata = {
  title: "Painel de Controle | Aroma",
  description: "Área administrativa",
};

export default function AdminPanelPage() {
  const { user } = useContextElement();
  const [adminVerified, setAdminVerified] = useState(null);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ok = await checkAdmin();
      if (!cancelled) setAdminVerified(ok);
    })();
    return () => { cancelled = true; };
  }, []);

  if (adminVerified === null) {
    return (
      <>
        <MetaComponent meta={metadata} />
        <Topbar />
        <Header1 />
        <section className="tf-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 text-center py-5">
                <p className="text-muted">Verificando permissão...</p>
              </div>
            </div>
          </div>
        </section>
        <Footer1 />
      </>
    );
  }

  if (adminVerified === false) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <Breadcumb pageName="Painel" pageTitle="Painel de Controle" />

      <section className="tf-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="dashboard-inner">
                <h2 className="mb-4">Painel de Controle</h2>
                <p className="text-muted">
                  Bem-vindo à área administrativa. Aqui você pode gerenciar o
                  conteúdo do site.
                </p>
                <div className="mt-5 p-4 rounded bg-light">
                  <p className="mb-0">
                    Em breve: ferramentas de gestão de produtos, usuários e
                    pedidos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer1 />
    </>
  );
}
