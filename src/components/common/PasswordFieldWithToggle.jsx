import React, { useId, useState } from "react";

function IconEyeOpen() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconEyeClosed() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

/**
 * Campo de senha com botão para alternar visibilidade (acessível).
 */
export default function PasswordFieldWithToggle({
  id: idProp,
  value,
  onChange,
  placeholder,
  required,
  minLength,
  autoComplete = "current-password",
  name,
}) {
  const reactId = useId();
  const inputId = idProp ?? `pwd-${reactId}`;
  const [visible, setVisible] = useState(false);

  return (
    <div className="position-relative">
      <input
        id={inputId}
        name={name}
        type={visible ? "text" : "password"}
        className="pe-5"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        className="position-absolute top-50 end-0 translate-middle-y d-flex align-items-center justify-content-center p-2 me-1 border-0 bg-transparent shadow-none"
        style={{
          lineHeight: 0,
          color: "var(--dark)",
          cursor: "pointer",
        }}
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
        aria-pressed={visible}
      >
        {visible ? <IconEyeClosed /> : <IconEyeOpen />}
      </button>
    </div>
  );
}
