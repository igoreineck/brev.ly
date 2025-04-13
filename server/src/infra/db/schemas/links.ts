import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const links = pgTable("links", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: text("name").notNull().unique(),
  originalUrl: text("original_url").notNull(),
  viewCounter: integer("view_counter")
    .notNull()
    .$defaultFn(() => 0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
