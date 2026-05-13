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
/** Rascunho do endereço ao abrir login/cadastro a partir do checkout — reaplica e persiste após auth. */
const CHECKOUT_AUTH_DRAFT_KEY = "aroma_checkout_auth_draft_v1";

/** Campos do checkout a partir do objeto usuário retornado por GET /api/me (ou contexto). */
function profileToCheckoutFields(me) {
  const nameParts = String(me?.name || "").trim().split(/\s+/);
  return {
    firstname: nameParts[0] || "",
    lastname: nameParts.slice(1).join(" ") || "",
    address: String(me?.address ?? "").trim(),
    addressNumber: onlyDigits(me?.address_number ?? ""),
    complement: String(me?.address_complement ?? "").trim(),
    deliveryInstructions: String(me?.delivery_instructions ?? "").trim(),
    city: String(me?.city ?? "").trim(),
    state: String(me?.state ?? "").trim(),
    zipcode: formatCep(me?.zipcode ?? ""),
    phone: brazilPhoneNationalDigits(me?.phone ?? ""),
  };
}

/** Preenche com o perfil sem apagar o que o visitante já digitou no checkout (campos vazios no perfil não sobrescrevem). */
function mergeProfileIntoCheckoutState(me, s) {
  const f = profileToCheckoutFields(me);
  const has = (v) => String(v ?? "").trim() !== "";
  s.setFirstname((p) => (has(f.firstname) ? f.firstname : p));
  s.setLastname((p) => (has(f.lastname) ? f.lastname : p));
  s.setAddress((p) => (has(f.address) ? f.address : p));
  s.setAddressNumber((p) => (has(f.addressNumber) ? f.addressNumber : p));
  s.setComplement((p) => (has(f.complement) ? f.complement : p));
  s.setDeliveryInstructions((p) => (has(f.deliveryInstructions) ? f.deliveryInstructions : p));
  s.setCity((p) => (has(f.city) ? f.city : p));
  s.setUf((p) => (has(f.state) ? f.state : p));
  s.setZipcode((p) => (has(f.zipcode) ? f.zipcode : p));
  s.setPhone((p) => (has(f.phone) ? f.phone : p));
}

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
  /** Chaves de campo com erro após tentar finalizar (borda vermelha). */
  const [checkoutFieldErrors, setCheckoutFieldErrors] = useState({});

  // Visitante: formulário sempre vazio (sem rascunho em sessionStorage).
  useEffect(() => {
    if (user?.id) return;
    setFirstname("");
    setLastname("");
    setAddress("");
    setAddressNumber("");
    setComplement("");
    setDeliveryInstructions("");
    setCity("");
    setState("");
    setZipcode("");
    setPhone("");
    try {
      sessionStorage.removeItem(CHECKOUT_DRAFT_KEY);
      sessionStorage.removeItem(CHECKOUT_AUTH_DRAFT_KEY);
    } catch {
      // ignora
    }
  }, [user?.id]);

  // Logado: mescla perfil com o formulário (evita apagar endereço após cadastro/login no checkout) + persiste rascunho do auth.
  useEffect(() => {
    if (!user?.id) return;
    const snapshot = user;
    const setters = {
      setFirstname,
      setLastname,
      setAddress,
      setAddressNumber,
      setComplement,
      setDeliveryInstructions,
      setCity,
      setUf: setState,
      setZipcode,
      setPhone,
    };
    mergeProfileIntoCheckoutState(snapshot, setters);
    try {
      sessionStorage.removeItem(CHECKOUT_DRAFT_KEY);
    } catch {
      // ignora
    }
    let cancelled = false;
    (async () => {
      try {
        const me = await getMe();
        if (cancelled || !me?.id) return;
        mergeProfileIntoCheckoutState(me, setters);

        let raw = "";
        try {
          raw = sessionStorage.getItem(CHECKOUT_AUTH_DRAFT_KEY) || "";
        } catch {
          raw = "";
        }
        if (raw) {
          let d = null;
          try {
            d = JSON.parse(raw);
          } catch {
            d = null;
          }
          try {
            sessionStorage.removeItem(CHECKOUT_AUTH_DRAFT_KEY);
          } catch {
            // ignora
          }
          if (d && typeof d === "object") {
            const hasAny = [
              d.firstname,
              d.lastname,
              d.address,
              d.addressNumber,
              d.zipcode,
              d.city,
              d.state,
              d.complement,
              d.deliveryInstructions,
            ].some((x) => String(x ?? "").trim());
            if (hasAny) {
              if (String(d.firstname ?? "").trim()) setFirstname(String(d.firstname).trim());
              if (String(d.lastname ?? "").trim()) setLastname(String(d.lastname).trim());
              if (String(d.address ?? "").trim()) setAddress(String(d.address).trim());
              if (String(d.addressNumber ?? "").trim()) setAddressNumber(String(d.addressNumber).trim());
              if (String(d.complement ?? "").trim()) setComplement(String(d.complement).trim());
              if (String(d.deliveryInstructions ?? "").trim()) {
                setDeliveryInstructions(String(d.deliveryInstructions).trim());
              }
              if (String(d.city ?? "").trim()) setCity(String(d.city).trim());
              if (String(d.state ?? "").trim()) setState(String(d.state).trim());
              if (String(d.zipcode ?? "").trim()) setZipcode(String(d.zipcode).trim());

              const nm = [d.firstname, d.lastname]
                .map((x) => String(x ?? "").trim())
                .filter(Boolean)
                .join(" ");
              try {
                await updateProfile({
                  name: nm || undefined,
                  address: String(d.address ?? "").trim() || null,
                  address_number: String(d.addressNumber ?? "").trim() || null,
                  address_complement: String(d.complement ?? "").trim() || null,
                  zipcode: String(d.zipcode ?? "").trim() || null,
                  city: String(d.city ?? "").trim() || null,
                  state: String(d.state ?? "").trim() || null,
                  country: COUNTRY_BR_LABEL,
                  delivery_instructions: String(d.deliveryInstructions ?? "").trim() || null,
                });
                const me2 = await getMe();
                if (!cancelled && me2?.id) {
                  setUser(me2);
                  mergeProfileIntoCheckoutState(me2, setters);
                }
              } catch {
                // mantém o formulário local mesmo se PATCH falhar
              }
            }
          }
        }
      } catch {
        // mantém o snapshot já aplicado
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

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

  const getCheckoutInvalidDetails = useCallback(
    ({ requireAuthReady = false } = {}) => {
      const fields = {};
      const mark = (key) => {
        fields[key] = true;
      };

      if (cartLoading) {
        return { message: "", fields: {}, focusId: null };
      }
      if (!Array.isArray(cartProducts) || cartProducts.length === 0) {
        return {
          message: "Seu carrinho está vazio.",
          fields: {},
          focusId: null,
        };
      }

      const name = [firstname, lastname].filter(Boolean).join(" ").trim();
      if (!name) {
        mark("firstname");
        mark("lastname");
        return {
          message: "Preencha seu nome.",
          fields,
          focusId: "firstname",
        };
      }
      if (!address?.trim()) {
        mark("address");
        return {
          message: "Preencha o logradouro.",
          fields,
          focusId: "address",
        };
      }
      if (!addressNumber?.trim()) {
        mark("addressNumber");
        return {
          message: "Preencha o número.",
          fields,
          focusId: "addressNumber",
        };
      }
      if (!city?.trim()) {
        mark("city");
        return {
          message: "Preencha a cidade.",
          fields,
          focusId: "city",
        };
      }

      if (!user?.id) {
        const trimmed = phone.trim();
        if (!trimmed) {
          mark("phone");
          return {
            message: "Informe seu telefone com DDD.",
            fields,
            focusId: "phone",
          };
        }
        if (!isValidBrazilPhoneInput(trimmed)) {
          mark("phone");
          return {
            message: "Informe um telefone válido com DDD.",
            fields,
            focusId: "phone",
          };
        }
        if (requireAuthReady && phoneRegistry === "checking") {
          mark("phone");
          return {
            message: "Aguarde a verificação do telefone.",
            fields,
            focusId: "phone",
          };
        }
        if (requireAuthReady && phoneRegistry !== "exists" && phoneRegistry !== "absent") {
          mark("phone");
          return {
            message: "Aguarde a verificação do telefone.",
            fields,
            focusId: "phone",
          };
        }
      }

      if (user?.id) {
        const accountPhone = String(user.phone ?? "").trim();
        const contactPhone = (phone.trim() || accountPhone).trim();
        if (!contactPhone) {
          mark("phone");
          return {
            message: "É necessário um telefone para contato na entrega.",
            fields,
            focusId: "phone",
          };
        }
        if (phone.trim() && !isValidBrazilPhoneInput(phone.trim())) {
          mark("phone");
          return {
            message: "Informe um telefone válido com DDD.",
            fields,
            focusId: "phone",
          };
        }
      }

      return { message: "", fields: {}, focusId: null };
    },
    [
      address,
      addressNumber,
      cartLoading,
      cartProducts,
      city,
      firstname,
      lastname,
      phone,
      phoneRegistry,
      user?.id,
      user?.phone,
    ],
  );

  const getCheckoutValidationError = useCallback(
    (opts) => getCheckoutInvalidDetails(opts).message,
    [getCheckoutInvalidDetails],
  );

  const scrollCheckoutToTarget = useCallback((focusId) => {
    const topOffset = 24;
    const run = () => {
      const el = focusId
        ? document.getElementById(focusId)
        : errorRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const y = Math.max(0, rect.top + window.scrollY - topOffset);
      try {
        window.scrollTo({ top: y, behavior: "smooth" });
      } catch {
        window.scrollTo(0, y);
      }
      try {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch {
        el.scrollIntoView();
      }
      try {
        if (focusId && typeof el.focus === "function") el.focus({ preventScroll: true });
      } catch {
        try {
          el.focus();
        } catch {
          // ignora
        }
      }
    };
    requestAnimationFrame(() => requestAnimationFrame(run));
  }, []);

  const stashPhoneAndOpenAuth = async (targetId) => {
    try {
      sessionStorage.setItem("checkoutAuthPhone", brazilPhoneNationalDigits(phone));
      sessionStorage.setItem("checkoutAuthFirstname", String(firstname || "").trim());
      sessionStorage.setItem("checkoutAuthLastname", String(lastname || "").trim());
      sessionStorage.setItem(
        CHECKOUT_AUTH_DRAFT_KEY,
        JSON.stringify({
          firstname: String(firstname || "").trim(),
          lastname: String(lastname || "").trim(),
          address: String(address || "").trim(),
          addressNumber: String(addressNumber || "").trim(),
          complement: String(complement || "").trim(),
          deliveryInstructions: String(deliveryInstructions || "").trim(),
          city: String(city || "").trim(),
          state: String(state || "").trim(),
          zipcode: String(zipcode || "").trim(),
        }),
      );
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
      const invalid = getCheckoutInvalidDetails({ requireAuthReady: !user?.id });
      if (invalid.message) {
        setError(invalid.message);
        setCheckoutFieldErrors(invalid.fields);
        scrollCheckoutToTarget(invalid.focusId);
        return;
      }
      setCheckoutFieldErrors({});

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
      const name = [firstname, lastname].filter(Boolean).join(" ").trim();
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
      getCheckoutInvalidDetails,
      navigate,
      phone,
      phoneRegistry,
      scrollCheckoutToTarget,
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
    // Erros de validação de campo já acionam scroll até o input; evita puxar só para o banner.
    if (Object.keys(checkoutFieldErrors).length > 0) return;
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
  }, [error, checkoutFieldErrors]);

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

  useEffect(() => {
    setCheckoutFieldErrors({});
    setError("");
  }, [firstname, lastname, address, addressNumber, city, state, zipcode, phone]);

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
                      className={`tf-field-input tf-input${user?.id ? " bg-light" : ""}${checkoutFieldErrors.phone ? " checkout-field-invalid" : ""}`}
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
                        className={`tf-field-input tf-input${checkoutFieldErrors.firstname ? " checkout-field-invalid" : ""}`}
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
                        className={`tf-field-input tf-input${checkoutFieldErrors.lastname ? " checkout-field-invalid" : ""}`}
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
                    <div className={`tf-select select-square${checkoutFieldErrors.city ? " checkout-field-invalid" : ""}`}>
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
                        className={`tf-field-input tf-input${checkoutFieldErrors.address ? " checkout-field-invalid" : ""}`}
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
                        className={`tf-field-input tf-input${checkoutFieldErrors.addressNumber ? " checkout-field-invalid" : ""}`}
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
                    disabled={submitting}
                    aria-disabled={!canFinalize && !submitting}
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
