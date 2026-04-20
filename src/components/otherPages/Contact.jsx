import React, { useState } from "react";
import { sendContactMessage } from "@/api/contact";
import AromaSocialIcons from "@/components/common/AromaSocialIcons";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      await sendContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      setSuccess("Mensagem enviada com sucesso! Em breve entraremos em contato.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message || "Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="s-contact flat-spacing-13">
      <div className="container">
        <div className="row mb-4 mb-lg-5">
          <div className="col-lg-12">
            <div className="position-relative overflow-hidden rounded-4">
              <img
                src="/images/banner/fashion-1.jpg"
                alt="Contato Aroma"
                className="w-100"
                style={{ maxHeight: 400, objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-lg-6 mt-4 mt-lg-5">
            <div className="content-left">
              <div className="title fw-medium display-md-2">Fale com a gente</div>
              <p className="sub-title text-main">
                Tem alguma dúvida sobre perfumes, pedidos ou parcerias? Entre em
                contato com a equipe Aroma pelos canais abaixo.
              </p>
              <ul className="contact-list">
                <li>
                  <p>
                    Endereço:{" "}
                    <span className="text-main">
                      Feira de Santana - BA (envios para todo o Brasil)
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    WhatsApp:{" "}
                    <a
                      className="link"
                      href="https://wa.me/5575999997821"
                      target="_blank"
                      rel="noreferrer"
                    >
                      (75) 99999-7821
                    </a>
                  </p>
                </li>
                <li>
                  <p>
                    E-mail:{" "}
                    <a className="link" href="mailto:contato@aromaexpresso.com">
                      contato@aromaexpresso.com
                    </a>
                  </p>
                </li>
                <li>
                  <p>
                    Horário de atendimento:{" "}
                    <span className="text-main">
                      Segunda a Sexta, das 9h às 18h
                    </span>
                  </p>
                </li>
              </ul>
              <AromaSocialIcons />
            </div>
          </div>
          <div className="col-lg-6 mt-4 mt-lg-5">
            <div className="content-right">
              <div className="title fw-medium display-md-2">
                Envie uma mensagem
              </div>
              <p className="sub-title text-main">
                Preencha o formulário abaixo e retornaremos o mais rápido
                possível.
              </p>
              <div className="form-contact-wrap">
                <form className="form-default" onSubmit={handleSubmit}>
                  <div className="wrap">
                    {error && (
                      <p className="text-danger small mb-2">{error}</p>
                    )}
                    {success && (
                      <p className="text-success small mb-2">{success}</p>
                    )}
                    <div className="cols">
                      <fieldset>
                        <label htmlFor="username">Seu nome*</label>
                        <input
                          id="username"
                          type="text"
                          name="username"
                          value={form.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          required
                        />
                      </fieldset>
                      <fieldset>
                        <label htmlFor="email">Seu e-mail*</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="cols">
                      <fieldset className="textarea">
                        <label htmlFor="mess">Mensagem</label>
                        <textarea
                          id="mess"
                          required
                          value={form.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                        />
                      </fieldset>
                    </div>
                    <div className="button-submit">
                      <button className="tf-btn animate-btn" type="submit" disabled={submitting}>
                        {submitting ? "Enviando..." : "Enviar mensagem"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
