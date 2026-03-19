import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.warn("DATABASE_URL não definida; operações de banco falharão.");
}

export const sql = databaseUrl ? neon(databaseUrl) : null;
