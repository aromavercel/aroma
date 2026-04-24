import React, { useState } from "react";
import PasswordFieldWithToggle from "@/components/common/PasswordFieldWithToggle";
import {
  requestPasswordResetEmail,
  confirmPasswordResetEmail,
} from "@/api/auth";

export default function ResetPass() {
  const [step, setStep] = useState(1); // 1: solicitar código, 2: confirmar, 3: sucesso
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const closeAndReset = () => {
    setStep(1);
    setEmail("");
    setCode("");
    setNewPassword("");
    setError("");
    setSuccessMsg("");
  };

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);
    try {
      await requestPasswordResetEmail({ email });
      setStep(2);
      setSuccessMsg("Enviamos um código por e-mail para sua conta.");
    } catch (err) {
      setError(err?.message || "Erro ao solicitar o código.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);
    try {
      await confirmPasswordResetEmail({
        email,
        code,
        newPassword,
      });
      setStep(3);
      setSuccessMsg("Senha redefinida com sucesso. Faça login com a nova senha.");
    } catch (err) {
      setError(err?.message || "Erro ao redefinir a senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="offcanvas offcanvas-end popup-style-1 popup-reset-pass"
      id="resetPass"
    >
      <div className="canvas-wrapper">
        <div className="canvas-header popup-header">
          <span className="title">Redefinir senha</span>
          <button
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={closeAndReset}
          />
        </div>
        <div className="canvas-body popup-inner">
          {error && (
            <div className="alert alert-danger text-sm mb_12" role="alert">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="alert alert-success text-sm mb_12" role="status">
              {successMsg}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleRequestCode} className="form-login">
              <div className="">
                <p className="text text-sm text-main-2">
                  Informe seu e-mail cadastrado. Enviaremos um código por e-mail
                  para você redefinir sua senha.
                </p>

                <fieldset className="email mb_12">
                  <input
                    type="email"
                    placeholder="Digite seu e-mail*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </fieldset>
              </div>

              <div className="bot">
                <div className="button-wrap">
                  <button
                    className="subscribe-button tf-btn animate-btn bg-dark-2 w-100"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Enviando…" : "Receber código"}
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="offcanvas"
                    onClick={closeAndReset}
                    className="tf-btn btn-out-line-dark2 w-100"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleConfirmReset} className="form-login">
              <div className="">
                <fieldset className="email mb_12">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Código enviado por e-mail*"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </fieldset>

                <fieldset className="password">
                  <PasswordFieldWithToggle
                    placeholder="Nova senha*"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                </fieldset>
              </div>

              <div className="bot">
                <div className="button-wrap">
                  <button
                    className="subscribe-button tf-btn animate-btn bg-dark-2 w-100"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Confirmando…" : "Redefinir senha"}
                  </button>

                  <button
                    type="button"
                    data-bs-dismiss="offcanvas"
                    onClick={closeAndReset}
                    className="tf-btn btn-out-line-dark2 w-100 mb_8"
                  >
                    Cancelar
                  </button>

                  <button
                    type="button"
                    className="tf-btn btn-out-line-dark2 w-100"
                    onClick={() => {
                      setStep(1);
                      setError("");
                      setSuccessMsg("");
                      setCode("");
                      setNewPassword("");
                    }}
                  >
                    Voltar
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === 3 && (
            <div>
              <div className="bot">
                <div className="button-wrap">
                  <button
                    type="button"
                    data-bs-target="#login"
                    data-bs-toggle="offcanvas"
                    className="subscribe-button tf-btn animate-btn bg-dark-2 w-100"
                    onClick={closeAndReset}
                  >
                    Ir para login
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="offcanvas"
                    onClick={closeAndReset}
                    className="tf-btn btn-out-line-dark2 w-100 mt_8"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
