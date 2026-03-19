import React from "react";

export default function AdditionalInfo() {
  return (
    <table className="tb-info-product text-md">
      <tbody>
        <tr className="tb-attr-item">
          <th className="tb-attr-label">Material</th>
          <td className="tb-attr-value">
            <p>100% Cotton</p>
          </td>
        </tr>
        <tr className="tb-attr-item">
          <th className="tb-attr-label">Color</th>
          <td className="tb-attr-value">
            <p>White, Black, Brown</p>
          </td>
        </tr>
        <tr className="tb-attr-item">
          <th className="tb-attr-label">Brand</th>
          <td className="tb-attr-value">
            <p>Vineta</p>
          </td>
        </tr>
        <tr className="tb-attr-item">
          <th className="tb-attr-label">Size</th>
          <td className="tb-attr-value">
            <p>S, M, L, XL</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
