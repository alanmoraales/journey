import { pgTable, serial, text, timestamp, numeric } from "drizzle-orm/pg-core";

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  src: text("src").notNull(),
  bucketKey: text("bucketKey").notNull(),
  width: numeric("width").notNull(),
  height: numeric("height").notNull(),
  placeholderBase64: text("placeholderBase64").notNull(),
  placeholderCss: text("placeholderCss").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
