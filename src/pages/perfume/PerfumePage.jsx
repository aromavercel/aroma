import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import Breadcumb from "@/components/productDetails/Breadcumb";
import MetaComponent from "@/components/common/MetaComponent";
import PerfumeGallery from "@/components/perfume/PerfumeGallery";
import PerfumeDetailInfo from "@/components/perfume/PerfumeDetailInfo";
import PerfumeDescription from "@/components/perfume/PerfumeDescription";
import Features from "@/components/products/Features";
import { getPerfumeById } from "@/api/perfumes";
import { getPerfumeDisplayData, getPerfumeAllImages } from "@/data/perfumes";
import Skeleton from "@/components/common/Skeleton";

export default function PerfumePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [perfume, setPerfume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getPerfumeById(id)
      .then(setPerfume)
      .catch((err) => setError(err.message || "Erro ao carregar"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id || !perfume) return;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const isUuid = uuidRegex.test(String(id).trim());
    const slug = typeof perfume.slug === "string" ? perfume.slug.trim() : "";
    if (isUuid && slug) {
      navigate(`/perfume/${slug}`, { replace: true });
    }
  }, [id, perfume, navigate]);

  if (loading) {
    return (
      <>
        <Topbar />
        <Header1 />
        <Breadcumb product={{ title: "Perfume" }} backLink="/catalogo" />
        <section className="tf-section">
          <div className="container">
            <div className="row py-4">
              <div className="col-md-6 mb-4 mb-md-0">
                <Skeleton style={{ width: "100%", height: 420 }} />
                <div className="d-flex gap-2 mt-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={`thumb-${i}`} style={{ width: 70, height: 70 }} />
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <Skeleton variant="text" style={{ width: "60%", height: 16, marginBottom: 14 }} />
                <Skeleton variant="text" style={{ width: "40%", height: 14, marginBottom: 18 }} />
                <Skeleton style={{ width: "100%", height: 44, marginBottom: 10 }} />
                <Skeleton style={{ width: "100%", height: 44, marginBottom: 10 }} />
                <Skeleton style={{ width: "80%", height: 44, marginBottom: 18 }} />
                <Skeleton style={{ width: "100%", height: 140 }} />
              </div>
            </div>
          </div>
        </section>
        <Footer1 />
      </>
    );
  }
  if (error || !perfume) {
    return (
      <>
        <Topbar />
        <Header1 />
        <Breadcumb product={{ title: "Perfume" }} backLink="/catalogo" />
        <section className="tf-section">
          <div className="container">
            <p className="text-muted text-center py-5">{error || "Perfume não encontrado."}</p>
            <p className="text-center">
              <Link to="/catalogo" className="btn btn-outline-primary">
                Voltar ao catálogo
              </Link>
            </p>
          </div>
        </section>
        <Footer1 />
      </>
    );
  }

  const d = getPerfumeDisplayData(perfume);
  const images = getPerfumeAllImages(perfume);
  const notes = perfume.notes || {};
  const variants = perfume.variants || [];
  const variantsWithPrice = variants.filter((v) => v.price_short != null || v.option0 != null);
  const mainImage = images[0];

  const metadata = {
    title: `${d.title} | Aroma`,
    description: d.description || `Perfume ${d.title} no catálogo Aroma.`,
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <Breadcumb product={{ title: d.title }} backLink="/catalogo" />

      <section className="flat-single-product flat-single-product-perfume">
        <div className="tf-main-product section-image-zoom">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="tf-product-media-wrap sticky-top">
                  <div className="product-thumbs-slider">
                    <PerfumeGallery images={images} alt={d.title} />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="tf-zoom-main" />
                <div className="tf-product-info-wrap position-relative">
                  <PerfumeDetailInfo
                    perfume={perfume}
                    displayData={d}
                    variantsWithPrice={variantsWithPrice}
                    mainImage={mainImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PerfumeDescription
        description={d.description}
        notes={notes}
        variantsWithPrice={variantsWithPrice}
      />

      <Features />
      <Footer1 />
    </>
  );
}
