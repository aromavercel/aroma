import React, { useEffect, useRef, useState } from "react";
import { CATALOG_SOURCE_OPTIONS } from "@/data/perfumes";

const MODAL_ID = "perfumeFormModal";
const CATALOG_SELECT_OPTIONS = CATALOG_SOURCE_OPTIONS;

function notesToForm(notes) {
  const n = notes || {};
  return {
    top: Array.isArray(n.top) ? n.top.join(", ") : (n.top || ""),
    heart: Array.isArray(n.heart) ? n.heart.join(", ") : (n.heart || ""),
    base: Array.isArray(n.base) ? n.base.join(", ") : (n.base || ""),
  };
}

function formToNotes(form) {
  const arr = (s) => (typeof s === "string" ? s.split(",").map((x) => x.trim()).filter(Boolean) : []);
  return { top: arr(form.top), heart: arr(form.heart), base: arr(form.base) };
}

export default function PerfumeFormModal({ perfume, onClose, onSaved }) {
  const modalRef = useRef(null);
  const cleanupRef = useRef(() => {});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    catalog_source: "normal",
    ativo: true,
    esgotado: false,
    notesTop: "",
    notesHeart: "",
    notesBase: "",
    variantsJson: "",
    imagesText: "",
  });

  const isEdit = Boolean(perfume?.id);

  useEffect(() => {
    if (perfume !== undefined) {
      if (perfume) {
        const notes = notesToForm(perfume.notes);
        setForm({
          title: perfume.title || "",
          description: perfume.description || "",
          catalog_source: perfume.catalogSource || "normal",
          ativo: perfume.ativo !== false,
          esgotado: perfume.esgotado === true,
          notesTop: notes.top,
          notesHeart: notes.heart,
          notesBase: notes.base,
          variantsJson: Array.isArray(perfume.variants) && perfume.variants.length > 0 ? JSON.stringify(perfume.variants, null, 2) : "",
          imagesText: Array.isArray(perfume.images) ? perfume.images.join("\n") : "",
        });
      } else {
        setForm({
          title: "",
          description: "",
          catalog_source: "normal",
          ativo: true,
          esgotado: false,
          notesTop: "",
          notesHeart: "",
          notesBase: "",
          variantsJson: "",
          imagesText: "",
        });
      }
      setError("");
    }
  }, [perfume]);

  useEffect(() => {
    if (perfume === undefined) return;
    const el = modalRef.current;
    if (!el || !onClose) return;
    import("bootstrap").then((bootstrap) => {
      if (!modalRef.current) return;
      const instance = bootstrap.Modal.getOrCreateInstance(modalRef.current);
      const handleHidden = () => onClose();
      modalRef.current.addEventListener("hidden.bs.modal", handleHidden);
      cleanupRef.current = () => {
        if (modalRef.current) modalRef.current.removeEventListener("hidden.bs.modal", handleHidden);
      };
      instance.show();
    }).catch(() => {});
    return () => cleanupRef.current();
  }, [perfume, onClose]);

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const title = form.title.trim();
      const catalog_source = form.catalog_source;
      if (!title) { setError("Título é obrigatório."); setSaving(false); return; }
      let variants = [];
      if (form.variantsJson.trim()) {
        try {
          variants = JSON.parse(form.variantsJson);
          if (!Array.isArray(variants)) variants = [];
        } catch {
          setError("Variantes: JSON inválido.");
          setSaving(false);
          return;
        }
      }
      const images = form.imagesText.split("\n").map((s) => s.trim()).filter(Boolean);
      const payload = {
        title,
        description: form.description.trim() || undefined,
        catalog_source,
        ativo: form.ativo,
        esgotado: form.esgotado,
        notes: formToNotes({ top: form.notesTop, heart: form.notesHeart, base: form.notesBase }),
        variants,
        images,
      };
      const { createPerfume, updatePerfume } = await import("@/api/perfumes");
      if (isEdit) await updatePerfume(perfume.id, payload);
      else await createPerfume(payload);
      if (onSaved) onSaved();
      const Bootstrap = (await import("bootstrap")).default;
      const instance = Bootstrap.Modal.getInstance(modalRef.current);
      if (instance) instance.hide();
      onClose();
    } catch (err) {
      setError(err.message || "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  if (perfume === undefined) return null;

  return (
    <div className="modal fade modalCentered" id={MODAL_ID} tabIndex={-1} aria-labelledby="perfumeFormLabel" aria-hidden="true" ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered modal-xl" style={{ maxWidth: "700px" }}>
        <div className="modal-content">
          <button type="button" className="icon-close icon-close-popup" data-bs-dismiss="modal" aria-label="Fechar" />
          <div className="modal-body p-4 p-md-5">
            <h5 id="perfumeFormLabel" className="mb-4">{isEdit ? "Editar item do catálogo" : "Adicionar item ao catálogo"}</h5>
            <form onSubmit={handleSubmit} className="form-login">
              {error && <div className="alert alert-danger py-2 mb-3" role="alert">{error}</div>}
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label text-main-2">Título *</label>
                  <input type="text" className="form-control" value={form.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="Nome do perfume" required />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label text-main-2">Catálogo *</label>
                  <select className="form-select" value={form.catalog_source} onChange={(e) => handleChange("catalog_source", e.target.value)} required>
                    {CATALOG_SELECT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label text-main-2 d-block">Status</label>
                  <div className="d-flex flex-wrap gap-4 align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <div className="tf-checkbox-wrapp">
                        <input
                          type="checkbox"
                          id="form-ativo"
                          checked={Boolean(form.ativo)}
                          onChange={(e) => handleChange("ativo", e.target.checked)}
                        />
                        {/* <div><i className="icon-check" /></div> */}
                      </div>
                      <label className="text-main-2 mb-0" htmlFor="form-ativo">Ativo (visível no catálogo)</label>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <div className="tf-checkbox-wrapp">
                        <input
                          type="checkbox"
                          id="form-esgotado"
                          checked={Boolean(form.esgotado)}
                          onChange={(e) => handleChange("esgotado", e.target.checked)}
                        />
                        {/* <div><i className="icon-check" /></div> */}
                      </div>
                      <label className="text-main-2 mb-0" htmlFor="form-esgotado">Esgotado</label>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label text-main-2">Descrição</label>
                  <textarea className="form-control" rows={3} value={form.description} onChange={(e) => handleChange("description", e.target.value)} placeholder="Descrição opcional" />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label text-main-2">Notas – Topo</label>
                  <input type="text" className="form-control" value={form.notesTop} onChange={(e) => handleChange("notesTop", e.target.value)} placeholder="Ex: Bergamota, Limão" />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label text-main-2">Notas – Coração</label>
                  <input type="text" className="form-control" value={form.notesHeart} onChange={(e) => handleChange("notesHeart", e.target.value)} placeholder="Ex: Rosa, Jasmim" />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label text-main-2">Notas – Base</label>
                  <input type="text" className="form-control" value={form.notesBase} onChange={(e) => handleChange("notesBase", e.target.value)} placeholder="Ex: Musk, Âmbar" />
                </div>
                <div className="col-12">
                  <label className="form-label text-main-2">Variantes (JSON, opcional)</label>
                  <textarea className="form-control font-monospace" rows={4} value={form.variantsJson} onChange={(e) => handleChange("variantsJson", e.target.value)} placeholder='[{"option0": "50ml", "price_short": "R$ 99,90", "image_url": "https://..."}]' />
                </div>
                <div className="col-12">
                  <label className="form-label text-main-2">URLs das imagens (uma por linha)</label>
                  <textarea className="form-control" rows={3} value={form.imagesText} onChange={(e) => handleChange("imagesText", e.target.value)} placeholder="https://exemplo.com/img1.jpg" />
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal" onClick={onClose}>Cancelar</button>
                <button type="submit" className="subscribe-button tf-btn animate-btn bg-dark-2 text-white" disabled={saving}>{saving ? "Salvando…" : isEdit ? "Salvar" : "Adicionar"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
