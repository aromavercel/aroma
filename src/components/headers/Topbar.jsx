import React from "react";
import AromaSocialIcons from "@/components/common/AromaSocialIcons";
import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";

export default function Topbar1() {
  return (
    <div className="tf-topbar bg-dark-5 topbar-bg">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-2 col-xl-3 d-none d-lg-block">
            <AromaSocialIcons className="topbar-left tf-social-icon" />
          </div>
          <div className="col-lg-7 col-xl-6 overflow-hidden">
            <div className="topbar-center marquee-wrapper">
              <div className="initial-child-container">
                <div className="marquee-child-item">
                  <p>Pague apenas ao receber</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Produtos originais</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Frete grátis a partir de R$250,00</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                {/* 2 */}
                <div className="marquee-child-item">
                  <p>Pague apenas ao receber</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Produtos originais</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Frete grátis a partir de R$250,00</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                {/* 3 */}
                <div className="marquee-child-item">
                  <p>Pague apenas ao receber</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Produtos originais</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Frete grátis a partir de R$250,00</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                {/* 4 */}
                <div className="marquee-child-item">
                  <p>Pague apenas ao receber</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Produtos originais</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Frete grátis a partir de R$250,00</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                {/* 5 */}
                <div className="marquee-child-item">
                  <p>Pague apenas ao receber</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Produtos originais</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Frete grátis a partir de R$250,00</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="topbar-right">
              <div className="tf-currencies d-none d-lg-block">
                <CurrencySelect topStart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
