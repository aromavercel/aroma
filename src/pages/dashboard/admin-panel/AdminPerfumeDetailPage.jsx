import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPerfumeById, deletePerfume } from "@/api/perfumes";
import { getPerfumeDisplayData, getPerfumeAllImages } from "@/data/perfumes";
import PerfumeFormModal from "@/components/catalog/PerfumeFormModal";

export default function AdminPerfumeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [perfume, setPerfume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getPerfumeById(id)
      .then(setPerfume)
      .catch((err) => setError(err.message || "Erro ao carregar"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!perfume?.id) return;
    if (!window.confirm("Excluir este item do catálogo? Esta ação não pode ser desfeita.")) return;
    setDeleting(true);
    try {
      await deletePerfume(perfume.id);
      navigate("/painel/catalogo");
    } catch (err) {
      window.alert(err.message || "Erro ao excluir");
    } finally {
      setDeleting(false);
    }
  };

  const handleSaved = () => {
    setFormModalOpen(false);
    getPerfumeById(id).then(setPerfume).catch(() => {});
  };

  if (loading) {
    return (
      <div className="account-dashboard">
        <p className="text-muted">Carregando...</p>
      </div>
    );
  }
  if (error || !perfume) {
    return (
      <div className="account-dashboard">
        <p className="text-muted">{error || "Item não encontrado."}</p>
        <Link to="/painel/catalogo" className="btn btn-outline-primary mt-2">Voltar ao catálogo</Link>
      </div>
    );
  }

  const d = getPerfumeDisplayData(perfume);
  const images = getPerfumeAllImages(perfume);
  const notes = perfume.notes || {};
  const variants = perfume.variants || [];
  const variantsWithPrice = variants.filter((v) => v.price_short != null || v.option0 != null);
  const mainImage = images[0];

  return (
    <>
      <div className="account-dashboard">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <Link to="/painel/catalogo" className="text-sm link fw-medium text-main-2">Voltar ao catálogo</Link>
          <div className="d-flex gap-2">
            <button type="button" className="subscribe-button tf-btn animate-btn bg-dark-2 text-white" onClick={() => setFormModalOpen(true)}>Editar</button>
            <button type="button" className="btn btn-outline-danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Excluindo…" : "Excluir"}
            </button>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-12 col-md-5">
            <div className="bg-light rounded d-flex align-items-center justify-content-center mb-3 overflow-hidden" style={{ minHeight: 320, aspectRatio: "1" }}>
              {mainImage ? (
                <img src={mainImage} alt={d.title} className="img-fluid" style={{ objectFit: "contain", maxHeight: 320 }} />
              ) : (
                <span className="icon icon-user text-muted" style={{ fontSize: "4rem" }} />
              )}
            </div>
            {images.length > 1 && (
              <div className="d-flex gap-2 flex-wrap">
                {images.map((src, i) => (
                  <img key={i} src={src} alt="" className="border rounded" style={{ width: 56, height: 56, objectFit: "contain" }} />
                ))}
              </div>
            )}
          </div>
          <div className="col-12 col-md-7">
            {d.catalogLabel && <span className="badge bg-primary mb-2">{d.catalogLabel}</span>}
            <h4 className="product-name mb-2">{d.title}</h4>
            <p className="price-wrap fw-medium text-primary fs-5 mb-3">{d.priceShort}</p>
            {d.description && <p className="text-main-2 mb-3">{d.description}</p>}
            {(notes.top?.length || notes.heart?.length || notes.base?.length) ? (
              <div className="mb-3">
                <h6 className="text-main-2 mb-2">Notas</h6>
                {notes.top?.length > 0 && <p className="text-sm mb-1"><strong>Topo:</strong> {notes.top.join(", ")}</p>}
                {notes.heart?.length > 0 && <p className="text-sm mb-1"><strong>Coração:</strong> {notes.heart.join(", ")}</p>}
                {notes.base?.length > 0 && <p className="text-sm mb-1"><strong>Base:</strong> {Array.isArray(notes.base) ? notes.base.join(", ") : notes.base}</p>}
              </div>
            ) : null}
            {variantsWithPrice.length > 0 && (
              <div className="mb-4">
                <h6 className="text-main-2 mb-2">Opções</h6>
                <ul className="list-unstyled text-sm">
                  {variantsWithPrice.slice(0, 10).map((v, i) => (
                    <li key={i} className="d-flex justify-content-between py-1">
                      <span>{v.option0 || "—"}</span>
                      <span>{v.price_short || ""}</span>
                    </li>
                  ))}
                  {variantsWithPrice.length > 10 && <li className="text-muted">+ {variantsWithPrice.length - 10} opções</li>}
                </ul>
              </div>
            )}
            <Link to={`/perfume/${perfume.id}`} className="subscribe-button tf-btn animate-btn bg-dark-2 text-white text-decoration-none d-inline-flex align-items-center">
              <span className="icon icon-cart2 me-2" />Ver na loja
            </Link>
          </div>
        </div>
      </div>
      <PerfumeFormModal perfume={formModalOpen ? perfume : undefined} onClose={() => setFormModalOpen(false)} onSaved={handleSaved} />
    </>
  );
}
