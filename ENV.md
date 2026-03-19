# Variáveis de ambiente (.env)

Lista de **todas** as variáveis usadas no projeto e **como obter e preencher** cada uma.

---

## Onde usar

- **Local (backend Express):** o `.env` fica na **raiz do projeto**. O `backend` carrega com `--env-file=../.env`.
- **Vercel:** em **Settings → Environment Variables** do projeto. Não use o arquivo `.env` no deploy (ele não é enviado).
- **Frontend (Vite):** só variáveis que começam com `VITE_` são expostas no browser. Coloque-as no `.env` na raiz; o Vite lê da raiz.

---

## 1. DATABASE_URL (obrigatória para login/cadastro)

**O que é:** connection string do PostgreSQL (banco onde ficam usuários, perfis, etc.).

**Como obter:**
1. Acesse [neon.tech](https://neon.tech) e crie uma conta (pode ser com GitHub).
2. Crie um **projeto** e um **branch** (ex.: `main`).
3. No painel, abra **Connection Details** ou **Dashboard** e copie a **connection string**.
4. Ela vem no formato:  
   `postgresql://USUARIO:SENHA@ep-xxxxx-pooler.REGIAO.aws.neon.tech/neondb?sslmode=require`

**Exemplo (não use esses valores):**
```env
DATABASE_URL=postgresql://neondb_owner:abc123@ep-soft-waterfall-xxx-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
```

**Importante:** execute no SQL Editor do Neon o conteúdo de `backend/schema.sql` e das migrations em `backend/migrations/` (001, 002, 003) para criar/atualizar a tabela `users`.

---

## 2. JWT_SECRET (obrigatória em produção)

**O que é:** chave secreta usada para assinar os tokens de login. Quem tiver essa chave pode gerar tokens válidos.

**Como preencher:**
- **Desenvolvimento:** pode omitir; o código usa um valor padrão (não use em produção).
- **Produção:** gere uma string longa e aleatória. Exemplos de como gerar:
  - No Node: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
  - Ou use um gerador online de senhas (mín. 32 caracteres) e cole no `.env`.

**Exemplo:**
```env
JWT_SECRET=9qSeOIoQOU8YTUy2veKpgiluoWrouPc1tDp/jwTNA0E5r4VK2Kf4CLM9RvkFOmMf8g
```

---

## 3. BLOB_READ_WRITE_TOKEN (opcional – upload de foto de perfil)

**O que é:** token da Vercel Blob Storage para enviar e ler as fotos de perfil.

**Como obter:**
1. No [dashboard da Vercel](https://vercel.com), abra seu **projeto**.
2. Vá em **Storage** → **Create Database** → escolha **Blob**.
3. Conecte o store ao projeto se pedir.
4. Na aba **.env.local** ou em **Settings → Environment Variables** do projeto, a Vercel cria a variável `BLOB_READ_WRITE_TOKEN` (ou você copia do painel do Blob).

**Local:** use `vercel env pull` na raiz do projeto (com Vercel CLI) ou copie o valor do dashboard e coloque no `.env` como `BLOB_READ_WRITE_TOKEN=...`.

**Exemplo:**
```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxx
```

Sem essa variável, o login continua funcionando; só o upload de foto no perfil não.

---

## 4. FRONTEND_URL (obrigatória para login com Google/Facebook)

**O que é:** URL do frontend para onde o usuário é redirecionado **depois** de fazer login no Google ou Facebook (com o token na URL).

**Como preencher:**
- **Desenvolvimento:** URL onde o Vite está rodando, em geral:  
  `http://localhost:5173`
- **Produção (Vercel):** URL do seu site, sem barra no final. Ex.:  
  `https://seu-projeto.vercel.app`

**Exemplo:**
```env
FRONTEND_URL=http://localhost:5173
```

Só é necessária se você for usar os botões de login com Google ou Facebook.

---

## 5. GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET (para login com Google)

**O que são:** credenciais do projeto no Google Cloud para o fluxo OAuth (login com “Entrar com Google”).

**Como obter:**
1. Acesse [Google Cloud Console](https://console.cloud.google.com/).
2. Crie um **projeto** ou selecione um existente.
3. Vá em **APIs e Serviços** → **Credenciais**.
4. Clique em **+ Criar credenciais** → **ID do cliente OAuth**.
5. Tipo de aplicativo: **Aplicativo da Web**.
6. Em **URIs de redirecionamento autorizados**, adicione **exatamente**:
   - Produção: `https://SEU_DOMINIO_VERCEL/api/auth-google-callback`  
     (ex.: `https://aroma.vercel.app/api/auth-google-callback`)
   - Desenvolvimento: `http://localhost:3001/api/auth-google-callback`  
     (se o backend local roda na porta 3001)
7. Crie e copie o **ID do cliente** → use como `GOOGLE_CLIENT_ID`.
8. Copie o **Segredo do cliente** → use como `GOOGLE_CLIENT_SECRET`.

**Exemplo:**
```env
GOOGLE_CLIENT_ID=123456789-xxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxx
```

**Importante:** o “Segredo do cliente” não pode aparecer no frontend; fica só no backend (`.env` ou variáveis da Vercel).

---

## 6. FACEBOOK_APP_ID e FACEBOOK_APP_SECRET (para login com Facebook)

**O que são:** ID e segredo do app no Facebook para o fluxo OAuth (login com “Entrar com Facebook”).

**Como obter:**
1. Acesse [Facebook for Developers](https://developers.facebook.com/).
2. **Meus aplicativos** → **Criar app** → tipo **Consumidor** (ou o que for mais adequado).
3. No app, adicione o produto **Facebook Login** → **Configurações**.
4. Em **URIs de redirecionamento do OAuth válidos**, adicione:
   - Produção: `https://SEU_DOMINIO_VERCEL/api/auth-facebook-callback`
   - Desenvolvimento: `http://localhost:3001/api/auth-facebook-callback`
5. Em **Configurações** → **Básico** do app você vê:
   - **ID do app** → use como `FACEBOOK_APP_ID`
   - **Chave secreta do app** (mostrar) → use como `FACEBOOK_APP_SECRET`

**Exemplo:**
```env
FACEBOOK_APP_ID=1234567890123456
FACEBOOK_APP_SECRET=abcdef1234567890abcdef1234567890
```

O “Chave secreta do app” não pode aparecer no frontend; fica só no backend.

---

## 7. VITE_API_URL (só desenvolvimento local)

**O que é:** URL base do backend quando o frontend roda em um endereço e a API em outro (ex.: Vite em 5173, Express em 3001).

**Como preencher:**
- **Desenvolvimento:** se o backend está em `http://localhost:3001`, use:  
  `VITE_API_URL=http://localhost:3001`
- **Produção na Vercel:** deixe **em branco** ou não defina. Front e API estão na mesma origem; as chamadas usam caminhos relativos (`/api/...`).

**Exemplo (só no .env de dev):**
```env
VITE_API_URL=http://localhost:3001
```

---

## Resumo: o que é obrigatório para o quê

| Variável               | Login email/senha | Upload foto | Login Google/Facebook |
|------------------------|-------------------|-------------|------------------------|
| DATABASE_URL           | Sim               | —           | Sim                    |
| JWT_SECRET             | Sim (prod)        | —           | Sim                    |
| BLOB_READ_WRITE_TOKEN  | —                 | Sim         | —                      |
| FRONTEND_URL           | —                 | —           | Sim                    |
| GOOGLE_CLIENT_ID       | —                 | —           | Sim (Google)           |
| GOOGLE_CLIENT_SECRET   | —                 | —           | Sim (Google)           |
| FACEBOOK_APP_ID        | —                 | —           | Sim (Facebook)         |
| FACEBOOK_APP_SECRET    | —                 | —           | Sim (Facebook)         |
| VITE_API_URL           | Só em dev*        | Só em dev*  | Só em dev*             |

\* Só quando o front roda em um endereço e a API em outro (ex.: localhost:5173 e localhost:3001).

---

## Exemplo de .env completo (desenvolvimento)

```env
DATABASE_URL=postgresql://neondb_owner:xxx@ep-xxx.sa-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=minha-chave-secreta-longa-e-aleatoria
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxx
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=123456789-xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxx
FACEBOOK_APP_ID=1234567890123456
FACEBOOK_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_API_URL=http://localhost:3001
```

---

## Variável opcional: OAUTH_CALLBACK_BASE

Só é necessária se a URL base da API não for detectada automaticamente (ex.: atrás de um proxy). Nesse caso, defina a URL pública do backend, sem barra no final (ex.: `https://seu-projeto.vercel.app`). Na maioria dos casos **não é preciso** definir.

---

## Troubleshooting: "Perfume não encontrado" em produção (Vercel)

Se na Vercel ao clicar em um perfume aparece **"Perfume não encontrado"** e localmente funciona, quase sempre é um dos dois casos:

### 1. **DATABASE_URL na Vercel aponta para outro banco (ou vazio)**

Na Vercel, a API de perfumes usa a variável **DATABASE_URL** do projeto. Se ela não estiver definida ou apontar para um banco diferente do que você usa em desenvolvimento, os perfumes que existem no seu Neon local **não existem** nesse banco de produção.

**O que fazer:**

1. No [dashboard da Vercel](https://vercel.com) → seu projeto → **Settings** → **Environment Variables**.
2. Confirme que existe **DATABASE_URL** para o ambiente **Production** (e Preview, se quiser).
3. Use **o mesmo** connection string do Neon que você usa no `.env` local (o mesmo projeto/branch do Neon), para que produção tenha os mesmos dados.
4. Depois de alterar variáveis, faça um **Redeploy** do projeto (Deployments → ⋮ no último deploy → Redeploy).

### 2. **Banco de produção sem tabelas/dados**

Se a **DATABASE_URL** já é a correta mas o banco de produção foi criado depois ou está vazio:

1. No [Neon](https://neon.tech), abra o projeto que você usa em produção.
2. No **SQL Editor**, execute o schema e as migrations (por exemplo o conteúdo de `backend/schema.sql` e dos arquivos em `backend/migrations/`) para criar/atualizar as tabelas `perfumes`, `perfume_images`, etc.
3. Se os perfumes forem cadastrados só no ambiente local, será preciso inseri-los também no banco de produção (ou usar o mesmo banco em dev e prod, como no item 1).

**Resumo:** em produção, a API precisa de **DATABASE_URL** apontando para um PostgreSQL (Neon) onde as tabelas de perfumes existem e onde os perfumes estão cadastrados.
