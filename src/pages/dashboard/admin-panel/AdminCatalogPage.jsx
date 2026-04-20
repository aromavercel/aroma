import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PerfumeFormModal from "@/components/catalog/PerfumeFormModal";
import { getPerfumesList, deletePerfume } from "@/api/perfumes";
import { getPerfumeDisplayData } from "@/data/perfumes";
import Skeleton from "@/components/common/Skeleton";

export default function AdminCatalogPage() {
  const navigate = useNavigate();
  const [perfumesList, setPerfumesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [formModalPerfume, setFormModalPerfume] = useState(undefined);
  const [deletingId, setDeletingId] = useState(null);

  const loadPerfumes = useCallback(() => {
    setLoading(true);
    setLoadError(null);
    getPerfumesList({ all: true })
      .then(setPerfumesList)
      .catch((err) => setLoadError(err.message || "Erro ao carregar catálogo."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadPerfumes(); }, [loadPerfumes]);

  const handleDelete = useCallback(async (perfume, e) => {
    if (e) e.stopPropagation();
    const id = perfume?.id;
    if (!id) return;
    if (!window.confirm("Excluir este item do catálogo? Esta ação não pode ser desfeita.")) return;
    setDeletingId(id);
    try {
      await deletePerfume(id);
      loadPerfumes();
    } catch (err) {
      window.alert(err.message || "Erro ao excluir");
    } finally {
      setDeletingId(null);
    }
  }, [loadPerfumes]);

  const openAdd = () => setFormModalPerfume(null);
  const openEdit = (perfume, e) => {
    if (e) e.stopPropagation();
    setFormModalPerfume(perfume);
  };
  const closeForm = () => setFormModalPerfume(undefined);
  const openDetail = (perfume) => navigate(`/painel/catalogo/${perfume.id}`);

  return (
    <>
      <div className="account-dashboard">
        <h5 className="title-account mb-3">Catálogo de perfumes</h5>
        <p className="text-muted mb-4">Clique em um item para ver os detalhes. Use Editar ou Excluir na linha.</p>
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <span className="text-sm text-main-2">{perfumesList.length} itens</span>
          <button
            type="button"
            className="subscribe-button tf-btn animate-btn bg-dark-2 text-white"
            onClick={openAdd}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, lineHeight: 1 }}
          >
            {/* <span
              className="icon icon-plus"
              style={{ fontSize: "20px", lineHeight: 1, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
            /> */}
            <span style={{ lineHeight: 1 }}>Adicionar item</span>
          </button>
        </div>

        {loading ? (
          <div className="py-4">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: 60 }}>Imagem</th>
                    <th>Título</th>
                    <th>Catálogo</th>
                    <th>Status</th>
                    <th className="text-end" style={{ width: 160 }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <tr key={`sk-row-${idx}`}>
                      <td>
                        <Skeleton style={{ width: 56, height: 56 }} />
                      </td>
                      <td>
                        <Skeleton variant="text" style={{ width: "65%", marginBottom: 8 }} />
                        <Skeleton variant="text" style={{ width: "35%" }} />
                      </td>
                      <td><Skeleton variant="text" style={{ width: 90, height: 14 }} /></td>
                      <td><Skeleton variant="text" style={{ width: 120, height: 14 }} /></td>
                      <td className="text-end">
                        <Skeleton style={{ width: 70, height: 32, display: "inline-block", marginRight: 8 }} />
                        <Skeleton style={{ width: 70, height: 32, display: "inline-block" }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : loadError ? (
          <div className="text-center py-5">
            <p className="text-muted">{loadError}</p>
            <button type="button" className="btn btn-outline-primary mt-2" onClick={loadPerfumes}>Tentar novamente</button>
          </div>
        ) : perfumesList.length === 0 ? (
          <div className="p-4 rounded bg-light text-center">
            <p className="text-muted mb-3">Nenhum item no catálogo ainda.</p>
            <button type="button" className="subscribe-button tf-btn animate-btn bg-dark-2 text-white" onClick={openAdd}>Adicionar primeiro item</button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: 60 }}>Imagem</th>
                  <th>Título</th>
                  <th>Catálogo</th>
                  <th>Status</th>
                  <th className="text-end" style={{ width: 160 }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {perfumesList.map((perfume, i) => {
                  const d = getPerfumeDisplayData(perfume);
                  return (
                    <tr key={perfume.id ?? `p-${i}`} role="button" tabIndex={0} onClick={() => openDetail(perfume)} onKeyDown={(e) => e.key === "Enter" && openDetail(perfume)} style={{ cursor: "pointer" }}>
                      <td>
                        <div className="bg-light rounded overflow-hidden d-flex align-items-center justify-content-center" style={{ width: 56, height: 56 }}>
                          {d.imageUrl ? <img src={d.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} /> : <span className="icon icon-user text-muted" style={{ fontSize: "1.5rem" }} />}
                        </div>
                      </td>
                      <td className="fw-medium">{d.title || "—"}</td>
                      <td><span className="badge bg-primary">{d.catalogLabel || d.catalogSource || "—"}</span></td>
                      <td>
                        <span className={`badge me-1 ${perfume.ativo !== false ? "bg-success" : "bg-secondary"}`}>{perfume.ativo !== false ? "Ativo" : "Inativo"}</span>
                        {perfume.esgotado === true && <span className="badge bg-warning text-dark">Esgotado</span>}
                      </td>
                      <td className="text-end" onClick={(e) => e.stopPropagation()}>
                        <button type="button" className="btn btn-sm btn-outline-dark me-1" onClick={(e) => openEdit(perfume, e)}>Editar</button>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={(e) => handleDelete(perfume, e)} disabled={deletingId === perfume.id}>
                          {deletingId === perfume.id ? "Excluindo…" : "Excluir"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <PerfumeFormModal perfume={formModalPerfume} onClose={closeForm} onSaved={loadPerfumes} />
    </>
  );
}
