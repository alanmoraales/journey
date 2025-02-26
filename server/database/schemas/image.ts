import { pgTable, serial, text, timestamp, numeric } from "drizzle-orm/pg-core";

const images = pgTable("images", {
  id: serial("id").primaryKey(),
  src: text("src").notNull(),
  bucketKey: text("bucketKey").notNull(),
  width: numeric("width").notNull(),
  height: numeric("height").notNull(),
  placeholderBase64: text("placeholderBase64").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SelectImage = typeof images.$inferSelect;
export type InsertImage = typeof images.$inferInsert;

export default images;
