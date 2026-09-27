import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import fs from "node:fs";
import path from "node:path";

const DB_PATH = process.env.DATABASE_PATH ?? path.join(process.cwd(), "data", "nova.db");
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const g = globalThis as unknown as { __nova?: Database.Database };
const sqlite = g.__nova ?? new Database(DB_PATH);
if (process.env.NODE_ENV !== "production") g.__nova = sqlite;
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");
export const db = drizzle(sqlite, { schema });
export { schema };
