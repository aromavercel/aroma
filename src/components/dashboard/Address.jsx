"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useContextElement } from "@/context/Context";
import { updateProfile } from "@/api/auth";

export default function Address() {
  const { user, setUser } = useContextElement();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
    address_complement: user?.address_complement || "",
    city: user?.city || "",
    state: user?.state || "",
    zipcode: user?.zipcode || "",
    country: user?.country || "Brasil",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        name: form.name,
        email: form.email,
        address: form.address,
        address_complement: form.address_complement,
        city: form.city,
        state: form.state,
        zipcode: form.zipcode,
        country: form.country,
      };
      const { user: updated } = await updateProfile(payload);
      setUser(updated);
      setEditing(false);
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro ao salvar endereço");
    } finally {
      setSaving(false);
    }
  };

  const hasAddress =
    !!user?.address ||
    !!user?.city ||
    !!user?.state ||
    !!user?.zipcode ||
    !!user?.country;

  return (
    <div className="flat-spacing-13">
      <div className="container-7">
        <div className="btn-sidebar-mb d-lg-none">
          <button data-bs-toggle="offcanvas" data-bs-target="#mbAccount">
            <i className="icon icon-sidebar" />
          </button>
        </div>

        <div className="main-content-account">
          <div className="sidebar-account-wrap sidebar-content-wrap sticky-top d-lg-block d-none">
            <ul className="my-account-nav">
              <Sidebar />
            </ul>
          </div>
          <div className="my-acount-content account-address">
            <h6 className="title-account">Endereço de entrega</h6>
            <div className="widget-inner-address">
              {error && (
                <div className="alert alert-danger text-sm mb-3" role="alert">
                  {error}
                </div>
              )}

              {!editing && (
                <>
                  {hasAddress ? (
                    <ul className="list-account-address tf-grid-layout md-col-2">
                      <li className="account-address-item">
                        <p className="title text-md fw-medium">
                          {user?.address || "Endereço principal"}
                        </p>
                        <div className="info-detail">
                          <div className="box-infor">
                            {user?.name && (
                              <p className="text-md">{user.name}</p>
                            )}
                            {user?.email && (
                              <p className="text-md">{user.email}</p>
                            )}
                            {user?.address && (
                              <p className="text-md">{user.address}</p>
                            )}
                            {user?.address_complement && (
                              <p className="text-md">
                                {user.address_complement}
                              </p>
                            )}
                            {(user?.city || user?.state) && (
                              <p className="text-md">
                                {[user.city, user.state].filter(Boolean).join(" - ")}
                              </p>
                            )}
                            {user?.zipcode && (
                              <p className="text-md">CEP: {user.zipcode}</p>
                            )}
                            {user?.country && (
                              <p className="text-md">{user.country}</p>
                            )}
                            {user?.phone && (
                              <p className="text-md">Telefone: {user.phone}</p>
                            )}
                          </div>
                          <div className="box-btn">
                            <button
                              className="tf-btn btn-out-line-dark btn-edit-address"
                              type="button"
                              onClick={() => setEditing(true)}
                            >
                              Editar endereço
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  ) : (
                    <div className="account-no-orders-wrap text-start">
                      <div className="display-sm fw-medium title mb-2">
                        Nenhum endereço cadastrado ainda
                      </div>
                      <div className="text text-sm mb-3">
                        Cadastre abaixo o endereço de entrega principal.
                      </div>
                      <button
                        type="button"
                        className="tf-btn btn-add-address animate-btn"
                        onClick={() => setEditing(true)}
                      >
                        Cadastrar endereço
                      </button>
                    </div>
                  )}
                </>
              )}

              {editing && (
                <form
                  onSubmit={handleSubmit}
                  className="wd-form-address form-default show-form-address"
                  style={{ display: "block" }}
                >
                  <div className="cols">
                    <fieldset>
                      <label htmlFor="name">Nome completo</label>
                      <input
                        type="text"
                        id="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="cols">
                    <fieldset>
                      <label htmlFor="email">E-mail para contato</label>
                      <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </fieldset>
                  </div>
                  <div className="cols">
                    <fieldset>
                      <label htmlFor="address">Endereço</label>
                      <input
                        type="text"
                        id="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="cols">
                    <fieldset>
                      <label htmlFor="address_complement">Complemento</label>
                      <input
                        type="text"
                        id="address_complement"
                        value={form.address_complement}
                        onChange={handleChange}
                      />
                    </fieldset>
                  </div>
                  <div className="cols">
                    <fieldset>
                      <label htmlFor="city">Cidade</label>
                      <input
                        type="text"
                        id="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="cols">
                    <fieldset>
                      <label htmlFor="state">Estado (UF)</label>
                      <input
                        type="text"
                        id="state"
                        value={form.state}
                        onChange={handleChange}
                      />
                    </fieldset>
                  </div>
                  <div className="cols">
                    <fieldset>
                      <label htmlFor="zipcode">CEP</label>
                      <input
                        type="text"
                        id="zipcode"
                        value={form.zipcode}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="cols">
                    <fieldset>
                      <label htmlFor="country">País</label>
                      <input
                        type="text"
                        id="country"
                        value={form.country}
                        onChange={handleChange}
                      />
                    </fieldset>
                  </div>
                  <div className="cols">
                    <fieldset>
                      <label htmlFor="phone">Telefone (whatsapp)</label>
                      <input
                        type="text"
                        id="phone"
                        value={form.phone}
                        onChange={handleChange}
                        disabled
                      />
                    </fieldset>
                  </div>
                  <div className="box-btn">
                    <button
                      className="tf-btn animate-btn"
                      type="submit"
                      disabled={saving}
                    >
                      {saving ? "Salvando..." : "Salvar endereço"}
                    </button>
                    <button
                      type="button"
                      className="tf-btn btn-out-line-dark btn-hide-address"
                      onClick={() => setEditing(false)}
                      disabled={saving}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
