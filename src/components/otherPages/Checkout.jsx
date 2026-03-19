"use client";

import { useContextElement } from "@/context/Context";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateProfile } from "@/api/auth";
import { createOrder } from "@/api/orders";
import { getCart } from "@/api/cart";

const BR_STATES = [
  { value: "", label: "Estado" },
  { value: "AC", label: "Acre" }, { value: "AL", label: "Alagoas" }, { value: "AM", label: "Amazonas" }, { value: "AP", label: "Amapá" },
  { value: "BA", label: "Bahia" }, { value: "CE", label: "Ceará" }, { value: "DF", label: "Distrito Federal" }, { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" }, { value: "MA", label: "Maranhão" }, { value: "MG", label: "Minas Gerais" }, { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MT", label: "Mato Grosso" }, { value: "PA", label: "Pará" }, { value: "PB", label: "Paraíba" }, { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" }, { value: "PR", label: "Paraná" }, { value: "RJ", label: "Rio de Janeiro" }, { value: "RN", label: "Rio Grande do Norte" },
  { value: "RO", label: "Rondônia" }, { value: "RR", label: "Roraima" }, { value: "RS", label: "Rio Grande do Sul" }, { value: "SC", label: "Santa Catarina" },
  { value: "SE", label: "Sergipe" }, { value: "SP", label: "São Paulo" }, { value: "TO", label: "Tocantins" },
];

export default function Checkout() {
  const { user, cartProducts, totalPrice, setCartProducts, setUser } = useContextElement();
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    const nameParts = (user.name || "").trim().split(/\s+/);
    setFirstname(nameParts[0] || "");
    setLastname(nameParts.slice(1).join(" ") || "");
    setCountry(user.country ?? "");
    setAddress(user.address ?? "");
    setApartment(user.address_complement ?? "");
    setCity(user.city ?? "");
    setState(user.state ?? "");
    setZipcode(user.zipcode ?? "");
    setPhone(user.phone ?? "");
    setContact(user.email || user.phone || "");
  }, [user]);

  const discount = 10;
  const shippingCost = 10;
  const taxCost = 10;
  const orderTotal = totalPrice ? totalPrice - discount + shippingCost + taxCost : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!cartProducts.length) {
      setError("Seu carrinho está vazio.");
      return;
    }
    if (!user) {
      setError("Faça login para finalizar o pedido.");
      return;
    }
    const name = [firstname, lastname].filter(Boolean).join(" ").trim();
    if (!name || !address?.trim() || !city?.trim() || !phone?.trim()) {
      setError("Preencha nome, endereço, cidade e telefone.");
      return;
    }
    setSubmitting(true);
    try {
      if (user) {
        await updateProfile({
          name: name || user.name,
          address: address.trim() || null,
          address_complement: apartment.trim() || null,
          zipcode: zipcode.trim() || null,
          city: city.trim() || null,
          state: state || null,
          country: country.trim() || null,
          phone: phone.trim() || user.phone,
        });
        const updatedUser = { ...user, name, address: address.trim(), address_complement: apartment.trim(), zipcode: zipcode.trim(), city: city.trim(), state, country: country.trim(), phone: phone.trim() };
        setUser(updatedUser);
      }
      await createOrder({
        subtotal: totalPrice,
        discount,
        shipping: shippingCost,
        tax: taxCost,
        total: orderTotal,
        shipping_name: name,
        shipping_address: address.trim(),
        shipping_complement: apartment.trim() || null,
        shipping_city: city.trim(),
        shipping_state: state || null,
        shipping_zipcode: zipcode.trim() || null,
        shipping_country: country.trim() || null,
        shipping_phone: phone.trim(),
        payment_method: "cash_delivery",
      });
      const { items } = await getCart();
      setCartProducts(items);
      navigate("/checkout/thank-you", { state: { orderSuccess: true } });
    } catch (err) {
      setError(err.message || "Erro ao finalizar pedido. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flat-spacing-25">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-xl-8">
              <div className="tf-checkout-cart-main">
                <div className="box-ip-checkout">
                  <div className="title text-xl fw-medium">Checkout</div>
                  {error && <div className="alert alert-danger mb_16">{error}</div>}
                  <div className="grid-2 mb_16">
                    <div className="tf-field style-2 style-3">
                      <input
                        className="tf-field-input tf-input"
                        id="firstname"
                        placeholder=" "
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                      <label className="tf-field-label" htmlFor="firstname">Primeiro nome</label>
                    </div>
                    <div className="tf-field style-2 style-3">
                      <input
                        className="tf-field-input tf-input"
                        id="lastname"
                        placeholder=" "
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                      <label className="tf-field-label" htmlFor="lastname">Último nome</label>
                    </div>
                  </div>
                  <fieldset className="tf-field style-2 style-3 mb_16">
                    <input
                      className="tf-field-input tf-input"
                      id="country"
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder=""
                    />
                    <label className="tf-field-label" htmlFor="country">País</label>
                  </fieldset>
                  <fieldset className="tf-field style-2 style-3 mb_16">
                    <input
                      className="tf-field-input tf-input"
                      id="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder=""
                    />
                    <label className="tf-field-label" htmlFor="address">Endereço</label>
                  </fieldset>
                  <fieldset className="mb_16">
                    <input
                      type="text"
                      className="style-2"
                      placeholder="Apartamento, suite, etc (opcional)"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                    />
                  </fieldset>
                  <div className="grid-3 mb_16">
                    <fieldset className="tf-field style-2 style-3">
                      <input
                        className="tf-field-input tf-input"
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder=""
                      />
                      <label className="tf-field-label" htmlFor="city">Cidade</label>
                    </fieldset>
                    <div className="tf-select select-square">
                      <select id="state" value={state} onChange={(e) => setState(e.target.value)}>
                        {BR_STATES.map((opt) => (
                          <option key={opt.value || "empty"} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <fieldset className="tf-field style-2 style-3">
                      <input
                        className="tf-field-input tf-input"
                        id="code"
                        type="text"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        placeholder=""
                      />
                      <label className="tf-field-label" htmlFor="code">CEP/Postal</label>
                    </fieldset>
                  </div>
                  <fieldset className="tf-field style-2 style-3 mb_16">
                    <input
                      className="tf-field-input tf-input"
                      id="phone"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder=""
                    />
                    <label className="tf-field-label" htmlFor="phone">Telefone</label>
                  </fieldset>
                </div>
                <div className="box-ip-contact">
                  <div className="title">
                    <div className="text-xl fw-medium">Informações de contato</div>
                    <Link to="/login" className="text-sm link">Entrar</Link>
                  </div>
                  <input
                    className="style-2"
                    id="contact"
                    placeholder="Email ou número de telefone"
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
              <div className="box-ip-shipping">
                <div className="title text-xl fw-medium">Entrega</div>
                <p className="text-sm text-main mb_8">
                  Trabalhamos com entrega combinada após o pedido. Entraremos
                  em contato para alinhar detalhes de frete e prazo.
                </p>
              </div>
              <div className="box-ip-payment">
                <div className="title">
                  <div className="text-lg fw-medium mb_4">Pagamento</div>
                  <p className="text-sm text-main mb_8">
                    O pagamento será realizado diretamente na entrega, de
                    acordo com a forma combinada com nossa equipe.
                  </p>
                  <p className="text-dark-6 text-sm mb-0">
                    Seus dados pessoais serão usados para processar seu pedido,
                    suportar sua experiência ao longo deste site e para outros
                    propósitos descritos em nossa{" "}
                    <Link
                      to={`/privacy-policy`}
                      className="fw-medium text-decoration-underline link text-sm"
                    >
                      política de privacidade.
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="tf-page-cart-sidebar">
              <div className="cart-box order-box">
                <div className="title text-lg fw-medium">No seu carrinho</div>
                {cartProducts.length ? (
                  <ul className="list-order-product">
                    {cartProducts.map((product, i) => (
                      <li key={i} className="order-item">
                        <figure className="img-product">
                          <img
                            alt="product"
                            src={product.imgSrc}
                            width={144}
                            height={188}
                          />
                          <span className="quantity">{product.quantity}</span>
                        </figure>
                        <div className="content">
                          <div className="info">
                            <p className="name text-sm fw-medium">
                              {product.title}
                            </p>
                            <span className="variant">White / L</span>
                          </div>
                          <span className="price text-sm fw-medium">
                            ${(product.price * product.quantity).toFixed(2)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4">
                    Seu carrinho está vazio. Adicione produtos favoritos ao carrinho!{" "}
                    <Link
                      className="tf-btn btn-dark2 animate-btn mt-3"
                      to="/shop-default"
                    >
                      Explorar produtos
                    </Link>
                  </div>
                )}
                <ul className="list-total">
                  <li className="total-item text-sm d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <span className="price-sub fw-medium">
                      R$ {totalPrice.toFixed(2)}
                    </span>
                  </li>
                  <li className="total-item text-sm d-flex justify-content-between">
                    <span>Desconto:</span>
                    <span className="price-discount fw-medium">
                      {totalPrice ? "R$-10" : "R$0"}
                    </span>
                  </li>
                  <li className="total-item text-sm d-flex justify-content-between">
                    <span>Frete:</span>
                    <span className="price-ship fw-medium">
                      {totalPrice ? "R$10.00" : "R$0"}
                    </span>
                  </li>
                  <li className="total-item text-sm d-flex justify-content-between">
                    <span>Imposto:</span>
                    <span className="price-tax fw-medium">
                      {totalPrice ? "R$10.00" : "R$0"}
                    </span>
                  </li>
                </ul>
                <div className="subtotal text-lg fw-medium d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span className="total-price-order">
                    R$ {totalPrice ? orderTotal.toFixed(2) : "0.00"}
                  </span>
                </div>
                <div className="btn-order">
                  <button
                    type="submit"
                    className="tf-btn btn-dark2 animate-btn w-100"
                    disabled={submitting || !cartProducts.length}
                  >
                    {submitting ? "Finalizando…" : "Finalizar pedido"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}
