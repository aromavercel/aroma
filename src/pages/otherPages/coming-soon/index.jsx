import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import React from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "@/components/common/Countdown";
import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Em breve | Aroma",
  description: "Esta página estará disponível em breve.",
};
export default function CommingSoonPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <section className="s-coming-soon">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wg-coming-soon">
                <p className="title text-center">Em breve!</p>
                <p className="text-md sub text-main text-center">
                  Esta página estará disponível em breve. Enquanto isso,
                  <br />
                  você pode voltar para o início.
                </p>
                <div className="wg-countdown">
                  <span className="js-countdown">
                    <CountdownTimer style={2} />
                  </span>
                </div>
                <div className="form-email-wrap">
                  <form
                    action="#"
                    className="form-newsletter"
                    method="post"
                    acceptCharset="utf-8"
                    data-mailchimp="true"
                  >
                    <div className="subscribe-content">
                      <fieldset className="email">
                        <input
                          type="email"
                          name="email-form"
                          className="subscribe-email"
                          placeholder="Seu e-mail"
                          tabIndex={0}
                          aria-required="true"
                          required=""
                        />
                      </fieldset>
                      <div className="button-submit">
                        <button className="tf-btn animate-btn" type="submit">
                          <span className="text-sm">Avise-me</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="bot">
                  <Link
                    to={`/`}
                    className="tf-btn btn-fill hover-primary animate-btn"
                  >
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
