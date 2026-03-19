import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import { checkAdmin } from "@/api/auth";
import MetaComponent from "@/components/common/MetaComponent";
import Breadcumb from "@/components/common/Breadcumb";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import AdminQuickNav from "@/components/dashboard/AdminQuickNav";

const metadata = {
  title: "Painel de Controle | Aroma",
  description: "Área administrativa",
};

export default function AdminPanelLayout() {
  const { user } = useContextElement();
  const [adminVerified, setAdminVerified] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ok = await checkAdmin();
      if (!cancelled) setAdminVerified(ok);
    })();
    return () => { cancelled = true; };
  }, []);

  if (!user) return <Navigate to="/" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;
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
  if (adminVerified === false) return <Navigate to="/" replace />;

  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <Breadcumb pageName="Painel" pageTitle="Painel de Controle" />
      <div className="flat-spacing-13">
        <div className="container-7">
          <div className="btn-sidebar-mb d-lg-none" style={{ top: "140px" }}>
            <button
              type="button"
              className="d-flex align-items-center gap-2 px-3 py-2 bg-dark text-white border-0 rounded-end shadow"
              data-bs-toggle="offcanvas"
              data-bs-target="#mbAdminSidebar"
              aria-label="Abrir menu do painel"
            >
              <i className="icon icon-sidebar" aria-hidden />
              <span className="text-sm fw-medium">Menu</span>
            </button>
          </div>
          <div className="main-content-account">
            <div className="sidebar-account-wrap sidebar-content-wrap sticky-top d-lg-block d-none">
              <ul className="my-account-nav">
                <AdminSidebar />
              </ul>
            </div>
            <div className="my-acount-content">
              <AdminQuickNav />
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas offcanvas-start canvas-filter canvas-sidebar canvas-sidebar-account" id="mbAdminSidebar" tabIndex={-1}>
        <div className="canvas-wrapper">
          <div className="canvas-header">
            <span className="title">Menu do painel</span>
            <button className="icon-close icon-close-popup" data-bs-dismiss="offcanvas" type="button" aria-label="Fechar" />
          </div>
          <div className="canvas-body">
            <div className="sidebar-account-wrap sidebar-mobile-append">
              <ul className="my-account-nav">
                <AdminSidebar />
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </>
  );
}
