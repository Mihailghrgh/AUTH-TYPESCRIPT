import { AuthUsers } from "@/schema/schema.js";
import { VerificationCode } from "@/schema/schema.js";
import { SessionDocument } from "@/schema/schema.js";
import VerificationCodeType from "@/helper/verificationCode";
import db from "@/lib/db";
import { eq } from "drizzle-orm";
import Jwt from "jsonwebtoken";
import { env } from "node:process";

export type createAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: createAccountParams) => {
  //verify existing user
  const existingUser = await db
    .select()
    .from(AuthUsers)
    .where(eq(AuthUsers.email, data.email as string));

  if (existingUser[0]) {
    throw new Error("Account already exists");
  }
  //create user
  const newUser = await db
    .insert(AuthUsers)
    .values({
      email: data.email,
      password: data.password,
    })
    .returning();

  //create verifications code
  const verificationCode = await db.insert(VerificationCode).values({
    type: VerificationCodeType.EmailVerification,
    created_at: new Date(Date.now()),
    expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });
  //send verification email
  //create session
  const session = await db
    .insert(SessionDocument)
    .values({
      userId: newUser[0].id as string,
      userAgent: data.userAgent,
    })
    .returning();
  //sign access token with refresh token
  const refreshToken = Jwt.sign(
    { sessionId: session[0].id },
    process.env.JWT_REFRESH_SECRET as string,
    { audience: ["user"], expiresIn: "30d" }
  );

  const accessToken = Jwt.sign(
    { sessionId: newUser[0].id },
    process.env.JWT_SECRET as string,
    { audience: ["user"], expiresIn: "15m" }
  );

  //return user with tokens
  return { newUser, refreshToken, accessToken };
};
