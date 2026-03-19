# Docker – Aroma

## Desenvolvimento (front + back no Docker)

Tudo roda em containers com **hot reload**: edite o código no seu editor e a aplicação atualiza sozinha.

### Subir o ambiente

```bash
docker compose -f docker-compose.dev.yml up --build
```

- **Frontend:** http://localhost:5173  
- **Backend:** http://localhost:3001 (ex.: http://localhost:3001/api/health)

### Parar

```bash
docker compose -f docker-compose.dev.yml down
```

### Dicas

- Na primeira execução, `npm install` pode levar alguns minutos.
- O código fica montado em volume: alterações em `src/` e `backend/` refletem sem rebuild.
- No frontend, use a API em **`http://localhost:3001`** (ex.: `axios.get('http://localhost:3001/api/...')`).

---

## Produção (só frontend buildado)

Build da aplicação e serviço com nginx:

```bash
docker compose up --build
```

Acesso: http://localhost:3000
