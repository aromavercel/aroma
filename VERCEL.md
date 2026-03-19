# Deploy na Vercel

## Respostas rápidas

- **Dá para subir front e “back” ao mesmo tempo?** Sim. O front sobe como site estático (Vite) e a API como **Vercel Serverless Functions** (pasta `api/`). Tudo no mesmo projeto e no mesmo domínio.
- **Preciso subir no GitHub antes?** Sim. O fluxo normal é: repositório no GitHub → conectar na Vercel → deploy automático a cada push. Também dá para usar a Vercel CLI sem Git.

A Vercel **não roda Docker**. Ela faz build do seu código (Vite + Node para as funções) nos servidores deles.

---

## 1. Subir o código no GitHub

Se ainda não tiver repositório:

```bash
git init
git add .
git commit -m "Initial commit"
```

Crie um repositório no GitHub (ex.: `aroma`), depois:

```bash
git remote add origin https://github.com/SEU_USUARIO/aroma.git
git branch -M main
git push -u origin main
```

---

## 2. Deploy na Vercel (front + API no mesmo projeto)

1. Acesse [vercel.com](https://vercel.com) e faça login (pode ser com conta GitHub).
2. **Add New…** → **Project**.
3. **Import** o repositório `aroma` do GitHub.
4. A Vercel detecta Vite; confira:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Root Directory:** (em branco se o projeto estiver na raiz)
5. Clique em **Deploy**.

Depois do deploy:

- **Frontend (site):** `https://seu-projeto.vercel.app`
- **API (exemplo):** `https://seu-projeto.vercel.app/api/health`

O `vercel.json` na raiz já está configurado para o SPA (rotas caírem no `index.html`) e para não reescrever as rotas `/api/*` (que viram Serverless Functions a partir da pasta `api/`).

---

## 3. Usar a API no frontend em produção

Na Vercel, front e API ficam no **mesmo domínio**. Use URLs relativas para a API:

```js
// Em produção (Vercel): mesma origem, sem CORS
const res = await fetch('/api/health');
// Ou para login, etc.:
const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ ... }) });
```

Em desenvolvimento (Docker), a API está em `http://localhost:3001`. Você pode usar uma variável de ambiente:

```js
const API_BASE = import.meta.env.VITE_API_URL || '';
fetch(`${API_BASE}/api/health`);
```

Na Vercel: **Settings → Environment Variables** → `VITE_API_URL` em branco (ou não definir). No `.env.local` em dev: `VITE_API_URL=http://localhost:3001`.

---

## 4. Onde fica o “backend”

| Onde | O que roda |
|------|------------|
| **Pasta `api/`** (na raiz do projeto) | Vercel Serverless Functions. Cada arquivo vira uma rota: `api/health.js` → `/api/health`. |
| **Pasta `backend/`** (Express) | Só é usada no Docker (desenvolvimento). A Vercel **não** executa esse servidor. |

Para login e outras rotas na Vercel: crie arquivos em `api/`, por exemplo:

- `api/login.js` → `POST /api/login`
- `api/users.js` → rotas de usuários

Se no futuro você quiser usar o **Express em um servidor próprio** (ex.: Railway, Render), aí sim usa a pasta `backend/` e coloca a URL do backend em `VITE_API_URL` na Vercel.

---

## 5. Deploy pela CLI (sem GitHub)

```bash
npm i -g vercel
vercel
```

Siga o assistente (link com projeto existente ou criação de um novo). Para produção:

```bash
vercel --prod
```

Resumo: **sim, você consegue subir front e “back” ao mesmo tempo na Vercel** (front como site + API na pasta `api/`), e **sim, o fluxo normal é subir o código no GitHub e conectar o repositório na Vercel** para deploy automático.
