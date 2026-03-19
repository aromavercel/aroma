import React, { useEffect, useState } from "react";
import { getAdminAccessInfo } from "@/api/admin";

export default function AdminAccessPage() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAdminAccessInfo().then(setInfo).catch((err) => setError(err.message || "Erro ao carregar dados")).finally(() => setLoading(false));
  }, []);

  return (
    <div className="account-dashboard">
      <h5 className="title-account mb-3">Dados de acesso ao site</h5>
      <p className="text-muted mb-4">Informações de deploy fornecidas pelo ambiente (Vercel). Variáveis sensíveis e configurações completas ficam no dashboard da Vercel.</p>
      {loading ? <p className="text-muted">Carregando...</p> : error ? <p className="text-muted">{error}</p> : info ? (
        <div className="rounded bg-light p-4">
          <dl className="row mb-0">
            {info.deployment_url && (<><dt className="col-sm-3 text-main-2">URL do deploy</dt><dd className="col-sm-9"><a href={info.deployment_url} target="_blank" rel="noopener noreferrer" className="link">{info.deployment_url}</a></dd></>)}
            {info.api_url && (<><dt className="col-sm-3 text-main-2">API</dt><dd className="col-sm-9 font-monospace text-sm">{info.api_url}</dd></>)}
            {info.note && (<><dt className="col-sm-3 text-main-2">Observação</dt><dd className="col-sm-9 text-sm">{info.note}</dd></>)}
          </dl>
          <p className="mt-3 mb-0 text-sm text-main-2">
            Para variáveis de ambiente, domínios e logs, acesse o <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer" className="link">dashboard da Vercel</a> → seu projeto → Settings.
          </p>
        </div>
      ) : null}
    </div>
  );
}
