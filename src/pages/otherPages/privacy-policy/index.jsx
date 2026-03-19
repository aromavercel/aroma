import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";
import { Link } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Política de Privacidade || Aroma Express",
  description: "Política de Privacidade do Aroma Express - Saiba como usamos e protegemos seus dados.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar1 />
      <Header1 />
      <>
        {/* Breadcrumb */}
        <div className="tf-breadcrumb">
          <div className="container">
            <ul className="breadcrumb-list">
              <li className="item-breadcrumb">
                <Link to={`/`} className="text">
                  Início
                </Link>
              </li>
              <li className="item-breadcrumb dot">
                <span />
              </li>
              <li className="item-breadcrumb">
                <span className="text">Política de Privacidade</span>
              </li>
            </ul>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Title Page */}
        <section className="s-title-page">
          <div className="container">
            <h4 className="s-title letter-0 text-center">Política de Privacidade</h4>
          </div>
        </section>
        {/* /Title Page */}
        {/* Privacy policy */}
        <section className="s-term-user flat-spacing-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="content">
                  <div className="term-item">
                    <p className="term-title">1. Informações que Coletamos</p>
                    <div className="text-wrap">
                      <p className="term-text">
                        Quando você visita o site, coletamos automaticamente
                        certas informações sobre seu dispositivo, incluindo
                        informações sobre seu navegador, endereço IP, fuso
                        horário e alguns dos cookies instalados no seu
                        dispositivo. Além disso, conforme você navega, coletamos
                        informações sobre as páginas ou produtos que você
                        visualiza, quais sites ou termos de busca o trouxeram ao
                        site e como você interage com ele. Chamamos essas
                        informações de &quot;Informações do Dispositivo&quot;.
                      </p>
                      <p className="term-text">
                        Coletamos Informações do Dispositivo por meio das
                        seguintes tecnologias:
                      </p>
                      <p className="term-text">
                        <strong>Cookies:</strong> arquivos de dados colocados no
                        seu dispositivo ou computador, frequentemente com um
                        identificador único anônimo. Para mais informações sobre
                        cookies e como desativá-los, consulte as configurações
                        do seu navegador. <br />
                        <strong>Arquivos de log:</strong> registram ações no
                        site e coletam dados como endereço IP, tipo de
                        navegador, provedor de internet, páginas de
                        referência/saída e data/hora. <strong>Web beacons,
                        tags e pixels</strong> são arquivos eletrônicos usados
                        para registrar como você navega no site. Além disso,
                        quando você faz ou tenta fazer uma compra, coletamos
                        nome, endereço de entrega e
                        informações como
                        e-mail e telefone. Chamamos isso de &quot;Informações
                        do Pedido&quot;.
                      </p>
                    </div>
                  </div>
                  <div className="term-item">
                    <p className="term-title">2. Como Usamos Suas Informações</p>
                    <div className="text-wrap">
                      <p className="term-text">
                        Usamos as Informações do Pedido para cumprir seus pedidos
                        (organização de envio,
                        emissão de faturas e confirmações). Além disso, usamos
                        essas informações para:
                      </p>
                      <p className="term-text">
                        Comunicar-nos com você; <br />
                        Analisar pedidos para risco ou fraude; <br />
                        Enviar informações ou ofertas sobre nossos produtos ou
                        serviços, de acordo com as preferências que você nos
                        informou.
                      </p>
                      <p className="term-text">
                        Usamos as Informações do Dispositivo para ajudar a
                        identificar risco e fraude (em especial o endereço IP) e
                        para melhorar e otimizar o site (por exemplo, análises
                        de como os clientes navegam e avaliação do sucesso de
                        campanhas de marketing).
                      </p>
                    </div>
                  </div>
                  <div className="term-item">
                    <p className="term-title">
                      3. Seus Dados Não São Vendidos nem Repassados a Terceiros
                    </p>
                    <div className="text-wrap">
                      <p className="term-text">
                        <strong>Não vendemos, alugamos nem repassamos seus dados
                        pessoais a terceiros para fins comerciais ou de
                        marketing.</strong> Seus dados são utilizados apenas
                        conforme descrito nesta política e para os fins
                        necessários ao funcionamento do site e ao atendimento
                        dos seus pedidos.
                      </p>
                      <p className="term-text">
                        Podemos utilizar serviços de terceiros estritamente
                        necessários à operação (por exemplo, processamento de
                        pagamento e entrega), que têm acesso apenas aos dados
                        indispensáveis e estão obrigados a protegê-los. Em
                        nenhuma circunstância esses parceiros utilizam seus
                        dados para outros fins ou para revenda.
                      </p>
                      <p className="term-text">
                        Excepcionalmente, podemos divulgar informações para
                        cumprir leis e regulamentos aplicáveis, responder a
                        intimação, mandado ou outra solicitação legal, ou para
                        proteger nossos direitos.
                      </p>
                    </div>
                  </div>
                  <div className="term-item">
                    <p className="term-title">4. Retenção de Dados</p>
                    <p className="term-text">
                      Quando você faz um pedido, mantemos as Informações do
                      Pedido em nossos registros até que você solicite a
                      exclusão desses dados, salvo quando a lei exigir ou
                      permitir um prazo diferente.
                    </p>
                  </div>
                  <div className="term-item">
                    <p className="term-title">5. Seus Direitos</p>
                    <p className="term-text">
                      Você é responsável pela confidencialidade da sua conta e
                      senha e por todas as atividades realizadas em sua conta.
                      De acordo com a Lei Geral de Proteção de Dados (LGPD), você
                      pode solicitar acesso, correção, exclusão ou portabilidade
                      dos seus dados, além de revogar consentimentos. O Aroma
                      Express reserva-se o direito de recusar serviço, encerrar
                      contas ou cancelar pedidos quando necessário. Ao fazer um
                      pedido, você declara ter mais de 18 anos e estar
                      fornecendo informações verdadeiras e precisas, com
                      autoridade para realizá-lo.
                    </p>
                  </div>
                  <div className="term-item">
                    <p className="term-title">6. Alterações</p>
                    <p className="term-text">
                      Podemos atualizar esta política de privacidade
                      periodicamente para refletir mudanças em nossas práticas
                      ou por motivos operacionais, legais ou regulatórios. As
                      alterações passam a valer após a publicação no site.
                    </p>
                  </div>
                  <div className="term-item">
                    <p className="term-title">7. Contato</p>
                    <div className="text-wrap">
                      <p className="term-text">
                        Para mais informações sobre nossas práticas de
                        privacidade, dúvidas ou para registrar uma reclamação,
                        entre em contato por e-mail:
                      </p>
                      <a href="mailto:contato@aromaexpress.com.br" className="link">
                        contato@aromaexpress.com.br
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /Privacy policy */}
      </>

      <Footer1 />
    </>
  );
}
