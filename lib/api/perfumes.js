import { sql } from "../db.js";
import { getBearerToken, verifyToken } from "../auth.js";

function toUuidKey(val) {
  if (val == null) return "";
  const s = String(val).trim().toLowerCase();
  return s.length > 10 ? s : "";
}

async function requireAdmin(req, res) {
  const token = getBearerToken(req);
  const payload = verifyToken(token);
  if (!payload?.userId) {
    res.status(401).json({ error: "Token inválido ou expirado" });
    return null;
  }
  if (!sql) {
    res.status(503).json({ error: "Banco de dados não configurado" });
    return null;
  }
  const rows = await sql`SELECT role FROM users WHERE id = ${payload.userId}`;
  const user = rows?.[0];
  if (!user) {
    res.status(403).json({ error: "Usuário não encontrado" });
    return null;
  }
  const role = (user.role || "user").toString().toLowerCase();
  if (role !== "admin") {
    res.status(403).json({ error: "Acesso negado. Apenas administradores." });
    return null;
  }
  return payload;
}

function buildListRow(p, imagesByPerfume) {
  const perfumeId = toUuidKey(p.id);
  let images = imagesByPerfume.get(perfumeId) ?? [];
  if (images.length === 0) {
    const vars = p.variants ?? [];
    const firstWithImg = vars.find((v) => v && (v.image_url || v.imageUrl));
    const url = firstWithImg && (firstWithImg.image_url ?? firstWithImg.imageUrl);
    if (url) images = [String(url).startsWith("//") ? "https:" + url : url];
  }
  if (images.length === 0 && p.image_2_url) {
    const u = String(p.image_2_url).trim();
    if (u) images = [u.startsWith("//") ? "https:" + u : u];
  }
  return {
    id: toUuidKey(p.id) || String(p.id ?? ""),
    url: p.external_url,
    title: p.title,
    description: p.description ?? "",
    catalogSource: p.catalog_source,
    notes: p.notes ?? {},
    variants: p.variants ?? [],
    images,
    ativo: p.ativo === true || p.ativo == null,
    esgotado: p.esgotado === true,
  };
}

async function handleList(req, res) {
  const catalog =
    typeof req.query?.catalog === "string" ? req.query.catalog.trim() : null;
  const allParam = req.query?.all === "1" || req.query?.all === "true";
  let onlyActive = true;
  if (allParam) {
    const payload = await requireAdmin(req, res);
    if (!payload) return;
    onlyActive = false;
  }
  let rows;
  try {
    if (catalog && ["arabe", "feminino", "normal"].includes(catalog)) {
      rows = onlyActive
        ? await sql`
        SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants, p.image_2_url, p.ativo, p.esgotado
        FROM perfumes p
        WHERE p.catalog_source = ${catalog} AND COALESCE(p.ativo, true) = true
        ORDER BY p.title
      `
        : await sql`
        SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants, p.image_2_url, p.ativo, p.esgotado
        FROM perfumes p
        WHERE p.catalog_source = ${catalog}
        ORDER BY p.title
      `;
    } else {
      rows = onlyActive
        ? await sql`
        SELECT id, external_url, title, description, catalog_source, notes, variants, image_2_url, ativo, esgotado
        FROM perfumes
        WHERE COALESCE(ativo, true) = true
        ORDER BY catalog_source, title
      `
        : await sql`
        SELECT id, external_url, title, description, catalog_source, notes, variants, image_2_url, ativo, esgotado
        FROM perfumes
        ORDER BY catalog_source, title
      `;
    }
  } catch (queryErr) {
    if (queryErr?.code !== "42703") throw queryErr;
    rows =
      catalog && ["arabe", "feminino", "normal"].includes(catalog)
        ? await sql`
      SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants, p.image_2_url
      FROM perfumes p
      WHERE p.catalog_source = ${catalog}
      ORDER BY p.title
    `
        : await sql`
      SELECT id, external_url, title, description, catalog_source, notes, variants, image_2_url
      FROM perfumes
      ORDER BY catalog_source, title
    `;
  }
  const idSet = new Set(rows.map((r) => toUuidKey(r.id)).filter(Boolean));
  const allImages =
    await sql`SELECT perfume_id, url, position FROM perfume_images ORDER BY perfume_id, position`;
  const imagesRows = idSet.size
    ? allImages.filter((r) => idSet.has(toUuidKey(r.perfume_id ?? r.perfumeId)))
    : [];
  const imagesByPerfume = new Map();
  for (const img of imagesRows) {
    const pid = toUuidKey(img.perfume_id ?? img.perfumeId);
    if (!pid) continue;
    const url =
      typeof (img.url ?? img.URL) === "string"
        ? (img.url ?? img.URL).trim()
        : "";
    if (!url) continue;
    const list = imagesByPerfume.get(pid) || [];
    const pos = Number(img.position ?? img.Position ?? list.length);
    list.push({ url, position: pos });
    imagesByPerfume.set(pid, list);
  }
  const imagesByPerfumeUrls = new Map();
  for (const [pid, arr] of imagesByPerfume) {
    arr.sort((a, b) => a.position - b.position);
    imagesByPerfumeUrls.set(
      pid,
      arr.map((x) => x.url),
    );
  }
  const list = rows.map((p) => buildListRow(p, imagesByPerfumeUrls));
  res.setHeader("Cache-Control", "no-store, max-age=0");
  return res.status(200).json(list);
}

async function handlePostCreate(req, res) {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  const body = req.body || {};
  const title = typeof body.title === "string" ? body.title.trim() : "";
  let externalUrl =
    typeof body.external_url === "string"
      ? body.external_url.trim()
      : typeof body.url === "string"
        ? body.url.trim()
        : "";
  const catalogSource =
    typeof body.catalog_source === "string"
      ? body.catalog_source.trim()
      : "";
  if (!title) return res.status(400).json({ error: "Título é obrigatório" });
  if (!externalUrl) externalUrl = null;
  if (!["arabe", "feminino", "normal"].includes(catalogSource))
    return res.status(400).json({
      error: "Catálogo deve ser: arabe, feminino ou normal",
    });
  const description =
    typeof body.description === "string"
      ? body.description.trim() || null
      : null;
  const notes =
    body.notes && typeof body.notes === "object" ? body.notes : {};
  const variants = Array.isArray(body.variants) ? body.variants : [];
  const rawImages = Array.isArray(body.images) ? body.images : [];
  const images = rawImages
    .map((u) => (typeof u === "string" ? u.trim() : ""))
    .filter(Boolean);
  const ativo = body.ativo !== false && body.ativo !== "false";
  const esgotado = body.esgotado === true || body.esgotado === "true";

  const [inserted] = await sql`
    INSERT INTO perfumes (external_url, title, description, catalog_source, notes, variants, ativo, esgotado)
    VALUES (${externalUrl}, ${title}, ${description}, ${catalogSource}, ${JSON.stringify(
      notes,
    )}, ${JSON.stringify(variants)}, ${ativo}, ${esgotado})
    RETURNING id, external_url, title, description, catalog_source, notes, variants, ativo, esgotado
  `;
  if (!inserted) return res.status(500).json({ error: "Erro ao criar perfume" });
  const perfumeId = inserted.id;
  for (let i = 0; i < images.length; i++) {
    await sql`
      INSERT INTO perfume_images (perfume_id, url, position)
      VALUES (${perfumeId}, ${images[i]}, ${i})
    `;
  }
  const imgRows =
    await sql`SELECT url, position FROM perfume_images WHERE perfume_id = ${perfumeId} ORDER BY position`;
  const imagesList = (imgRows || [])
    .map((i) => (i.url != null ? String(i.url).trim() : ""))
    .filter(Boolean);
  return res.status(201).json({
    id: inserted.id,
    url: inserted.external_url,
    title: inserted.title,
    description: inserted.description ?? "",
    catalogSource: inserted.catalog_source,
    notes: inserted.notes ?? {},
    variants: inserted.variants ?? [],
    images: imagesList,
    ativo: inserted.ativo !== false,
    esgotado: inserted.esgotado === true,
  });
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function normalizePerfumeId(id) {
  if (id == null) return "";
  const s = String(id).trim().toLowerCase();
  return UUID_REGEX.test(s) ? s : "";
}

async function handleGetOne(id, req, res) {
  const normalizedId = normalizePerfumeId(id);
  if (!normalizedId) {
    return res.status(400).json({ error: "ID do perfume inválido" });
  }
  let p;
  try {
    [p] = await sql`
      SELECT id, external_url, title, description, catalog_source, notes, variants, image_2_url, ativo, esgotado
      FROM perfumes
      WHERE id = ${normalizedId}
    `;
  } catch (queryErr) {
    if (queryErr?.code !== "42703") throw queryErr;
    [p] = await sql`
      SELECT id, external_url, title, description, catalog_source, notes, variants, image_2_url
      FROM perfumes
      WHERE id = ${normalizedId}
    `;
  }
  if (!p) {
    res.setHeader("Cache-Control", "no-store, max-age=0");
    return res.status(404).json({ error: "Perfume não encontrado" });
  }
  const imgRows =
    await sql`SELECT url, position FROM perfume_images WHERE perfume_id = ${normalizedId} ORDER BY position`;
  let images = (imgRows || [])
    .map((i) => (i.url != null ? String(i.url).trim() : ""))
    .filter(Boolean);
  if (images.length === 0) {
    const vars = p.variants ?? [];
    const firstWithImg = vars.find((v) => v && (v.image_url || v.imageUrl));
    const url = firstWithImg && (firstWithImg.image_url ?? firstWithImg.imageUrl);
    if (url) images = [String(url).startsWith("//") ? "https:" + url : url];
  }
  if (images.length === 0 && p.image_2_url) {
    const u = String(p.image_2_url).trim();
    if (u) images = [u.startsWith("//") ? "https:" + u : u];
  }
  res.setHeader("Cache-Control", "no-store, max-age=0");
  return res.status(200).json({
    id: toUuidKey(p.id) || String(p.id ?? ""),
    url: p.external_url,
    title: p.title,
    description: p.description ?? "",
    catalogSource: p.catalog_source,
    notes: p.notes ?? {},
    variants: p.variants ?? [],
    images,
    ativo: p.ativo === true || p.ativo == null,
    esgotado: p.esgotado === true,
  });
}

async function handlePut(id, req, res) {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  const [existing] =
    await sql`SELECT id FROM perfumes WHERE id = ${id}`;
  if (!existing)
    return res.status(404).json({ error: "Perfume não encontrado" });
  const body = req.body || {};
  const title = typeof body.title === "string" ? body.title.trim() : "";
  let externalUrl =
    typeof body.external_url === "string"
      ? body.external_url.trim()
      : typeof body.url === "string"
        ? body.url.trim()
        : "";
  const catalogSource =
    typeof body.catalog_source === "string"
      ? body.catalog_source.trim()
      : "";
  if (!title) return res.status(400).json({ error: "Título é obrigatório" });
  if (!externalUrl) externalUrl = null;
  if (!["arabe", "feminino", "normal"].includes(catalogSource))
    return res.status(400).json({
      error: "Catálogo deve ser: arabe, feminino ou normal",
    });
  const description =
    typeof body.description === "string"
      ? body.description.trim() || null
      : null;
  const notes =
    body.notes && typeof body.notes === "object" ? body.notes : {};
  const variants = Array.isArray(body.variants) ? body.variants : [];
  const rawImagesPut = Array.isArray(body.images) ? body.images : [];
  const images = rawImagesPut
    .map((u) => (typeof u === "string" ? u.trim() : ""))
    .filter(Boolean);
  const ativo = body.ativo !== false && body.ativo !== "false";
  const esgotado = body.esgotado === true || body.esgotado === "true";

  await sql`
    UPDATE perfumes
    SET external_url = ${externalUrl},
        title = ${title},
        description = ${description},
        catalog_source = ${catalogSource},
        notes = ${JSON.stringify(notes)},
        variants = ${JSON.stringify(variants)},
        ativo = ${ativo},
        esgotado = ${esgotado},
        updated_at = now()
    WHERE id = ${id}
  `;
  await sql`DELETE FROM perfume_images WHERE perfume_id = ${id}`;
  for (let i = 0; i < images.length; i++) {
    await sql`
      INSERT INTO perfume_images (perfume_id, url, position)
      VALUES (${id}, ${images[i]}, ${i})
    `;
  }
  const [p] =
    await sql`SELECT id, external_url, title, description, catalog_source, notes, variants, ativo, esgotado FROM perfumes WHERE id = ${id}`;
  const imgRows =
    await sql`SELECT url, position FROM perfume_images WHERE perfume_id = ${id} ORDER BY position`;
  const imagesList = (imgRows || [])
    .map((i) => (i.url != null ? String(i.url).trim() : ""))
    .filter(Boolean);
  return res.status(200).json({
    id: p.id,
    url: p.external_url,
    title: p.title,
    description: p.description ?? "",
    catalogSource: p.catalog_source,
    notes: p.notes ?? {},
    variants: p.variants ?? [],
    images: imagesList,
    ativo: p.ativo !== false,
    esgotado: p.esgotado === true,
  });
}

async function handleDelete(id, req, res) {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  const [existing] =
    await sql`SELECT id FROM perfumes WHERE id = ${id}`;
  if (!existing)
    return res.status(404).json({ error: "Perfume não encontrado" });
  await sql`DELETE FROM perfume_images WHERE perfume_id = ${id}`;
  await sql`DELETE FROM perfumes WHERE id = ${id}`;
  return res.status(200).json({ ok: true });
}

export async function handlePerfumes(pathSegments, req, res) {
  if (!sql)
    return res
      .status(503)
      .json({ error: "Banco de dados não configurado" });

  const id = Array.isArray(pathSegments) && pathSegments.length > 0
    ? pathSegments[0]
    : undefined;

  try {
    if (!id) {
      if (req.method === "GET") return await handleList(req, res);
      if (req.method === "POST") return await handlePostCreate(req, res);
      return res.status(405).json({ error: "Método não permitido" });
    }

    if (req.method === "GET") return await handleGetOne(id, req, res);
    if (req.method === "PUT") return await handlePut(id, req, res);
    if (req.method === "DELETE") return await handleDelete(id, req, res);
    return res.status(405).json({ error: "Método não permitido" });
  } catch (err) {
    if (err?.code === "23505")
      return res
        .status(409)
        .json({ error: "Já existe um perfume com esta URL externa" });
    console.error("API perfumes error:", err);
    return res.status(500).json({ error: "Erro ao processar perfume" });
  }
}

