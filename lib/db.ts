import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../schema/schema";
import dotenv from "dotenv";

dotenv.config();

const globalForDrizzle = globalThis as unknown as {
  db: ReturnType<typeof drizzle> | undefined;
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

if (!process.env.DATABASE_URL) {
  console.log("Data base url ", process.env.DATABASE_URL);
  throw new Error("DATABASE_URL is missing");
}

const db = globalForDrizzle.db ?? drizzle(pool, { schema });

export default db;

if (process.env.NODE_ENV !== "production") globalForDrizzle.db = db;
