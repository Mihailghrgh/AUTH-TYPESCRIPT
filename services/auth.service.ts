import { AuthUsers } from "@/schema/schema.js";
import { VerificationCode } from "@/schema/schema.js";
import { SessionDocument } from "@/schema/schema.js";
import VerificationCodeType from "@/helper/verificationCode";
import db from "@/lib/db";
import { eq } from "drizzle-orm";
import { thirtyDaysFromNow, oneYearFromNow } from "@/utils/date";
import appAssert from "@/utils/appAssert";
import { CONFLICT, UNAUTHORIZED } from "@/utils/httpStatusCode";
import { refreshTokenSignOptions, signToken } from "./auth.JWTtoke";

export type createAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};
export type loginAccountParams = createAccountParams;

export const createAccount = async (data: createAccountParams) => {
  //verify existing user
  const existingUser = await db
    .select()
    .from(AuthUsers)
    .where(eq(AuthUsers.email, data.email as string));

  //checking or throwing error based on user
  appAssert(
    !existingUser[0],
    CONFLICT,
    "Email already in use by another account"
  );

  //create user
  const user = await db
    .insert(AuthUsers)
    .values({
      email: data.email,
      password: data.password,
    })
    .returning();

  //create verifications code
  await db.insert(VerificationCode).values({
    userId: user[0].id as string,
    type: VerificationCodeType.EmailVerification,
    expires_at: oneYearFromNow(),
  });
  //send verification email
  //create session
  const session = await db
    .insert(SessionDocument)
    .values({
      userId: user[0].id as string,
      userAgent: data.userAgent,
      expires_at: thirtyDaysFromNow(),
    })
    .returning();
  //sign access token with refresh token

  const newUser = {
    email: user[0].email,
    id: user[0].id,
    created_at: user[0].created_at,
  };

  const sessionInfo = {
    sessionId: session[0].id,
  };

  const accessToken = signToken({
    ...sessionInfo,
    userId: newUser.id,
  });

  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);

  //   const refreshToken = Jwt.sign(
  //     { sessionId: session[0].id },
  //     process.env.JWT_REFRESH_SECRET as string,
  //     { audience: ["user"], expiresIn: "30d" }
  //   );

  //   const accessToken = Jwt.sign(
  //     { userId: user[0].id as string, sessionId: user[0].id },
  //     process.env.JWT_SECRET as string,
  //     { audience: ["user"], expiresIn: "15m" }
  //   );

  //return user with tokens
  return { newUser, refreshToken, accessToken };
};

export const loginUser = async (data: loginAccountParams) => {
  //verify user exists
  const existingUser = await db
    .select()
    .from(AuthUsers)
    .where(eq(AuthUsers.email, data.email));

  appAssert(existingUser, UNAUTHORIZED, "Invalid email or password");
  //validate password

  const isValid = data.password === existingUser[0].password;
  appAssert(isValid, UNAUTHORIZED, "Invalid email or password");
  //create a session
  const session = await db
    .insert(SessionDocument)
    .values({
      userId: existingUser[0].id,
      userAgent: data.userAgent,
      expires_at: thirtyDaysFromNow(),
    })
    .returning();

  //sign access token and refresh token and return those
  const sessionInfo = {
    sessionId: session[0].id,
  };

  const newUser = {
    email: existingUser[0].email,
    id: existingUser[0].id,
    created_at: existingUser[0].created_at,
  };

  const accessToken = signToken({
    ...sessionInfo,
    userId: existingUser[0].id,
  });

  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);

  return { newUser, refreshToken, accessToken };
};
