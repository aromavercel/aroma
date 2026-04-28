import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getPerfumeDisplayData, getPerfumeAllImages } from "@/data/perfumes";
import { useContextElement } from "@/context/Context";

const MODAL_ID = "perfumeDetailModal";

export default function PerfumeDetailModal({ perfume, onClose, onEdit, onDelete }) {
  const modalRef = useRef(null);
  const cleanupRef = useRef(() => {});
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToWishlist, removeFromWishlist, isAddedtoWishlist, wishListLoading } = useContextElement();

  useEffect(() => {
    if (!perfume) return;
    const el = modalRef.current;
    if (!el || !onClose) return;
    import("bootstrap").then((bootstrap) => {
      if (!modalRef.current) return;
      const instance = bootstrap.Modal.getOrCreateInstance(modalRef.current);
      const handleHidden = () => onClose();
      modalRef.current.addEventListener("hidden.bs.modal", handleHidden);
      cleanupRef.current = () => {
        if (modalRef.current) {
          modalRef.current.removeEventListener("hidden.bs.modal", handleHidden);
        }
      };
      instance.show();
    }).catch(() => {});
    return () => cleanupRef.current();
  }, [perfume, onClose]);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [perfume]);

  if (!perfume) return null;

  const d = getPerfumeDisplayData(perfume);
  const images = getPerfumeAllImages(perfume);
  const notes = perfume.notes || {};
  const variants = perfume.variants || [];
  const variantsWithPrice = variants.filter((v) => v.price_short != null || v.option0 != null);
  const mainImage = images[selectedImageIndex] || images[0];
  const inWishlist = perfume?.id ? isAddedtoWishlist(perfume.id) : false;

  return (
    <div
      className="modal fade modalCentered"
      id={MODAL_ID}
      tabIndex={-1}
      aria-labelledby="perfumeDetailLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl" style={{ maxWidth: "900px" }}>
        <div className="modal-content">
          <button
            type="button"
            className="icon-close icon-close-popup"
            data-bs-dismiss="modal"
            aria-label="Fechar"
          />
          <div className="modal-body p-4 p-md-5">
            <div className="row g-4">
              {/* Coluna esquerda: foto principal + miniaturas */}
              <div className="col-12 col-md-5">
                <div
                  className="bg-light rounded d-flex align-items-center justify-content-center mb-3 overflow-hidden"
                  style={{ minHeight: 320, aspectRatio: "1" }}
                >
                  {mainImage ? (
                    <img
                      src={mainImage}
                      alt={d.title}
                      className="img-fluid"
                      style={{ objectFit: "contain", maxHeight: 320 }}
                    />
                  ) : (
                    <span className="icon icon-user text-muted" style={{ fontSize: "4rem" }} />
                  )}
                </div>
                {images.length > 1 ? (
                  <div className="d-flex gap-2 flex-wrap">
                    {images.map((src, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`border rounded p-1 overflow-hidden ${selectedImageIndex === i ? "border-primary border-2" : ""}`}
                        style={{ width: 56, height: 56, flexShrink: 0 }}
                        onClick={() => setSelectedImageIndex(i)}
                      >
                        <img
                          src={src}
                          alt=""
                          className="w-100 h-100"
                          style={{ objectFit: "contain" }}
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div style={{ minHeight: 56 }} />
                )}
              </div>
              {/* Coluna direita: informações e botões */}
              <div className="col-12 col-md-7">
                {d.catalogLabel && (
                  <span className="badge bg-primary mb-2">{d.catalogLabel}</span>
                )}
                <h4 className="product-name mb-2">{d.title}</h4>
                <p className="price-wrap fw-medium text-primary fs-5 mb-3">{d.priceShort}</p>
                {d.description && (
                  <p className="text-main-2 mb-3">{d.description}</p>
                )}
                {(notes.top?.length || notes.heart?.length || notes.base?.length) ? (
                  <div className="mb-3">
                    <h6 className="text-main-2 mb-2">Notas</h6>
                    {notes.top?.length > 0 && (
                      <p className="text-sm mb-1">
                        <strong>Topo:</strong> {notes.top.join(", ")}
                      </p>
                    )}
                    {notes.heart?.length > 0 && (
                      <p className="text-sm mb-1">
                        <strong>Coração:</strong> {notes.heart.join(", ")}
                      </p>
                    )}
                    {notes.base?.length > 0 && (
                      <p className="text-sm mb-1">
                        <strong>Base:</strong> {Array.isArray(notes.base) ? notes.base.join(", ") : notes.base}
                      </p>
                    )}
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
                      {variantsWithPrice.length > 10 && (
                        <li className="text-muted">+ {variantsWithPrice.length - 10} opções</li>
                      )}
                    </ul>
                  </div>
                )}
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  {!(onEdit || onDelete) && (
                    <>
                      <Link to={`/perfume/${perfume.slug || perfume.id}`} className="subscribe-button tf-btn animate-btn bg-dark-2 btn-lg text-white text-decoration-none d-inline-flex align-items-center">
                        <span className="icon icon-cart2 me-2" />
                        Ver na loja
                      </Link>
                      <button
                        type="button"
                        className={`tf-btn btn-out-line-dark2 btn-lg ${inWishlist ? "wishlist-btn-active" : ""}`}
                        onClick={async () => {
                          if (!perfume?.id) return;
                          if (inWishlist) await removeFromWishlist(perfume.id);
                          else await addToWishlist(perfume.id, perfume);
                        }}
                        aria-label={inWishlist ? "Remover da lista de desejos" : "Adicionar à lista de desejos"}
                      >
                        {inWishlist ? (
                          <svg className="wishlist-heart-filled" viewBox="0 0 24 24" fill="currentColor" width="1.25rem" height="1.25rem" aria-hidden>
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        ) : (
                          <span className="icon icon-heart2" style={{ fontSize: "1.25rem" }} />
                        )}
                      </button>
                    </>
                  )}
                  {(onEdit || onDelete) && (
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      {onEdit && <button type="button" className="subscribe-button tf-btn animate-btn bg-dark-2 btn-lg text-white" onClick={() => onEdit(perfume)}>Editar</button>}
                      {onDelete && <button type="button" className="tf-btn btn-out-line-dark2 btn-lg border-danger text-danger" onClick={() => onDelete(perfume)}>Excluir</button>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
