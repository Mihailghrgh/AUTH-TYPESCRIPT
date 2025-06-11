import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

export const verificationCodeTypeEnum = pgEnum("VerificationCodeType", [
  "email_verification",
  "password_reset",
]);

export const AuthUsers = pgTable("AuthUsers", {
  name: text("name").notNull(),
  id: uuid("id").defaultRandom().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  verified: boolean("verified").notNull().default(false),
});

export const VerificationCode = pgTable("VerificationCode", {
  id: uuid("id").defaultRandom(),
  userId: text("userId").notNull(),
  type: verificationCodeTypeEnum().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  expires_at: timestamp("expires_at").notNull(),
});

export const SessionDocument = pgTable("SessionDocument", {
  id: uuid("id").defaultRandom().notNull(),
  userId: text("userId").notNull(),
  userAgent: text("userAgent"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  expires_at: timestamp("expires_at").notNull(),
});
