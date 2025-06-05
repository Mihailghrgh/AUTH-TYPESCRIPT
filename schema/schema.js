import {
  pgTable,
  text,
  timestamp,
  uuid,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";

export const AuthUsers = pgTable("AuthUsers", {
  id: uuid("id").defaultRandom(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
});
