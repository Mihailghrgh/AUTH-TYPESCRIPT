import {
  pgTable,
  text,
  timestamp,
  uuid,
  jsonb,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { thirtyDaysFromNow } from "@/utils/date";

export const verificationCodeTypeEnum = pgEnum("VerificationCodeType", [
  "email_verification",
  "password_reset",
]);

export const AuthUsers = pgTable("AuthUsers", {
  id: uuid("id").defaultRandom(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
});

export const VerificationCode = pgTable("VerificationCode", {
  id: uuid("id").defaultRandom(),
  type: verificationCodeTypeEnum().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  expires_at: timestamp("expires_at").notNull(),
});

export const SessionDocument = pgTable("SessionDocument", {
  id: uuid("id").defaultRandom(),
  userId: text("userId").notNull(),
  userAgent: text("userAgent"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  expires_at: timestamp("expires_at").notNull().default(thirtyDaysFromNow),
});
