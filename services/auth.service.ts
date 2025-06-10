import { AuthUsers } from "@/schema/schema.js";
import { VerificationCode } from "@/schema/schema.js";
import { SessionDocument } from "@/schema/schema.js";
import VerificationCodeType from "@/helper/verificationCode";
import db from "@/lib/db";
import { eq, gt, and } from "drizzle-orm";
import {
  thirtyDaysFromNow,
  oneYearFromNow,
  fiveMinutesFromNow,
} from "@/utils/date";
import appAssert from "@/utils/appAssert";
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
} from "@/utils/httpStatusCode";
import {
  refreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
} from "./auth.JWTtoke";
import { ONE_DAY_MS } from "@/utils/date";
import { verifyToken } from "./auth.JWTtoke";
import { sendMail } from "@/utils/sendMail";
import { verifyEmailTemplate } from "@/utils/emailTemplate";
import { resetPasswordEmailTemplate } from "@/utils/emailTemplate";

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
      verified: false,
    })
    .returning();

  //create verifications code
  const verificationCode = await db
    .insert(VerificationCode)
    .values({
      userId: user[0].id as string,
      type: VerificationCodeType.EmailVerification,
      expires_at: oneYearFromNow(),
    })
    .returning();

  const url = `http://localhost:3000/email/verify/${verificationCode[0].id}`;
  //send verification email
  await sendMail({
    to: user[0].email,
    ...verifyEmailTemplate(url, user[0].email),
  });

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

  appAssert(existingUser[0], UNAUTHORIZED, "Invalid email or password");
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

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<refreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });

  appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

  const session = await db
    .select()
    .from(SessionDocument)
    .where(eq(SessionDocument.id, payload.sessionId));

  const now = new Date(Date.now());

  appAssert(
    session[0] && session[0].expires_at > now,
    UNAUTHORIZED,
    "Session expired"
  );

  const sessionCalculation = Number(session[0].expires_at) - Number(now);

  //refresh the session if it expires in the next 24 hours

  const sessionNeedsRefresh = sessionCalculation <= ONE_DAY_MS;

  if (sessionNeedsRefresh) {
    await db
      .update(SessionDocument)
      .set({ expires_at: thirtyDaysFromNow() })
      .where(eq(SessionDocument.id, session[0].id));
  }

  const newRefreshToken = sessionNeedsRefresh
    ? signToken({ sessionId: session[0].id }, refreshTokenSignOptions)
    : undefined;

  const accessToken = signToken({
    userId: session[0].userId,
    sessionId: session[0].id,
  });

  return { accessToken, newRefreshToken };
};

export const verifyEmailServices = async (code: string) => {
  //get code

  const validationCode = await db
    .select()
    .from(VerificationCode)
    .where(
      and(
        eq(VerificationCode.id, code),
        gt(VerificationCode.expires_at, new Date(Date.now()))
      )
    );

  appAssert(
    validationCode[0],
    NOT_FOUND,
    "Invalid or expired verification code"
  );
  //get user by Identifier
  const verifyUser = await db
    .select()
    .from(AuthUsers)
    .where(eq(AuthUsers.id, validationCode[0].userId));

  appAssert(verifyUser[0], NOT_FOUND, "User does not exist!");
  //update the user to verification true

  const updatedUser = await db
    .update(AuthUsers)
    .set({ verified: true })
    .where(eq(AuthUsers.id, verifyUser[0].id))
    .returning();

  appAssert(updatedUser[0], INTERNAL_SERVER_ERROR, "Failed to verify email");
  //delete verification code
  await db.delete(VerificationCode).where(eq(VerificationCode.id, code));
  //return users

  const newUser = {
    email: updatedUser[0].email,
    id: updatedUser[0].id,
    created_at: updatedUser[0].created_at,
  };

  return { newUser };
};

export const sendPasswordResetEmail = async (email: string) => {
  //get the user by email

  const user = await db
    .select()
    .from(AuthUsers)
    .where(eq(AuthUsers.email, email));
  //check if user exists
  appAssert(user[0], NOT_FOUND, "User email does not exist");
  //check email rate limit
  const date = new Date(Date.now());
  const count = await db
    .select()
    .from(VerificationCode)
    .where(
      and(
        eq(VerificationCode.type, VerificationCodeType.PasswordReset),
        eq(VerificationCode.userId, user[0].id),
        gt(VerificationCode.expires_at, date)
      )
    );

  console.log(count.length);

  appAssert(
    count.length <= 1,
    TOO_MANY_REQUESTS,
    "Too many requests, please try again later"
  );
  //create verification code

  const passwordResetCode = await db
    .insert(VerificationCode)
    .values({
      userId: user[0].id,
      type: VerificationCodeType.PasswordReset,
      expires_at: fiveMinutesFromNow(),
    })
    .returning();
  //send verification email
  const url = `${process.env.AP_ORIGIN}/password/reset?code=${passwordResetCode[0].id}&exp=${passwordResetCode[0].expires_at}`;

  const { data, error } = await sendMail({
    to: user[0].email,
    ...resetPasswordEmailTemplate(url, user[0].email),
  });
  appAssert(data?.id, INTERNAL_SERVER_ERROR, `${error}`);

  //return success

  return { url, emailId: data.id };
};

type ResetPasswordParams = {
  password: string;
  verificationCode: string;
};
export const resetPassword = async ({
  password,
  verificationCode,
}: ResetPasswordParams) => {
  const date = new Date(Date.now());
  //get the verification code
  const validCode = await db
    .select()
    .from(VerificationCode)
    .where(
      and(
        eq(VerificationCode.id, verificationCode),
        eq(VerificationCode.type, VerificationCodeType.PasswordReset),
        gt(VerificationCode.expires_at, date)
      )
    );
  //if valid update the user password
  appAssert(validCode[0], NOT_FOUND, "Invalid or expired verification code");

  const updatedUser = await db
    .update(AuthUsers)
    .set({ password: password })
    .where(eq(AuthUsers.id, validCode[0].userId))
    .returning();
  //delete the verification code

  console.log("Updated user details", updatedUser[0]);

  await db
    .delete(VerificationCode)
    .where(eq(VerificationCode.id, verificationCode));
  //delete ALL sessions

  await db
    .delete(SessionDocument)
    .where(eq(SessionDocument.userId, updatedUser[0].id));

  const newUser = {
    email: updatedUser[0].email,
  };

  return { newUser };
};
