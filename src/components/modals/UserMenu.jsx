import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import { updateProfile, uploadAvatar } from "@/api/auth";
import { BR_STATES, COUNTRY_BR_LABEL, fetchBrazilCitiesByUF } from "@/utils/brLocations";

function ageFromBirthDate(birthDate) {
  if (!birthDate) return null;
  const d = new Date(birthDate);
  if (Number.isNaN(d.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age >= 0 ? age : null;
}

function formatLocation(user) {
  const parts = [user.city, user.state].filter(Boolean);
  return parts.length ? parts.join(", ") : null;
}

export default function UserMenu() {
  const { user, setUser, logout } = useContextElement();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [form, setForm] = useState({
    name: "",
    avatar_url: "",
    birth_date: "",
    city: "",
    state: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        avatar_url: user.avatar_url || "",
        birth_date: user.birth_date ? user.birth_date.slice(0, 10) : "",
        city: user.city || "",
        state: user.state || "",
        email: user.email || "",
      });
    }
  }, [user]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const uf = (form.state || "").trim().toUpperCase();
      if (!uf) {
        setCities([]);
        return;
      }
      setLoadingCities(true);
      try {
        const list = await fetchBrazilCitiesByUF(uf);
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
  }, [form.state]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    document.querySelector("#userMenu .icon-close-popup")?.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      setError("Use uma imagem JPEG, PNG, WebP ou GIF.");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setError("Imagem muito grande. Máximo 4 MB.");
      return;
    }
    setError("");
    setUploadingPhoto(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const url = await uploadAvatar(reader.result);
        setForm((f) => ({ ...f, avatar_url: url }));
      } catch (err) {
        setError(err.message || "Erro ao enviar foto");
      } finally {
        setUploadingPhoto(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const updated = await updateProfile({
        name: form.name || null,
        avatar_url: form.avatar_url || null,
        birth_date: form.birth_date || null,
        city: form.city || null,
        state: form.state || null,
        country: COUNTRY_BR_LABEL,
        email: form.email || null,
      });
      setUser(updated);
      setEditing(false);
    } catch (err) {
      setError(err.message || "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  const age = ageFromBirthDate(user.birth_date);
  const location = formatLocation(user);

  return (
    <div
      className="offcanvas offcanvas-end popup-style-1 popup-login"
      id="userMenu"
      tabIndex="-1"
    >
      <div className="canvas-wrapper">
        <div className="canvas-header popup-header">
          <span className="title">Minha conta</span>
          <button
            type="button"
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
            aria-label="Fechar"
          />
        </div>
        <div className="canvas-body popup-inner">
          {!editing ? (
            <>
              <div className="mb_12">
                {user.avatar_url ? (
                  <div className="mb_12 text-center">
                    <img
                      src={user.avatar_url}
                      alt="Avatar"
                      className="rounded-circle"
                      style={{ width: 80, height: 80, objectFit: "cover" }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center mb_12 mx-auto"
                    style={{ width: 80, height: 80 }}
                  >
                    <i className="icon icon-user text-main-2" style={{ fontSize: "2rem" }} />
                  </div>
                )}
                {user.name ? (
                  <p className="text-sm text-main-2 mb_8">
                    <strong>{user.name}</strong>
                  </p>
                ) : null}
                {user.phone && (
                  <p className="text-sm text-main-2 mb_8">
                    <span className="text-muted">Telefone:</span> {user.phone}
                  </p>
                )}
                {user.email && (
                  <p className="text-sm text-main-2 mb_8">
                    <span className="text-muted">E-mail:</span> {user.email}
                  </p>
                )}
                {age != null && (
                  <p className="text-sm text-main-2 mb_8">
                    <span className="text-muted">Idade:</span> {age} anos
                  </p>
                )}
                {location && (
                  <p className="text-sm text-main-2 mb_8">
                    <span className="text-muted">Localização:</span> {location}
                  </p>
                )}
              </div>
              <div className="button-wrap">
                <Link
                  to="/account-page"
                  className="subscribe-button tf-btn animate-btn bg-dark-2 w-100 mb_8 d-block text-center text-decoration-none"
                  onClick={() => document.querySelector("#userMenu .icon-close-popup")?.click()}
                >
                  Minha conta
                </Link>
                <button
                  type="button"
                  className="tf-btn btn-out-line-dark2 w-100 mb_8"
                  onClick={() => setEditing(true)}
                >
                  Editar perfil
                </button>
                <button
                  type="button"
                  className="tf-btn btn-out-line-dark2 w-100"
                  onClick={handleLogout}
                >
                  Sair
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSave} className="form-login">
              {error && (
                <div className="alert alert-danger text-sm mb_12" role="alert">
                  {error}
                </div>
              )}
              <div className="mb_12 text-center">
                {form.avatar_url ? (
                  <img
                    src={form.avatar_url}
                    alt="Preview"
                    className="rounded-circle mb_8"
                    style={{ width: 80, height: 80, objectFit: "cover" }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center mb_8 mx-auto"
                    style={{ width: 80, height: 80 }}
                  >
                    <i className="icon icon-user text-main-2" style={{ fontSize: "2rem" }} />
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="d-none"
                  onChange={handlePhotoChange}
                />
                <button
                  type="button"
                  className="tf-btn btn-out-line-dark2 w-100 mb_8"
                  disabled={uploadingPhoto}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploadingPhoto ? "Enviando…" : "Enviar foto"}
                </button>
                <label className="text-sm text-main-2 d-block text-start mb_4">
                  Ou colar URL da foto
                </label>
                <input
                  type="url"
                  className="form-control mb_12"
                  placeholder="https://..."
                  value={form.avatar_url}
                  onChange={(e) => setForm((f) => ({ ...f, avatar_url: e.target.value }))}
                />
              </div>
              <fieldset className="mb_12">
                <label className="text-sm text-main-2 d-block mb_4">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </fieldset>
              <fieldset className="mb_12">
                <label className="text-sm text-main-2 d-block mb_4">Data de nascimento</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.birth_date}
                  onChange={(e) => setForm((f) => ({ ...f, birth_date: e.target.value }))}
                />
              </fieldset>
              <fieldset className="mb_12">
                <label className="text-sm text-main-2 d-block mb_4">Cidade</label>
                <select
                  className="form-control"
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  disabled={!form.state || loadingCities}
                >
                  <option value="">
                    {!form.state
                      ? "Selecione o estado primeiro"
                      : loadingCities
                        ? "Carregando cidades…"
                        : "Selecione a cidade"}
                  </option>
                  {cities.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </fieldset>
              <fieldset className="mb_12">
                <label className="text-sm text-main-2 d-block mb_4">Estado</label>
                <select
                  className="form-control"
                  value={form.state}
                  onChange={(e) => {
                    const next = e.target.value;
                    setForm((f) => ({ ...f, state: next, city: "" }));
                  }}
                >
                  {BR_STATES.map((opt) => (
                    <option key={opt.value || "empty"} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </fieldset>
              <fieldset className="mb_12">
                <label className="text-sm text-main-2 d-block mb_4">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="E-mail (opcional)"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </fieldset>
              <div className="button-wrap">
                <button
                  type="submit"
                  className="subscribe-button tf-btn animate-btn bg-dark-2 w-100 mb_8"
                  disabled={saving}
                >
                  {saving ? "Salvando…" : "Salvar"}
                </button>
                <button
                  type="button"
                  className="tf-btn btn-out-line-dark2 w-100"
                  onClick={() => {
                    setEditing(false);
                    setError("");
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
