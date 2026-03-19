import Footer1 from "@/components/footers/Footer1";
import Header from "@/components/headers/Header";
import Topbar from "@/components/headers/Topbar";
import Banner from "@/components/homes/home-1/Banner";
import Brands from "@/components/common/Brands2";
import Categories from "@/components/homes/home-1/Categories";
import Collections from "@/components/homes/home-1/Collections";
import Features from "@/components/homes/home-1/Features";
import Hero from "@/components/homes/home-1/Hero";
import Products from "@/components/homes/home-1/Products";
import Products2 from "@/components/homes/home-1/Products2";
import Shopgram from "@/components/homes/home-1/Shopgram";
import Testimonials from "@/components/homes/home-1/Testimonials";
import Newsletter from "@/components/modals/Newsletter";
import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Aroma Expresso",
  description:
    "Aroma Expresso, a primeira loja de perfume com modelo de negócio pague ao receber em Feira de Santana",
};

export default function HomePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header />
      <Hero />
      <Features />
      <Banner />
      <Testimonials />
      <Footer1 />
      {/* <Newsletter /> */}
    </>
  );
}
