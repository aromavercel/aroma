import { sql } from "../db.js";
import { getBearerToken, verifyToken } from "../auth.js";
import { normalizePhone } from "../phone.js";
import { cartPhoneCandidateKeys } from "../cartPhoneResolve.js";

function toUser(row) {
  return {
    id: row.id,
    email: row.email,
    name: row.name ?? null,
    avatar_url: row.avatar_url ?? null,
    birth_date: row.birth_date ?? null,
    city: row.city ?? null,
    state: row.state ?? null,
    country: row.country ?? null,
    phone: row.phone ?? null,
    address: row.address ?? null,
    address_number: row.address_number ?? null,
    address_complement: row.address_complement ?? null,
    zipcode: row.zipcode ?? null,
    delivery_instructions: row.delivery_instructions ?? null,
    role: row.role ?? "user",
    created_at: row.created_at,
    updated_at: row.updated_at ?? row.created_at,
  };
}

export async function handleMe(req, res) {
  const token = getBearerToken(req);
  const payload = verifyToken(token);
  if (!payload?.userId) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }

  if (!sql) {
    return res.status(503).json({ error: "Banco de dados não configurado" });
  }

  if (req.method === "GET") {
    try {
      let rows;
      try {
        rows = await sql`
          SELECT id, email, name, avatar_url, birth_date, city, state, country, phone,
            address, address_number, address_complement, zipcode, delivery_instructions,
            role, created_at, updated_at
          FROM users
          WHERE id = ${payload.userId}
        `;
      } catch (schemaErr) {
        if (schemaErr?.code !== "42703") throw schemaErr;
        rows = await sql`
          SELECT id, email, name, created_at, updated_at
          FROM users
          WHERE id = ${payload.userId}
        `;
        if (rows.length > 0) {
          rows[0].avatar_url = null;
          rows[0].birth_date = null;
          rows[0].city = null;
          rows[0].state = null;
          rows[0].country = null;
          rows[0].phone = null;
          rows[0].address = null;
          rows[0].address_number = null;
          rows[0].address_complement = null;
          rows[0].zipcode = null;
          rows[0].delivery_instructions = null;
          rows[0].role = "user";
        }
      }
      if (!rows || rows.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      return res.status(200).json({ user: toUser(rows[0]) });
    } catch (err) {
      console.error("Me GET error:", err);
      return res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  if (req.method === "PATCH") {
    try {
      let current;
      try {
        [current] = await sql`
          SELECT id, email, name, avatar_url, birth_date, city, state, country, phone,
            address, address_number, address_complement, zipcode, delivery_instructions,
            role, created_at, updated_at
          FROM users WHERE id = ${payload.userId}
        `;
      } catch (schemaErr) {
        if (schemaErr?.code !== "42703") throw schemaErr;
        [current] = await sql`
          SELECT id, email, name, avatar_url, birth_date, city, state, country, phone, role, created_at, updated_at
          FROM users WHERE id = ${payload.userId}
        `;
        if (current) {
          current.address = null;
          current.address_number = null;
          current.address_complement = null;
          current.zipcode = null;
          current.delivery_instructions = null;
        }
      }
      if (!current) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      let body = req.body;
      if (typeof body === "string") {
        try {
          body = JSON.parse(body);
        } catch {
          body = {};
        }
      }
      body = body || {};
      const name =
        typeof body.name === "string"
          ? body.name.trim() || null
          : current.name;
      const avatar_url =
        body.avatar_url !== undefined
          ? typeof body.avatar_url === "string"
            ? body.avatar_url.trim() || null
            : null
          : current.avatar_url;
      const birth_date =
        body.birth_date !== undefined
          ? body.birth_date === "" || body.birth_date === null
            ? null
            : body.birth_date
          : current.birth_date;
      const city =
        body.city !== undefined
          ? typeof body.city === "string"
            ? body.city.trim() || null
            : null
          : current.city;
      const state =
        body.state !== undefined
          ? typeof body.state === "string"
            ? body.state.trim() || null
            : null
          : current.state;
      const country =
        body.country !== undefined
          ? typeof body.country === "string"
            ? body.country.trim() || null
            : null
          : current.country;
      const address =
        body.address !== undefined
          ? typeof body.address === "string"
            ? body.address.trim() || null
            : null
          : current.address;
      const address_number =
        body.address_number !== undefined
          ? typeof body.address_number === "string"
            ? body.address_number.trim() || null
            : null
          : current.address_number;
      const address_complement =
        body.address_complement !== undefined
          ? typeof body.address_complement === "string"
            ? body.address_complement.trim() || null
            : null
          : current.address_complement;
      const zipcode =
        body.zipcode !== undefined
          ? typeof body.zipcode === "string"
            ? body.zipcode.trim() || null
            : null
          : current.zipcode;
      const delivery_instructions =
        body.delivery_instructions !== undefined
          ? typeof body.delivery_instructions === "string"
            ? body.delivery_instructions.trim() || null
            : null
          : current.delivery_instructions;

      let phone =
        body.phone !== undefined
          ? typeof body.phone === "string"
            ? body.phone.trim() || null
            : current.phone
          : current.phone;

      if (body.phone !== undefined && typeof body.phone === "string") {
        const raw = body.phone.trim();
        if (raw === "") {
          phone = null;
        } else {
          const cc = String(country || current.country || "BR");
          const isBr =
            cc.toUpperCase().includes("BR") ||
            cc.toLowerCase().includes("brasil") ||
            cc.toLowerCase().includes("brazil");
          if (isBr) {
            try {
              const nextPhone = normalizePhone(raw, "BR");
              if (current.phone && nextPhone) {
                for (const oldk of cartPhoneCandidateKeys(current.phone)) {
                  if (oldk === nextPhone) continue;
                  try {
                    await sql`UPDATE carts SET user_phone = ${nextPhone} WHERE user_phone = ${oldk}`;
                  } catch {
                    /* ignora */
                  }
                  try {
                    await sql`UPDATE wishlists SET user_phone = ${nextPhone} WHERE user_phone = ${oldk}`;
                  } catch {
                    /* ignora */
                  }
                }
              }
              phone = nextPhone;
            } catch {
              return res.status(400).json({ error: "Telefone inválido" });
            }
          } else {
            phone = raw;
          }
        }
      }

      let updated;
      try {
        [updated] = await sql`
          UPDATE users
          SET name = ${name}, avatar_url = ${avatar_url}, birth_date = ${birth_date},
              city = ${city}, state = ${state}, country = ${country},
              address = ${address}, address_number = ${address_number}, address_complement = ${address_complement},
              zipcode = ${zipcode}, delivery_instructions = ${delivery_instructions},
              phone = ${phone},
              updated_at = now()
          WHERE id = ${payload.userId}
          RETURNING id, email, name, avatar_url, birth_date, city, state, country, phone,
            address, address_number, address_complement, zipcode, delivery_instructions,
            role, created_at, updated_at
        `;
      } catch (updErr) {
        if (updErr?.code !== "42703") throw updErr;
        [updated] = await sql`
          UPDATE users
          SET name = ${name}, avatar_url = ${avatar_url}, birth_date = ${birth_date},
              city = ${city}, state = ${state}, country = ${country}, phone = ${phone},
              updated_at = now()
          WHERE id = ${payload.userId}
          RETURNING id, email, name, avatar_url, birth_date, city, state, country, phone, role, created_at, updated_at
        `;
        if (updated) {
          updated.address = address ?? null;
          updated.address_number = address_number ?? null;
          updated.address_complement = address_complement ?? null;
          updated.zipcode = zipcode ?? null;
          updated.delivery_instructions = delivery_instructions ?? null;
        }
      }

      return res.status(200).json({ user: toUser(updated) });
    } catch (err) {
      console.error("Me PATCH error:", err);
      return res.status(500).json({ error: "Erro ao atualizar perfil" });
    }
  }

  return res.status(405).json({ error: "Método não permitido" });
}
