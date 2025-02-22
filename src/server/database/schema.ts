import { pgTable, serial, text, timestamp, numeric } from "drizzle-orm/pg-core";

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  src: text("src").notNull(),
  bucketKey: text("bucketKey").notNull(),
  width: numeric("width"),
  height: numeric("height"),
  placeholderBase64: text("placeholderBase64"),
  placeholderCss: text("placeholderCss"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
