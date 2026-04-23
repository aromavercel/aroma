import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import Breadcumb from "@/components/common/Breadcumb";

const metadata = {
  title: "Sobre nós | Aroma Expresso",
  description:
    "Conheça a história da Aroma Expresso, a curadoria de perfumes importados e árabes e o motivo de sermos apaixonados por fragrâncias.",
};

export default function AboutUsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <Breadcumb pageName="Sobre nós" pageTitle="Nossa história" />
      <main>
        <section className="flat-spacing-3 pt-0">
          <div className="container">
            <div className="row align-items-center g-4">
              <div className="col-md-6">
                <h1 className="display-5 fw-medium mb-3 text-main-2 mt-4">
                  Perfume não é só cheiro. É história.
                </h1>
                <p className="text-main mb-3">
                  A <strong>Aroma Expresso</strong> nasceu da vontade de facilitar o
                  acesso aos melhores perfumes do mundo — com transparência,
                  curadoria e experiência premium, mas sem complicação.
                </p>
                <p className="text-main mb-4">
                  Somos obcecados por detalhes: projeção, fixação, lote, origem.
                  Cada fragrância é escolhida à mão para que você receba em casa
                  apenas o que realmente vale a pena ter na coleção.
                </p>
              </div>
              <div className="col-md-6">
                <div className="position-relative overflow-hidden rounded-4 shadow-sm">
                  <img
                    src="/images/banner/fashion-1.jpg"
                    alt="Perfumes da Aroma Expresso"
                    className="w-100"
                    style={{ maxHeight: 420, objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flat-spacing-3 pt-0">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="p-4 rounded-4 bg-light h-100">
                  <h3 className="h5 fw-medium mb-2">Curadoria especializada</h3>
                  <p className="text-main mb-0">
                    Selecionamos a dedo perfumes árabes e importados que entregam
                    performance real — nada de catálogo inflado com mais do mesmo.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4 rounded-4 bg-light h-100">
                  <h3 className="h5 fw-medium mb-2">Transparência em cada frasco</h3>
                  <p className="text-main mb-0">
                    Informação clara sobre desempenho, notes e referência olfativa,
                    para você comprar com segurança e consciência.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4 rounded-4 bg-light h-100">
                  <h3 className="h5 fw-medium mb-2">Experiência sem atrito</h3>
                  <p className="text-main mb-0">
                    Site rápido, catálogo organizado e suporte humano. Do clique à
                    entrega, pensamos na experiência que gostaríamos de ter como
                    clientes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flat-spacing-3 pt-0">
          <div className="container">
            <div className="row align-items-center g-4 flex-md-row-reverse">
              <div className="col-md-6">
                <div className="position-relative overflow-hidden rounded-4 shadow-sm">
                  <img
                    src="/images/about/sobre-nos-perfume.png"
                    alt="Detalhe de frasco de perfume"
                    className="w-100"
                    style={{ maxHeight: 420, objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h2 className="h3 fw-medium mb-3 text-main-2">
                  Perfumes que contam quem você é.
                </h2>
                <p className="text-main mb-3">
                  Acreditamos que fragrâncias são uma forma de assinatura pessoal.
                  Por isso, nosso catálogo é pensado para diferentes perfis: do
                  entusiasta que está começando até o colecionador que busca algo
                  realmente único.
                </p>
                <p className="text-main mb-0">
                  Queremos que cada escolha seja consciente: você sabe o que está
                  comprando, por que vale a pena e como aquele perfume se encaixa na
                  sua rotina.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flat-spacing-3 pt-0">
          <div className="container">
            <div className="bg-dark-2 text-white rounded-4 p-4 p-md-5 d-md-flex align-items-center justify-content-between gap-3">
              <div>
                <h2 className="h3 fw-medium mb-2">Pronto para descobrir seu próximo perfume favorito?</h2>
                <p className="mb-0 text-main">
                  Explore o catálogo da Aroma Expresso e encontre fragrâncias que
                  combinam com a sua história.
                </p>
              </div>
              <a
                href="/catalogo"
                className="tf-btn btn-white hover-primary mt-3 mt-md-0"
              >
                Ver catálogo
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer1 />
    </>
  );
}
