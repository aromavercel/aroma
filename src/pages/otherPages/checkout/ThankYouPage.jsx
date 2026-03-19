import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import { Link } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";

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
      <div className="tf-breadcrumb">
        <div className="container">
          <ul className="breadcrumb-list">
            <li className="item-breadcrumb">
              <Link to="/" className="text">Home</Link>
            </li>
            <li className="item-breadcrumb dot"><span /></li>
            <li className="item-breadcrumb">
              <span className="text">Checkout</span>
            </li>
            <li className="item-breadcrumb dot"><span /></li>
            <li className="item-breadcrumb">
              <span className="text">Obrigado</span>
            </li>
          </ul>
        </div>
      </div>
      <section className="flat-spacing-25">
        <div className="container">
          <div className="text-center py-5">
            <h1 className="mb-3">Pedido recebido</h1>
            <p className="text-main mb-4">
              Obrigado pela sua compra. Seu pedido foi registrado e em breve entraremos em contato.
            </p>
            <Link to="/shop-default" className="tf-btn btn-dark2 animate-btn">
              Continuar comprando
            </Link>
          </div>
        </div>
      </section>
      <Footer1 />
    </>
  );
}
