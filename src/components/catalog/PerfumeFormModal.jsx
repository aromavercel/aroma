import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    title: "",
    external_url: "",
    description: "",
    catalog_source: "normal",
    active: true,
    outOfStock: false,
    notesTop: "",
    notesHeart: "",
    notesBase: "",
    variantsJson: "",
    imagesText: "",
  });
  const [variantRows, setVariantRows] = useState([]);

  const isEdit = Boolean(perfume?.id);
  const imagesList = useMemo(() => {
    const lines = String(form.imagesText || "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    // remove duplicadas preservando ordem
    const seen = new Set();
    return lines.filter((u) => {
      if (seen.has(u)) return false;
      seen.add(u);
      return true;
    });
  }, [form.imagesText]);

  useEffect(() => {
    if (perfume !== undefined) {
      if (perfume) {
        const notes = notesToForm(perfume.notes);
        const variants = Array.isArray(perfume.variants) ? perfume.variants : [];
        const firstWithPrice = variants.find((v) => v && (v.price_number != null || v.price_short != null)) || variants[0];
        setForm({
          title: perfume.title || "",
          external_url: perfume.external_url || perfume.url || "",
          description: perfume.description || "",
          catalog_source: perfume.catalogSource || "normal",
          active: perfume.active !== false,
          outOfStock: perfume.outOfStock === true,
          notesTop: notes.top,
          notesHeart: notes.heart,
          notesBase: notes.base,
          variantsJson: Array.isArray(perfume.variants) && perfume.variants.length > 0 ? JSON.stringify(perfume.variants, null, 2) : "",
          imagesText: Array.isArray(perfume.images) ? perfume.images.join("\n") : "",
        });
        setVariantRows(
          Array.isArray(perfume.variants)
            ? perfume.variants
                .filter((v) => v && (v.option0 || v.price_number != null || v.price_short))
                .map((v) => ({
                  option0: String(v.option0 || "").trim(),
                  price:
                    v.price_short != null && String(v.price_short).trim()
                      ? String(v.price_short).trim()
                      : v.price_number != null && !Number.isNaN(Number(v.price_number))
                        ? new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(Number(v.price_number))
                        : "",
                }))
            : [],
        );
      } else {
        setForm({
          title: "",
          external_url: "",
          description: "",
          catalog_source: "normal",
          active: true,
          outOfStock: false,
          notesTop: "",
          notesHeart: "",
          notesBase: "",
          variantsJson: "",
          imagesText: "",
        });
        setVariantRows([{ option0: "50ml", price: "" }]);
      }
      setError("");
    }
  }, [perfume]);

  const parsePriceToNumber = (raw) => {
    const s = String(raw || "").trim();
    if (!s) return null;
    // aceita "R$ 99,90", "99,90", "99.90", "99"
    const normalized = s
      .replace(/[^\d,.-]/g, "")
      .replace(/\./g, "")
      .replace(",", ".");
    const n = Number(normalized);
    return Number.isFinite(n) ? n : null;
  };

  const formatBRL = (n) => {
    if (n == null || Number.isNaN(Number(n))) return "";
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(n));
  };

  const syncVariantsJsonFromRows = (rows) => {
    const cleaned = (rows || [])
      .map((r) => ({
        option0: String(r.option0 || "").trim(),
        price_number: parsePriceToNumber(r.price) ?? undefined,
        price_short:
          (parsePriceToNumber(r.price) != null ? formatBRL(parsePriceToNumber(r.price)) : "") ||
          String(r.price || "").trim() ||
          undefined,
      }))
      .filter((v) => v.option0 || v.price_number != null || v.price_short);
    const withImage = cleaned.map((v, idx) => {
      if (idx !== 0) return v;
      const firstImg = imagesList?.[0];
      if (!firstImg) return v;
      return v.image_url ? v : { ...v, image_url: firstImg };
    });
    setForm((f) => ({ ...f, variantsJson: withImage.length ? JSON.stringify(withImage, null, 2) : "" }));
  };

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

  const removeImageUrl = (url) => {
    if (!url) return;
    setForm((f) => {
      const next = String(f.imagesText || "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .filter((u) => u !== url);
      return { ...f, imagesText: next.join("\n") };
    });
  };

  const handleUploadSelectedImage = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Selecione uma imagem para enviar.");
      return;
    }
    await uploadPerfumeImage(file, { applyToForm: true });
  };

  const uploadPerfumeImage = async (file, { applyToForm } = { applyToForm: false }) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) throw new Error("Use uma imagem JPEG, PNG, WebP ou GIF.");
    if (file.size > 3 * 1024 * 1024) throw new Error("Imagem muito grande. Máximo 3 MB.");

    setUploadingImage(true);
    setError("");
    try {
      const { getStoredToken } = await import("@/api/auth");
      const token = getStoredToken();
      if (!token) throw new Error("Não autenticado");

      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("Erro ao ler arquivo"));
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });

      const res = await fetch("/api/upload-perfume-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dataUrl, filename: file.name }),
      });
      const data = res.headers.get("content-type")?.includes("application/json")
        ? await res.json().catch(() => ({}))
        : {};
      if (!res.ok) throw new Error(data?.error || "Erro ao enviar imagem");
      const url = data?.url;
      if (!url) throw new Error("Upload não retornou URL");

      if (applyToForm) {
        // 1) Sempre adiciona na lista de imagens
        setForm((f) => {
          const lines = String(f.imagesText || "")
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean);
          if (!lines.includes(url)) lines.unshift(url);
          return { ...f, imagesText: lines.join("\n") };
        });

        // 2) Se já tem variantes e a primeira não tem image_url, preenche automaticamente
        setForm((f) => {
          const raw = String(f.variantsJson || "").trim();
          if (!raw) return f;
          try {
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed) || parsed.length === 0) return f;
            const first = parsed[0] || {};
            const hasImage = Boolean(first.image_url || first.imageUrl);
            if (hasImage) return f;
            const nextVariants = [{ ...first, image_url: url }, ...parsed.slice(1)];
            return { ...f, variantsJson: JSON.stringify(nextVariants, null, 2) };
          } catch {
            return f;
          }
        });

        if (fileInputRef.current) fileInputRef.current.value = "";
      }

      return url;
    } finally {
      setUploadingImage(false);
    }
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
      let images = form.imagesText.split("\n").map((s) => s.trim()).filter(Boolean);

      // Se o admin selecionou um arquivo mas não clicou em "Enviar imagem",
      // fazemos o upload automaticamente no salvar.
      const selectedFile = fileInputRef.current?.files?.[0];
      if (selectedFile) {
        const url = await uploadPerfumeImage(selectedFile, { applyToForm: false });
        if (url && !images.includes(url)) images = [url, ...images];
        if (fileInputRef.current) fileInputRef.current.value = "";
      }

      // Se não tiver variantsJson, tenta usar as linhas de opções
      if (!form.variantsJson.trim() && variantRows.length) {
        const cleaned = variantRows
          .map((r) => ({
            option0: String(r.option0 || "").trim(),
            price_number: parsePriceToNumber(r.price) ?? undefined,
            price_short:
              (parsePriceToNumber(r.price) != null ? formatBRL(parsePriceToNumber(r.price)) : "") ||
              String(r.price || "").trim() ||
              undefined,
          }))
          .filter((v) => v.option0 || v.price_number != null || v.price_short);
        if (cleaned.length) {
          if (images[0] && !cleaned[0].image_url) cleaned[0].image_url = images[0];
          variants = cleaned;
        }
      }

      const payload = {
        title,
        external_url: String(form.external_url || "").trim() || undefined,
        description: form.description.trim() || undefined,
        catalog_source,
        active: form.active,
        outOfStock: form.outOfStock,
        notes: formToNotes({ top: form.notesTop, heart: form.notesHeart, base: form.notesBase }),
        variants,
        images,
      };
      const { createPerfume, updatePerfume } = await import("@/api/perfumes");
      if (isEdit) await updatePerfume(perfume.id, payload);
      else await createPerfume(payload);
      if (onSaved) onSaved();
      const bootstrap = await import("bootstrap");
      const instance = bootstrap.Modal.getInstance(modalRef.current);
      // Não chama onClose aqui: aguardamos o evento hidden.bs.modal
      // para o Bootstrap remover backdrop/scroll-lock corretamente.
      if (instance) instance.hide();
      else if (onClose) onClose();
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
                <div className="col-12">
                  <label className="form-label text-main-2">URL externa (opcional)</label>
                  <input
                    type="url"
                    className="form-control"
                    value={form.external_url}
                    onChange={(e) => handleChange("external_url", e.target.value)}
                    placeholder="https://..."
                  />
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
                          checked={Boolean(form.active)}
                          onChange={(e) => handleChange("active", e.target.checked)}
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
                          checked={Boolean(form.outOfStock)}
                          onChange={(e) => handleChange("outOfStock", e.target.checked)}
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
                <div className="col-12">
                  <label className="form-label text-main-2">Opções e preços</label>
                  <div className="d-flex flex-column gap-2">
                    {(variantRows.length ? variantRows : [{ option0: "50ml", price: "" }]).map((row, idx) => (
                      <div key={idx} className="row g-2 align-items-center">
                        <div className="col-12 col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            value={row.option0}
                            onChange={(e) => {
                              const next = [...variantRows];
                              next[idx] = { ...next[idx], option0: e.target.value };
                              setVariantRows(next);
                              syncVariantsJsonFromRows(next);
                            }}
                            placeholder="Ex: 50ml"
                          />
                        </div>
                        <div className="col-12 col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            value={row.price}
                            onChange={(e) => {
                              const next = [...variantRows];
                              next[idx] = { ...next[idx], price: e.target.value };
                              setVariantRows(next);
                              syncVariantsJsonFromRows(next);
                            }}
                            placeholder="Preço (ex: 99,90)"
                            inputMode="decimal"
                          />
                        </div>
                        <div className="col-12 col-md-2 d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-outline-secondary w-100"
                            onClick={() => {
                              const next = [...variantRows, { option0: "", price: "" }];
                              setVariantRows(next);
                            }}
                            disabled={saving || uploadingImage}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger w-100"
                            onClick={() => {
                              const next = variantRows.filter((_, i) => i !== idx);
                              setVariantRows(next);
                              syncVariantsJsonFromRows(next);
                            }}
                            disabled={saving || uploadingImage || variantRows.length <= 1}
                          >
                            –
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-muted mt-1">
                    Isso alimenta automaticamente o campo “Variantes (JSON)”. O cliente poderá escolher a opção na loja.
                  </div>
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
                  <label className="form-label text-main-2">Imagem do perfume (upload)</label>
                  <div className="d-flex flex-wrap gap-2 align-items-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="form-control"
                      style={{ maxWidth: 420 }}
                      disabled={uploadingImage || saving}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      onClick={handleUploadSelectedImage}
                      disabled={uploadingImage || saving}
                    >
                      {uploadingImage ? "Enviando…" : "Enviar imagem"}
                    </button>
                    <span className="text-sm text-muted">
                      A imagem será salva no Blob e a URL será adicionada abaixo.
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label text-main-2">Imagens do item</label>
                  {imagesList.length ? (
                    <div className="d-flex flex-wrap gap-2">
                      {imagesList.map((url) => (
                        <div
                          key={url}
                          className="border rounded p-2"
                          style={{ width: 110 }}
                        >
                          <div
                            className="bg-light rounded overflow-hidden d-flex align-items-center justify-content-center"
                            style={{ width: "100%", height: 80 }}
                          >
                            <img
                              src={url}
                              alt=""
                              style={{ width: "100%", height: "100%", objectFit: "contain" }}
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger w-100 mt-2"
                            onClick={() => removeImageUrl(url)}
                            disabled={saving || uploadingImage}
                          >
                            Remover
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-muted">Nenhuma imagem adicionada ainda.</div>
                  )}
                </div>
                <div className="col-12">
                  <label className="form-label text-main-2">URLs das imagens (uma por linha)</label>
                  <textarea className="form-control" rows={3} value={form.imagesText} onChange={(e) => handleChange("imagesText", e.target.value)} placeholder="https://exemplo.com/img1.jpg" />
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" className="subscribe-button tf-btn animate-btn bg-dark-2 text-white" disabled={saving}>{saving ? "Salvando…" : isEdit ? "Salvar" : "Adicionar"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
