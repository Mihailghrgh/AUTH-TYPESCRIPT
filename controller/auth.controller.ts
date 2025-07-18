import catchError from "../utils/catchError.js";
import {
  createAccount,
  resetPassword,
  sendPasswordResetEmail,
} from "@/services/auth.service";
import {
  setAuthCookies,
  clearOutCookies,
  getRefreshTokenCookieOptions,
} from "@/utils/cookies.js";
import { registerSchema } from "./auth.registerSchema.js";
import { loginSchema } from "./auth.loginSchema.js";
import { loginUser } from "@/services/auth.service";
import {
  CREATED,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from "@/utils/httpStatusCode.js";
import { verifyToken } from "@/services/auth.JWTtoke.js";
import db from "@/lib/db.js";
import { eq } from "drizzle-orm";
import { SessionDocument } from "@/schema/schema.js";
import appAssert from "@/utils/appAssert.js";
import { refreshUserAccessToken } from "@/services/auth.service";
import { getAccessTokenCookieOptions } from "@/utils/cookies.js";
import { verificationCodeSchema } from "./auth.verifyEmailCodeSchema.js";
import { verifyEmailServices } from "@/services/auth.service";
import { emailSchema } from "./auth.verifyEmailSchema.js";
import { resetPasswordSchema } from "./auth.resetPasswordSchema.js";
import { checkPasswordCode } from "@/services/auth.service";
import { verifyAccessTokenSchema } from "./auth.verifyAccessTokenSchema.js";

export const registerHandler = catchError(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { newUser, accessToken, refreshToken } = await createAccount(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json({ newUser, message: "Login successful!" });
});

export const loginHandler = catchError(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { newUser, refreshToken, accessToken } = await loginUser(request);

  console.log("RefreshToken: ", refreshToken);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json({ message: "Login successful!", newUser });
});

export const logoutHandler = catchError(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const { payload } = verifyToken(accessToken || "");

  if (payload) {
    await db
      .delete(SessionDocument)
      .where(eq(SessionDocument.id, payload.sessionId));
  }

  return clearOutCookies(res)
    .status(OK)
    .json({ message: "Logout successFull" });
});

export const refreshHandler = catchError(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("RefreshToken: ", refreshToken);

  appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

  const { accessToken, newRefreshToken } =
    await refreshUserAccessToken(refreshToken);

  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
  }
  return res
    .status(OK)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json({ message: "Access token refreshed" });
});

export const verifyEmailHandler = catchError(async (req, res) => {
  //verify email code
  const verificationCode = verificationCodeSchema.parse(req.params.code);

  const { newUser } = await verifyEmailServices(verificationCode);

  return res.status(OK).json({ message: "Email has been verified!", newUser });
});

export const forgotPasswordHandler = catchError(async (req, res) => {
  const email = emailSchema.parse(req.body.email);
  await sendPasswordResetEmail(email);

  return res.status(OK).json({ message: "Password reset email sent" });
});

export const resetPasswordHandler = catchError(async (req, res) => {
  const request = resetPasswordSchema.parse(req.body);

  await resetPassword(request);

  return clearOutCookies(res)
    .status(OK)
    .json({ message: "Password has been reset" });
});

export const checkPasswordCodeHandler = catchError(async (req, res) => {
  const { code, exp } = req.query;

  const verifyCode = verificationCodeSchema.parse(code as string);

  const { availableCode } = await checkPasswordCode(verifyCode);

  return res.status(OK).json({ message: "Code has been verified" });
});
