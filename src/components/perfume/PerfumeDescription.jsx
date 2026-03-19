"use client";

import React from "react";

/**
 * Seção de descrição do perfume em accordions (estilo Vineta product-detail).
 */
export default function PerfumeDescription({
  description = "",
  notes = {},
  variantsWithPrice = [],
}) {
  const hasNotes =
    (notes.top && notes.top.length) ||
    (notes.heart && notes.heart.length) ||
    (notes.base && notes.base.length);

  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        {description && (
          <div className="widget-accordion wd-product-descriptions">
            <div
              className="accordion-title collapsed"
              data-bs-target="#perfume-description"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="perfume-description"
              role="button"
            >
              <span>Descrição</span>
              <span className="icon icon-arrow-down" />
            </div>
            <div id="perfume-description" className="collapse show">
              <div className="accordion-body widget-desc">
                <p className="text-main-2">{description}</p>
              </div>
            </div>
          </div>
        )}

        {hasNotes && (
          <div className="widget-accordion wd-product-descriptions">
            <div
              className="accordion-title collapsed"
              data-bs-target="#perfume-notes"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="perfume-notes"
              role="button"
            >
              <span>Notas</span>
              <span className="icon icon-arrow-down" />
            </div>
            <div id="perfume-notes" className="collapse show">
              <div className="accordion-body">
                {notes.top?.length > 0 && (
                  <p className="text-main-2 mb-2">
                    <strong>Topo:</strong> {notes.top.join(", ")}
                  </p>
                )}
                {notes.heart?.length > 0 && (
                  <p className="text-main-2 mb-2">
                    <strong>Coração:</strong> {notes.heart.join(", ")}
                  </p>
                )}
                {notes.base?.length > 0 && (
                  <p className="text-main-2 mb-0">
                    <strong>Base:</strong>{" "}
                    {Array.isArray(notes.base) ? notes.base.join(", ") : String(notes.base)}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {variantsWithPrice.length > 0 && (
          <div className="widget-accordion wd-product-descriptions">
            <div
              className="accordion-title collapsed"
              data-bs-target="#perfume-options"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="perfume-options"
              role="button"
            >
              <span>Informações adicionais</span>
              <span className="icon icon-arrow-down" />
            </div>
            <div id="perfume-options" className="collapse show">
              <div className="accordion-body">
                <table className="table table-bordered text-md">
                  <thead>
                    <tr>
                      <th>Opção</th>
                      <th>Preço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {variantsWithPrice.map((v, i) => (
                      <tr key={i}>
                        <td>{v.option0 || "—"}</td>
                        <td>{v.price_short || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
