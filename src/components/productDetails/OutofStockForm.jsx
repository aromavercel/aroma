"use client";

export default function OutofStockForm() {
  return (
    <form className="form-out-stock" onSubmit={(e) => e.preventDefault()}>
      <div className="box-title-out-stock">
        <div className="text-xl fw-medium">Notify me when it back in stock</div>
        <p className="text-md text-main">
          Enter your email address to be notified if the product becomes
          available again.
        </p>
      </div>
      <div className="group-form-field">
        <div className="tf-field style-2 style-3">
          <input
            className="tf-field-input tf-input"
            id="name"
            placeholder=" "
            type="text"
            name="name"
            required
          />
          <label className="tf-field-label" htmlFor="name">
            Name
          </label>
        </div>
        <div className="tf-field style-2 style-3">
          <input
            className="tf-field-input tf-input"
            id="email"
            placeholder=" "
            type="email"
            name="email"
            required
          />
          <label className="tf-field-label" htmlFor="email">
            Email
          </label>
        </div>
      </div>
      <button className="tf-btn animate-btn">Submit</button>
    </form>
  );
}
