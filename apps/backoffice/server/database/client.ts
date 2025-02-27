import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import environment from "@/server/environment";

const sql = neon(environment.database.url);
const db = drizzle(sql);

export default db;
