import React from "react";

export default function Description() {
  return (
    <>
      <div className="item">
        <p className="fw-medium title">Composition</p>
        <ul>
          <li>Viscose 55%, Linen 45%</li>
          <li>We exclude the weight of minor components</li>
        </ul>
      </div>
      <p className="item">Additional material information</p>
      <div className="item">
        <p className="title">The total weight of this product contains:</p>
        <ul>
          <li>55% LivaEco™ viscose</li>
          <li>Viscose 55%</li>
        </ul>
      </div>
      <ul className="item">
        <li>
          We exclude the weight of minor components such as, but not
          exclusively: threads, buttons, zippers, embellishments and prints.
        </li>
        <li>
          The total weight of the product is calculated by adding the weight of
          all layers and main components together. Based on that, we calculate
          how much of that weight is made out by each material. For sets &amp;
          multipacks all pieces are counted together as one product in
          calculations.
        </li>
        <li>Materials in this product explained</li>
        <li>LinenLinen is a natural bast fibre derived from flax plants.</li>
        <li>
          LivaEco™ viscoseLivaEco™ viscose is a branded viscose fibre, made from
          wood pulp.
        </li>
        <li>
          ViscoseViscose is a regenerated cellulose fibre commonly made from
          wood, but the raw material could also consist of other cellulosic
          materials.
        </li>
      </ul>
    </>
  );
}
