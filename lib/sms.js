/**
 * Envio de SMS via Twilio (sem dependências adicionais).
 *
 * Env:
 * - TWILIO_ACCOUNT_SID
 * - TWILIO_AUTH_TOKEN
 * - TWILIO_FROM_NUMBER (ex.: +15551234567)
 */
export async function sendSmsTwilio({ to, body }) {
  const sid = process.env.TWILIO_ACCOUNT_SID || "";
  const token = process.env.TWILIO_AUTH_TOKEN || "";
  const from = process.env.TWILIO_FROM_NUMBER || "";

  if (!sid || !token || !from) {
    throw new Error(
      "Envio de SMS não configurado (TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_FROM_NUMBER)"
    );
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(
    sid
  )}/Messages.json`;

  const basic = Buffer.from(`${sid}:${token}`).toString("base64");
  const form = new URLSearchParams({ To: to, From: from, Body: body });

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: form,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Falha ao enviar SMS (status ${res.status}): ${text}`);
  }

  return res.json().catch(() => ({}));
}

