"use client";
export default function QuantitySelect({
  quantity = 1,
  setQuantity = () => {},
  styleClass = "",
}) {
  return (
    <>
      <div className={`wg-quantity ${styleClass} `}>
        <button
          type="button"
          className="btn-quantity minus-btn"
          onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}
        >
          -
        </button>
        <input
          className="quantity-product font-4"
          type="number"
          name="number"
          min={1}
          value={quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (!Number.isNaN(value) && value > 0) {
              setQuantity(value);
            }
          }}
        />
        <button
          type="button"
          className="btn-quantity plus-btn"
          onClick={() => setQuantity(Number(quantity) + 1)}
        >
          +
        </button>
      </div>
    </>
  );
}
