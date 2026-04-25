import React from "react";
import { Link } from "react-router-dom";
export default function Faqs() {
  return (
    <section className="s-faq flat-spacing-13">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="sb-contact">
              <p className="title">Fale Conosco</p>
              <p className="sub">
                Se você tiver uma dúvida ou problema que precise de atendimento
                imediato, clique no botão abaixo para falar ao vivo com um
                representante de atendimento ao cliente.
              </p>
              <p className="sub">
                Aguarde de 6 a 12 dias úteis a partir do recebimento do pacote
                em nosso centro de distribuição para que o reembolso seja
                processado.
              </p>
              <div className="btn-group">
                <Link
                  to={`/contato`}
                  className="tf-btn btn-fill hover-primary"
                >
                  Fale conosco
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <ul className="faq-list">
              <li className="faq-item">
                <p className="name-faq">Informações de Compra</p>
                <div className="faq-wrap" id="accordionShoping">
                  <div className="widget-accordion">
                    <div
                      className="accordion-title"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      role="button"
                    >
                      <span>Quanto tempo leva para o meu pedido ser enviado?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionShoping"
                    >
                      <div className="accordion-body widget-desc">
                        <p>
                          O prazo de envio é de até 2 dias úteis após a
                          confirmação do pagamento. Você receberá um e-mail com
                          o código de rastreamento assim que o pedido for
                          despachado.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                      role="button"
                    >
                      <span>Vocês oferecem frete grátis?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionShoping"
                    >
                      <div className="accordion-body widget-material">
                        <p>
                          Sim. Para pedidos acima do valor mínimo (consulte a
                          página do produto), o frete é grátis para várias
                          regiões do Brasil. As condições são exibidas no
                          carrinho antes de finalizar a compra.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                      role="button"
                    >
                      <span>
                        Posso alterar o endereço de entrega após fazer o pedido?
                      </span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionShoping"
                    >
                      <div className="accordion-body">
                        <p>
                          Entre em contato conosco o mais rápido possível. Se o
                          pedido ainda não tiver sido enviado, podemos alterar o
                          endereço de entrega. Após o envio, não é possível
                          modificar o endereço.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                      role="button"
                    >
                      <span>E se meu pacote atrasar ou for extraviado?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseFour"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#accordionShoping"
                    >
                      <div className="accordion-body">
                        <p>
                          Entre em contato com nosso atendimento informando o
                          número do pedido. Acompanhamos a entrega e ajudamos a
                          resolver com os Correios ou transportadora. Em caso
                          de extravio comprovado, reenviamos o pedido ou
                          reembolsamos o valor.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="faq-item">
                <p className="name-faq">Informações de Pagamento</p>
                <div className="faq-wrap" id="accordionPayment">
                  <div className="widget-accordion">
                    <div
                      className="accordion-title"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsePaymentOne"
                      aria-expanded="true"
                      aria-controls="collapsePaymentOne"
                      role="button"
                    >
                      <span>Quais formas de pagamento são aceitas?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapsePaymentOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionPayment"
                    >
                      <div className="accordion-body widget-desc">
                        <p>
                          Aceitamos cartão de crédito, cartão de débito, PIX e
                          boleto bancário. Todas as transações são processadas
                          em ambiente seguro.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsePaymentTwo"
                      aria-expanded="false"
                      aria-controls="collapsePaymentTwo"
                      role="button"
                    >
                      <span>É seguro informar meus dados de pagamento?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapsePaymentTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionPayment"
                    >
                      <div className="accordion-body widget-material">
                        <p>
                          Não solicitamos dados de pagamento no site. 
                          O pagamento do seu pedido é feito no ato da entrega.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsePaymentThree"
                      aria-expanded="false"
                      aria-controls="collapsePaymentThree"
                      role="button"
                    >
                      <span>Posso parcelar minha compra?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapsePaymentThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionPayment"
                    >
                      <div className="accordion-body">
                        <p>
                          Sim. No cartão de crédito é possível parcelar em até
                          12x, conforme disponibilidade do seu cartão. Condições
                          sem juros são exibidas no checkout.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="faq-item">
                <p className="name-faq">Devolução e Troca</p>
                <div className="faq-wrap" id="accordionExchange">
                  <div className="widget-accordion">
                    <div
                      className="accordion-title"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExchangeOne"
                      aria-expanded="true"
                      aria-controls="collapseExchangeOne"
                      role="button"
                    >
                      <span>Qual é a política de devolução?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseExchangeOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExchange"
                    >
                      <div className="accordion-body widget-desc">
                        <p>
                          Aceitamos devoluções em até 14 dias após o
                          recebimento. Os itens devem estar sem uso, sem
                          lavagem e na embalagem original.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExchangeTwo"
                      aria-expanded="false"
                      aria-controls="collapseExchangeTwo"
                      role="button"
                    >
                      <span>Como devolvo um item?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseExchangeTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExchange"
                    >
                      <div className="accordion-body widget-material">
                        <p>
                          Entre em contato com nosso atendimento para obter a
                          autorização de devolução. Enviaremos as instruções e
                          o procedimento para o envio do produto de volta.</p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExchangeThree"
                      aria-expanded="false"
                      aria-controls="collapseExchangeThree"
                      role="button"
                    >
                      <span>Há itens que não podem ser devolvidos?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseExchangeThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExchange"
                    >
                      <div className="accordion-body">
                        <p>
                          Sim. Produtos em promoção relâmpago, itens
                          personalizados e itens específicos, 
                          exceto em caso de defeito.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExchangeFour"
                      aria-expanded="false"
                      aria-controls="collapseExchangeFour"
                      role="button"
                    >
                      <span>Quando receberei meu reembolso?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseExchangeFour"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#accordionExchange"
                    >
                      <div className="accordion-body">
                        <p>
                          Após o recebimento e a análise do produto devolvido,
                          processamos o reembolso em 5 a 7 dias úteis. O valor
                          será creditado na mesma forma de pagamento utilizada.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
