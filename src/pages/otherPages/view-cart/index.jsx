import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import RelatedProducts from "@/components/otherPages/RelatedProducts";
import ShopCart from "@/components/otherPages/ShopCart";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import Breadcumb from "@/components/common/Breadcumb";
import { useContextElement } from "@/context/Context";
import Skeleton from "@/components/common/Skeleton";

const metadata = {
  title: "Carrinho | Aroma Expresso",
  description: "Carrinho de compras Aroma Expresso",
};

const FREIGHT_FREE_THRESHOLD = 250;

export default function ViewCartPage() {
  const { totalPrice, cartLoading } = useContextElement();
  const progress = Math.min(100, Math.max(0, ((Number(totalPrice) || 0) / FREIGHT_FREE_THRESHOLD) * 100));

  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <>
        <Breadcumb pageName="Carrinho" pageTitle="Carrinho de compras" />

        {/* /Title Page */}
        <div className="flat-spacing-24">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-4 col-sm-8">
                <div className="tf-cart-head text-center">
                  {cartLoading ? (
                    <div className="py-2">
                      <Skeleton variant="text" style={{ width: "90%", height: 18, margin: "0 auto 10px" }} />
                      <Skeleton style={{ width: "100%", height: 8, borderRadius: 999 }} />
                    </div>
                  ) : (
                    <>
                      <p className="text-xl-3 title text-dark-4">
                        Gaste <span className="fw-medium">R$250,00</span> ou mais para ganhar{" "}
                        <span className="fw-medium">Frete Grátis</span>
                      </p>
                      <div className="progress-sold tf-progress-ship">
                        <div className="value" style={{ width: `${progress}%` }} data-progress={Math.round(progress)}>
                          <i className="icon icon-car" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <ShopCart />
      {/* <RelatedProducts /> */}
      <Footer1 />
    </>
  );
}
