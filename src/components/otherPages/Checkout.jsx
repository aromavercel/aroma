"use client";

import { useContextElement } from "@/context/Context";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { checkPhoneRegistered, getMe, updateProfile } from "@/api/auth";
import {
  brazilPhoneNationalDigits,
  formatBrazilPhoneDisplay,
  isValidBrazilPhoneInput,
} from "@/utils/brPhone";
import { createOrder } from "@/api/orders";
import { getCart } from "@/api/cart";
import { BR_STATES, COUNTRY_BR_LABEL, fetchBrazilCitiesByUF } from "@/utils/brLocations";
import { fetchAddressByCep, formatCep, onlyDigits } from "@/utils/cep";

const CHECKOUT_DRAFT_KEY = "aroma_checkout_draft_v1";
const CHECKOUT_AUTO_FINALIZE_KEY = "aroma_checkout_auto_finalize_v1";

export default function Checkout() {
  const { user, cartProducts, totalPrice, setCartProducts, setUser, cartLoading } = useContextElement();
  const navigate = useNavigate();
  const errorRef = useRef(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
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
      if (typeof d.addressNumber === "string") setAddressNumber(onlyDigits(d.addressNumber));
      if (typeof d.complement === "string") setComplement(d.complement);
      else if (typeof d.apartment === "string") setComplement(d.apartment);
      if (typeof d.deliveryInstructions === "string") setDeliveryInstructions(d.deliveryInstructions);
      if (typeof d.city === "string") setCity(d.city);
      if (typeof d.state === "string") setState(d.state);
      if (typeof d.zipcode === "string") setZipcode(d.zipcode);
      if (typeof d.phone === "string") setPhone(brazilPhoneNationalDigits(d.phone));
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
          addressNumber,
          complement,
          deliveryInstructions,
          city,
          state,
          zipcode,
          phone,
        }),
      );
    } catch {
      // ignora
    }
  }, [firstname, lastname, address, addressNumber, complement, deliveryInstructions, city, state, zipcode, phone]);

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
    setAddressNumber(onlyDigits(pickStr("addressNumber", user.address_number ?? "")));
    setComplement(pickStr("complement", pickStr("apartment", user.address_complement ?? "")));
    setDeliveryInstructions(pickStr("deliveryInstructions", user.delivery_instructions ?? ""));
    setCity(pickStr("city", user.city ?? ""));
    setState(pickStr("state", user.state ?? ""));
    setZipcode(pickStr("zipcode", user.zipcode ?? ""));
    setPhone(brazilPhoneNationalDigits(pickStr("phone", user.phone ?? "")));
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

  const getCheckoutValidationError = useCallback(
    ({ requireAuthReady = false } = {}) => {
      // Se o carrinho está sincronizando (ex.: após login), não exibe erro.
      if (cartLoading) return "";
      if (!Array.isArray(cartProducts) || cartProducts.length === 0) {
        return "Seu carrinho está vazio.";
      }

      const name = [firstname, lastname].filter(Boolean).join(" ").trim();
      if (!name) return "Preencha seu nome.";
      if (!address?.trim()) return "Preencha o logradouro.";
      if (!addressNumber?.trim()) return "Preencha o número.";
      if (!city?.trim()) return "Preencha a cidade.";

      // Para visitantes, o telefone é obrigatório antes de abrir login/cadastro.
      if (!user?.id) {
        const trimmed = phone.trim();
        if (!trimmed) return "Informe seu telefone com DDD.";
        if (!isValidBrazilPhoneInput(trimmed)) return "Informe um telefone válido com DDD.";
        if (requireAuthReady && phoneRegistry === "checking") return "Aguarde a verificação do telefone.";
        if (requireAuthReady && phoneRegistry !== "exists" && phoneRegistry !== "absent") {
          return "Aguarde a verificação do telefone.";
        }
      }

      // Para usuários logados, precisamos ter um telefone de contato (do checkout ou da conta).
      if (user?.id) {
        const accountPhone = String(user.phone ?? "").trim();
        const contactPhone = (phone.trim() || accountPhone).trim();
        if (!contactPhone) return "É necessário um telefone para contato na entrega.";
        if (phone.trim() && !isValidBrazilPhoneInput(phone.trim())) {
          return "Informe um telefone válido com DDD.";
        }
      }

      return "";
    },
    [address, addressNumber, cartLoading, cartProducts, city, firstname, lastname, phone, phoneRegistry, user?.id, user?.phone],
  );

  const stashPhoneAndOpenAuth = async (targetId) => {
    try {
      sessionStorage.setItem("checkoutAuthPhone", brazilPhoneNationalDigits(phone));
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

  const finalizeOrder = useCallback(
    async ({ auto = false } = {}) => {
      const validationError = getCheckoutValidationError({ requireAuthReady: !user?.id });
      if (validationError) {
        setError(validationError);
        return;
      }

      // Visitante: só direciona para login/cadastro depois de validar os dados obrigatórios.
      if (!user?.id) {
        const msg =
          "Para finalizar, entre na sua conta ou crie uma conta usando as opções que aparecem após informar seu telefone.";
        setError(msg);

        // Marca para auto-finalizar assim que autenticar.
        try {
          sessionStorage.setItem(CHECKOUT_AUTO_FINALIZE_KEY, "1");
        } catch {
          // ignora
        }

        // Replica a mesma mensagem no modal.
        try {
          sessionStorage.setItem("checkoutAuthMessage", msg);
        } catch {
          // ignora
        }

        const target = phoneRegistry === "exists" ? "login" : "register";

        // Importante: o Bootstrap aplica `overflow: hidden` no body ao abrir o offcanvas,
        // o que pode impedir o scroll. Então primeiro subimos a página e depois abrimos.
        requestAnimationFrame(() => {
          const el = errorRef.current;
          if (el) {
            const topOffset = 24;
            const rect = el.getBoundingClientRect();
            const y = Math.max(0, rect.top + window.scrollY - topOffset);
            try {
              window.scrollTo({ top: y, behavior: "smooth" });
            } catch {
              window.scrollTo(0, y);
            }
          }
          setTimeout(() => {
            stashPhoneAndOpenAuth(target);
          }, 350);
        });
        return;
      }

      setError("");
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
      const accountPhone = String(nextUser.phone ?? "").trim();
      const contactPhone = (phone.trim() || accountPhone).trim();
      if (!contactPhone) {
        setError("É necessário um telefone para contato na entrega.");
        return;
      }

      // Se foi auto-finalização pós-auth, limpamos o flag agora (antes do request).
      if (auto) {
        try {
          sessionStorage.removeItem(CHECKOUT_AUTO_FINALIZE_KEY);
        } catch {
          // ignora
        }
      }

      await updateProfile({
        name: name || nextUser.name,
        address: address.trim() || null,
        address_number: addressNumber.trim() || null,
        address_complement: complement.trim() || null,
        zipcode: zipcode.trim() || null,
        city: city.trim() || null,
        state: state || null,
        country: COUNTRY_BR_LABEL,
        delivery_instructions: deliveryInstructions.trim() || null,
      });
      const updatedUser = {
        ...nextUser,
        name,
        address: address.trim(),
        address_number: addressNumber.trim(),
        address_complement: complement.trim(),
        zipcode: zipcode.trim(),
        city: city.trim(),
        state,
        country: COUNTRY_BR_LABEL,
        delivery_instructions: deliveryInstructions.trim(),
        phone: nextUser.phone,
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
        shipping_street_number: addressNumber.trim(),
        shipping_complement: complement.trim() || null,
        shipping_delivery_instructions: deliveryInstructions.trim() || null,
        shipping_city: city.trim(),
        shipping_state: state || null,
        shipping_zipcode: zipcode.trim() || null,
        shipping_country: COUNTRY_BR_LABEL,
        shipping_phone: contactPhone,
        payment_method: "cash_delivery",
      });
      setOrderPlaced(true);
      try {
        localStorage.removeItem("cartList");
      } catch {
        // ignora
      }
      try {
        const { items } = await getCart();
        setCartProducts(Array.isArray(items) ? items : []);
      } catch {
        setCartProducts([]);
      }
      navigate("/checkout/agradecimento", { state: { orderSuccess: true } });
    } catch (err) {
      setError(err.message || "Erro ao finalizar pedido. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
    },
    [
      address,
      addressNumber,
      city,
      getCheckoutValidationError,
      navigate,
      phone,
      phoneRegistry,
      setCartProducts,
      setUser,
      totalPrice,
      discount,
      shippingCost,
      taxCost,
      orderTotal,
      firstname,
      lastname,
      complement,
      deliveryInstructions,
      state,
      zipcode,
      user?.id,
      stashPhoneAndOpenAuth,
    ],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await finalizeOrder({ auto: false });
  };

  useEffect(() => {
    if (!user?.id) return;
    if (submitting) return;
    let shouldAuto = false;
    try {
      shouldAuto = sessionStorage.getItem(CHECKOUT_AUTO_FINALIZE_KEY) === "1";
    } catch {
      shouldAuto = false;
    }
    if (!shouldAuto) return;

    // Aguarda o carrinho sincronizar após login (evita "Carrinho vazio" por race),
    // e não entra em loop infinito: se continuar vazio, limpa o flag e para.
    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 12; // ~3.6s
    const tick = () => {
      if (cancelled) return;
      attempts += 1;
      if (cartLoading) {
        if (attempts < maxAttempts) return setTimeout(tick, 300);
      }
      if (!Array.isArray(cartProducts) || cartProducts.length === 0) {
        try {
          sessionStorage.removeItem(CHECKOUT_AUTO_FINALIZE_KEY);
        } catch {
          // ignora
        }
        setError("Seu carrinho está vazio.");
        return;
      }
      // Dá um tick para states estabilizarem após o setUser do modal.
      finalizeOrder({ auto: true });
    };
    const t = setTimeout(tick, 150);
    return () => clearTimeout(t);
  }, [cartLoading, cartProducts, finalizeOrder, submitting, user?.id]);

  useEffect(() => {
    if (!error) return;
    // Em mobile/desktop: sobe automaticamente até o alerta de erro.
    // Usa rAF para garantir que o DOM já renderizou o alerta.
    const t = requestAnimationFrame(() => {
      const el = errorRef.current;
      if (!el) return;
      // Primeiro: scroll explícito na janela (mais confiável no desktop).
      const topOffset = 24; // espaço para não colar no topo
      const rect = el.getBoundingClientRect();
      const y = Math.max(0, rect.top + window.scrollY - topOffset);
      try {
        window.scrollTo({ top: y, behavior: "smooth" });
      } catch {
        window.scrollTo(0, y);
      }
      // Fallback: garante visibilidade mesmo se houver containers/overflow.
      try {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch {
        el.scrollIntoView();
      }
      // A11y: foco no alerta para leitores de tela.
      try {
        el.focus?.();
      } catch {
        // ignora
      }
    });
    return () => cancelAnimationFrame(t);
  }, [error]);

  useEffect(() => {
    // Não permitir acesso ao checkout sem itens no carrinho.
    // Evita redirecionar durante a hidratação/sincronização inicial.
    // Também não redireciona enquanto estiver concluindo o pedido (o carrinho zera antes do navigate).
    if (cartLoading) return;
    if (orderPlaced) return;
    if (Array.isArray(cartProducts) && cartProducts.length === 0) {
      navigate("/catalogo", { replace: true });
    }
  }, [cartLoading, cartProducts, navigate, orderPlaced]);

  const canFinalize = !cartLoading && Boolean(!getCheckoutValidationError({ requireAuthReady: true }));

  return (
    <div className="flat-spacing-25">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-xl-8">
              <div className="tf-checkout-cart-main">
                <div className="box-ip-checkout">
                  <div className="title text-xl fw-medium">Checkout</div>
                  {error && (
                    <div
                      ref={errorRef}
                      className="alert alert-danger mb_16"
                      role="alert"
                      tabIndex={-1}
                    >
                      {error}
                    </div>
                  )}
                  <fieldset className="tf-field style-2 style-3 mb_16">
                    <input
                      className={`tf-field-input tf-input${user?.id ? " bg-light" : ""}`}
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete={user?.id ? "off" : "tel-national"}
                      value={formatBrazilPhoneDisplay(phone)}
                      onChange={
                        user?.id
                          ? undefined
                          : (e) => setPhone(brazilPhoneNationalDigits(e.target.value))
                      }
                      readOnly={Boolean(user?.id)}
                      aria-readonly={user?.id ? "true" : undefined}
                      placeholder="+55 (11) 9 9999-9999"
                    />
                    <label className="tf-field-label" htmlFor="phone">
                      {user?.id ? "Telefone (cadastro)" : "Telefone"}
                    </label>
                  </fieldset>
                  {user?.id && (
                    <p className="text-sm text-dark-4 mb_12">
                      O telefone da sua conta não pode ser alterado nesta etapa. O pedido será associado a este número.
                    </p>
                  )}
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
                  <div className="grid-3 mb_16">
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
                  </div>
                  <div className="grid-2 mb_16" style={{ gap: "12px" }}>
                    <fieldset className="tf-field style-2 style-3 mb-0">
                      <input
                        className="tf-field-input tf-input"
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder=""
                        autoComplete="street-address"
                      />
                      <label className="tf-field-label" htmlFor="address">
                        Endereço (logradouro)
                      </label>
                    </fieldset>
                    <fieldset className="tf-field style-2 style-3 mb-0">
                      <input
                        className="tf-field-input tf-input"
                        id="addressNumber"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={addressNumber}
                        onChange={(e) => setAddressNumber(onlyDigits(e.target.value))}
                        placeholder=""
                        autoComplete="off"
                        maxLength={30}
                      />
                      <label className="tf-field-label" htmlFor="addressNumber">Número</label>
                    </fieldset>
                  </div>
                  <fieldset className="tf-field style-2 style-3 mb_16">
                    <input
                      className="tf-field-input tf-input"
                      id="complement"
                      type="text"
                      value={complement}
                      onChange={(e) => setComplement(e.target.value)}
                      placeholder=""
                    />
                    <label className="tf-field-label" htmlFor="complement">Complemento</label>
                  </fieldset>
                  <fieldset className="tf-field style-2 style-3 mb_16">
                    <textarea
                      id="deliveryInstructions"
                      className="tf-field-input tf-input"
                      rows={4}
                      placeholder=" "
                      value={deliveryInstructions}
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
                    />
                    <label className="tf-field-label" htmlFor="deliveryInstructions">
                      Instruções para o entregador (opcional)
                    </label>
                  </fieldset>
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
                      to={`/politica-de-privacidade`}
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
                    className="tf-btn btn-dark2 animate-btn w-100 checkout-finalize-btn"
                    disabled={submitting || !canFinalize}
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
