import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import React from "react";
import { Link } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Página não encontrada | Aroma",
  description: "A página que você tentou acessar não existe.",
};
export default function NotFoundPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <section className="flat-spacing">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wg-404">
                <div className="image">
                  <img
                    src="/images/banner/404.png"
                    data-=""
                    alt={404}
                    className="lazyload"
                    width={472}
                    height={472}
                  />
                </div>
                <p className="title">Ops!</p>
                <p className="text-md sub text-main">
                  Não encontramos a página que você estava procurando.
                </p>
                <div className="bot">
                  <Link to={`/`} className="tf-btn btn-fill animate-btn">
                    Voltar para o início
                  </Link>
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
