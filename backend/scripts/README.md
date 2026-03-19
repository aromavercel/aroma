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

### Como usar

Na **raiz do projeto** (pasta `aroma`):

```bash
node --env-file=.env backend/scripts/seed-perfumes.js
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
