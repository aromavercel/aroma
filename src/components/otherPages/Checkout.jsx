"use client";

import { useContextElement } from "@/context/Context";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkPhoneRegistered, getMe, updateProfile } from "@/api/auth";
import { isValidBrazilPhoneInput } from "@/utils/brPhone";
import { createOrder } from "@/api/orders";
import { getCart } from "@/api/cart";
import { BR_STATES, COUNTRY_BR_LABEL, fetchBrazilCitiesByUF } from "@/utils/brLocations";
import { fetchAddressByCep, formatCep, onlyDigits } from "@/utils/cep";

const CHECKOUT_DRAFT_KEY = "aroma_checkout_draft_v1";

export default function Checkout() {
  const { user, cartProducts, totalPrice, setCartProducts, setUser } = useContextElement();
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [zipcode, setZipcode] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);
  const [phone, setPhone] = useState("");
  /** idle | checking | exists | absent | invalid — só visitante */
  const [phoneRegistry, setPhoneRegistry] = useState("idle");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CHECKOUT_DRAFT_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      if (!d || typeof d !== "object") return;
      if (typeof d.firstname === "string") setFirstname(d.firstname);
      if (typeof d.lastname === "string") setLastname(d.lastname);
      if (typeof d.address === "string") setAddress(d.address);
      if (typeof d.apartment === "string") setApartment(d.apartment);
      if (typeof d.city === "string") setCity(d.city);
      if (typeof d.state === "string") setState(d.state);
      if (typeof d.zipcode === "string") setZipcode(d.zipcode);
      if (typeof d.phone === "string") setPhone(d.phone);
    } catch {
      // ignora
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(
        CHECKOUT_DRAFT_KEY,
        JSON.stringify({
          firstname,
          lastname,
          address,
          apartment,
          city,
          state,
          zipcode,
          phone,
        }),
      );
    } catch {
      // ignora
    }
  }, [firstname, lastname, address, apartment, city, state, zipcode, phone]);

  useEffect(() => {
    if (!user) return;
    let draft = null;
    try {
      draft = JSON.parse(sessionStorage.getItem(CHECKOUT_DRAFT_KEY) || "null");
    } catch {
      draft = null;
    }
    const pickStr = (key, ...fallbacks) => {
      const v = draft?.[key];
      if (typeof v === "string" && v.trim()) return v;
      for (const f of fallbacks) {
        if (typeof f === "string" && f.trim()) return f;
      }
      return "";
    };
    const nameParts = (user.name || "").trim().split(/\s+/);
    setFirstname(pickStr("firstname", nameParts[0] || ""));
    setLastname(pickStr("lastname", nameParts.slice(1).join(" ") || ""));
    setAddress(pickStr("address", user.address ?? ""));
    setApartment(pickStr("apartment", user.address_complement ?? ""));
    setCity(pickStr("city", user.city ?? ""));
    setState(pickStr("state", user.state ?? ""));
    setZipcode(pickStr("zipcode", user.zipcode ?? ""));
    setPhone(pickStr("phone", user.phone ?? ""));
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      setPhoneRegistry("idle");
      return;
    }
    const trimmed = phone.trim();
    if (!trimmed) {
      setPhoneRegistry("idle");
      return;
    }
    if (!isValidBrazilPhoneInput(trimmed)) {
      setPhoneRegistry("invalid");
      return;
    }
    let cancelled = false;
    setPhoneRegistry("checking");
    const t = setTimeout(() => {
      checkPhoneRegistered({ phone: trimmed, country: "BR" })
        .then(({ exists }) => {
          if (!cancelled) setPhoneRegistry(exists ? "exists" : "absent");
        })
        .catch(() => {
          if (!cancelled) setPhoneRegistry("invalid");
        });
    }, 550);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [phone, user?.id]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!state) {
        setCities([]);
        return;
      }
      setLoadingCities(true);
      try {
        const list = await fetchBrazilCitiesByUF(state);
        if (!cancelled) setCities(list);
      } catch {
        if (!cancelled) setCities([]);
      } finally {
        if (!cancelled) setLoadingCities(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [state]);

  const handleZipcodeChange = async (e) => {
    const nextMasked = formatCep(e.target.value);
    setZipcode(nextMasked);

    const digits = onlyDigits(nextMasked);
    if (digits.length !== 8) return;

    setLoadingCep(true);
    try {
      const found = await fetchAddressByCep(digits);
      if (!found) return;
      if (found.state) {
        setState(found.state);
        setCity("");
      }
      if (found.city) setCity(found.city);
      if (found.street) setAddress(found.street);
      if (found.complement && !apartment) setApartment(found.complement);
    } catch {
    } finally {
      setLoadingCep(false);
    }
  };

  const discount = 0;
  const FREE_SHIPPING_THRESHOLD = 250;
  const shippingCost = totalPrice > FREE_SHIPPING_THRESHOLD ? 0 : 10;
  const taxCost = 0;
  const orderTotal = totalPrice ? totalPrice + shippingCost : 0;

  const stashPhoneAndOpenAuth = async (targetId) => {
    try {
      sessionStorage.setItem("checkoutAuthPhone", phone.trim());
    } catch {
      // ignora
    }
    const el = document.getElementById(targetId);
    if (!el) return;
    try {
      const bootstrap = await import("bootstrap");
      bootstrap.Offcanvas.getOrCreateInstance(el).show();
    } catch {
      // ignora
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!cartProducts.length) {
      setError("Seu carrinho está vazio.");
      return;
    }
    if (!user?.id) {
      setError(
        "Para finalizar, entre na sua conta ou crie uma conta usando as opções que aparecem após informar seu telefone.",
      );
      return;
    }
    const name = [firstname, lastname].filter(Boolean).join(" ").trim();
    if (!name || !address?.trim() || !city?.trim() || !phone?.trim()) {
      setError("Preencha nome, endereço, cidade e telefone.");
      return;
    }
    setSubmitting(true);
    try {
      const sessionUser = await getMe();
      if (!sessionUser?.id) {
        setUser(null);
        setError(
          "Sua sessão não está mais ativa ou você não está logado. Entre novamente na sua conta para finalizar o pedido.",
        );
        return;
      }
      setUser(sessionUser);
      const nextUser = sessionUser;

      await updateProfile({
        name: name || nextUser.name,
        address: address.trim() || null,
        address_complement: apartment.trim() || null,
        zipcode: zipcode.trim() || null,
        city: city.trim() || null,
        state: state || null,
        country: COUNTRY_BR_LABEL,
        phone: phone.trim() || nextUser.phone,
      });
      const updatedUser = {
        ...nextUser,
        name,
        address: address.trim(),
        address_complement: apartment.trim(),
        zipcode: zipcode.trim(),
        city: city.trim(),
        state,
        country: COUNTRY_BR_LABEL,
        phone: phone.trim(),
      };
      setUser(updatedUser);

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
        shipping_country: COUNTRY_BR_LABEL,
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
                  <fieldset className="tf-field style-2 style-3 mb_16">
                    <input
                      className="tf-field-input tf-input"
                      id="phone"
                      type="tel"
                      autoComplete="tel-national"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder=""
                    />
                    <label className="tf-field-label" htmlFor="phone">Telefone</label>
                  </fieldset>
                  {!user?.id && (
                    <>
                      <p className="text-sm text-dark-4 mb_8">
                        Informe seu celular com DDD. Vamos verificar se já existe cadastro com este número.
                      </p>
                      {phoneRegistry === "checking" && (
                        <div className="alert alert-secondary text-sm py-2 mb_12">Verificando telefone…</div>
                      )}
                      {phoneRegistry === "exists" && (
                        <div className="alert alert-info text-sm mb_12" role="status">
                          Este número já possui conta. Faça login{" "}
                          <button
                            type="button"
                            className="btn p-0 border-0 bg-transparent align-baseline link text-dark fw-medium text-decoration-underline"
                            onClick={() => stashPhoneAndOpenAuth("login")}
                          >
                            clicando aqui
                          </button>
                          .
                        </div>
                      )}
                      {phoneRegistry === "absent" && (
                        <div className="alert alert-info text-sm mb_12" role="status">
                          Este número ainda não tem cadastro. Crie uma conta para comprar{" "}
                          <button
                            type="button"
                            className="btn p-0 border-0 bg-transparent align-baseline link text-dark fw-medium text-decoration-underline"
                            onClick={() => stashPhoneAndOpenAuth("register")}
                          >
                            clicando aqui
                          </button>
                          .
                        </div>
                      )}
                      {phoneRegistry === "invalid" && phone.trim().length > 0 && (
                        <div className="alert alert-warning text-sm mb_12" role="status">
                          Digite um celular válido com DDD (Brasil).
                        </div>
                      )}
                    </>
                  )}
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
                    <div className="tf-select select-square">
                      <select
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={!state || loadingCities}
                      >
                        <option value="">
                          {!state ? "Cidade" : loadingCities ? "Carregando cidades…" : "Cidade"}
                        </option>
                        {cities.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="tf-select select-square">
                      <select
                        id="state"
                        value={state}
                        onChange={(e) => {
                          const next = e.target.value;
                          setState(next);
                          setCity("");
                        }}
                      >
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
                        inputMode="numeric"
                        autoComplete="postal-code"
                        maxLength={9}
                        onChange={handleZipcodeChange}
                        placeholder=""
                      />
                      <label className="tf-field-label" htmlFor="code">
                        {loadingCep ? "Buscando CEP…" : "CEP"}
                      </label>
                    </fieldset>
                  </div>
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
                    <span>Frete:</span>
                    <span className="price-ship fw-medium">
                      {!totalPrice
                        ? "R$ 0,00"
                        : shippingCost === 0
                          ? "Grátis"
                          : `R$ ${shippingCost.toFixed(2)}`}
                    </span>
                  </li>
                </ul>
                <div className="subtotal text-lg fw-medium d-flex justify-content-between">
                  <span>Total:</span>
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
