import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import MetaComponent from "@/components/common/MetaComponent";
import Breadcumb from "@/components/common/Breadcumb";

const metadata = {
  title: "Pedido recebido | Aroma",
  description: "Obrigado pelo seu pedido.",
};

export default function ThankYouPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <Breadcumb pageName="Obrigado" pageTitle="Pedido recebido" />
      <section className="flat-spacing-25 thankyou-page">
        <div className="container">
          <div className="thankyou-wrap">
            <div className="thankyou-card">
              <div className="thankyou-badge" aria-hidden="true">
                <i className="icon icon-check" />
              </div>
              <div className="thankyou-content">
                <h1 className="mb-2">Seu pedido foi realizado com sucesso!</h1>
                <p className="text-main mb-4">
                  Em breve, nossa equipe entrará em contato para confirmar os dados da entrega e finalizar a validação do pedido.
                </p>

                <div className="thankyou-important">
                  <div className="title text-lg fw-medium mb-2">Importante</div>
                  <ul className="text-main mb-0">
                    <li>A confirmação é necessária para dar andamento ao envio.</li>
                    <li>O pagamento será realizado no momento do recebimento.</li>
                    <li>Fique atento ao telefone ou WhatsApp informado no pedido.</li>
                    <li>Caso não consigamos contato, o pedido poderá ser cancelado automaticamente.</li>
                  </ul>
                </div>

                <div className="thankyou-actions">
                  <Link to="/catalogo" className="tf-btn btn-dark2 animate-btn">
                    Ver catálogo
                  </Link>
                  <Link to="/account-orders" className="tf-btn btn-out-line-dark2">
                    Meus pedidos
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
