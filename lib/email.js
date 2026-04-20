import nodemailer from "nodemailer";

function getMailTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendEmail({ to, subject, text, html }) {
  const transport = getMailTransport();
  if (!transport) {
    throw new Error("Envio de e-mail não está configurado (SMTP_HOST/SMTP_USER/SMTP_PASS)");
  }

  const from = (process.env.SMTP_FROM || process.env.SMTP_USER || "").trim();
  if (!from) {
    throw new Error("SMTP_FROM/SMTP_USER não definido");
  }

  return transport.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
}

