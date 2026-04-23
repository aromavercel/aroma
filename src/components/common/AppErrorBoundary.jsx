import React from "react";
import { Link } from "react-router-dom";

export default class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Mantém log só para dev; em produção podemos plugar Sentry.
    // eslint-disable-next-line no-console
    console.error("AppErrorBoundary:", error, info);
  }

  handleReload = () => {
    if (typeof window !== "undefined") window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="container" style={{ padding: "64px 16px" }}>
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            border: "1px solid rgba(0,0,0,0.12)",
            borderRadius: 16,
            padding: 24,
            background: "white",
          }}
        >
          <h2 style={{ marginBottom: 8 }}>Algo deu errado</h2>
          <p style={{ marginBottom: 16, color: "rgba(0,0,0,0.7)" }}>
            Ocorreu um erro inesperado. Você pode recarregar a página ou voltar ao início.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button type="button" className="tf-btn btn-dark2 animate-btn" onClick={this.handleReload}>
              Recarregar
            </button>
            <Link to="/" className="tf-btn btn-out-line-dark-2 animate-btn">
              Ir para Início
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

