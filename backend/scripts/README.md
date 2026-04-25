# Scripts do backend

## Seed de perfumes (catálogo no banco + imagens no Vercel Blob)

O script `seed-perfumes.js` lê os três JSON do catálogo em `src/data/`, faz upload de cada imagem para o **Vercel Blob** e grava todos os dados dos perfumes no **Postgres** (tabelas `perfumes` e `perfume_images`).

### Pré-requisitos

1. **Migration aplicada**  
   Execute a migration `004_perfumes.sql` no seu banco (Neon/Vercel Postgres):

   ```bash
   # Exemplo com psql (substitua pela sua connection string)
   psql "$DATABASE_URL" -f backend/migrations/004_perfumes.sql
   ```

   Ou rode o SQL manualmente no painel do Neon/Vercel.

2. **Variáveis de ambiente** no `.env` na raiz do projeto:

   - `DATABASE_URL` – connection string do Postgres
   - `BLOB_READ_WRITE_TOKEN` – token do Vercel Blob (em Vercel: Storage → Blob → Create Token, com permissão de leitura e escrita)
   - `BLOB_ACCESS` (opcional) – `private` ou `public` (se o seu Blob Store estiver privado, a seed precisa usar `private`)

### Como usar

Na **raiz do projeto** (pasta `aroma`):

```bash
node --env-file=.env backend/scripts/seed-perfumes.js
```

- Dica: você pode usar um arquivo `.env` diferente (ex.: `.env.local` para banco local, `.env.neon` para o Neon):
  ```bash
  node --env-file=.env.local backend/scripts/seed-perfumes.js
  ```

- O script usa os JSON em `src/data/`:
  - `thekingofparfums_data_perfume_arabe.json`
  - `thekingofparfums_data_perfume_normal_feminino.json`
  - `thekingofparfums_data_perfume_normal.json`
- Para cada perfume, baixa as imagens (das URLs originais), envia para o Vercel Blob e guarda as novas URLs no banco.
- Se um perfume já existir (mesmo `external_url`), os dados e as imagens são atualizados.

### Após o seed

- **API:** `GET /api/perfumes` retorna a lista de perfumes (opcional: `?catalog=arabe|feminino|normal`).
- **API:** `GET /api/perfumes/:id` retorna um perfume com todas as imagens e variantes.

O frontend pode passar a consumir o catálogo desses endpoints em vez dos JSON estáticos.

---

## Banco local (Postgres via Docker)

Se você quiser rodar o projeto no seu PC usando **Postgres local**, sem quebrar o deploy (Neon/Vercel), use o `docker-compose.yml` na raiz.

### Subir o Postgres

```bash
docker compose up -d
```

### Configurar variáveis

- Copie `.env.local.example` para `.env.local`
- Coloque `DATABASE_URL` local (sem SSL), exemplo:
  - `postgresql://aroma:aroma@localhost:5432/aroma?sslmode=disable`

### Criar o schema no banco local

Você pode aplicar o schema completo de uma vez:

```bash
psql "postgresql://aroma:aroma@localhost:5432/aroma?sslmode=disable" -f backend/schema.sql
```

ou, se preferir, aplicar as migrations na ordem.

### Rodar a seed no banco local

```bash
node --env-file=.env.local backend/scripts/seed-perfumes.js
```

---

## Reset: só catálogo + usuários admin

O arquivo SQL `reset_keep_catalog_and_admins.sql` apaga **pedidos, carrinhos, wishlists, mensagens, tokens de reset, promo_alerts** e **todos os usuários que não são admin**, mantendo **`brands`**, **`perfumes`**, **`perfume_images`** e contas **`role = admin`**.

Execute **manualmente** no SQL Editor do Neon (ou `psql`), após backup. O script exige que já exista **pelo menos um** usuário admin; caso contrário aborta com erro.
