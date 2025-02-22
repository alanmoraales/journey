import { pgTable, serial, text, timestamp, numeric } from "drizzle-orm/pg-core";

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  src: text("src").notNull(),
  relativeSrc: text("relativeSrc").notNull(),
  width: numeric("width").notNull(),
  height: numeric("height").notNull(),
  placeholderBase64: text("placeholderBase64"),
  placeholderCss: text("placeholderCss"),
  bucketKey: text("bucketKey").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
