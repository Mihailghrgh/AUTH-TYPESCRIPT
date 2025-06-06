import catchError from "../utils/catchError.js";
import { createAccount } from "@/services/auth.service";
import { setAuthCookies, clearOutCookies } from "@/utils/cookies.js";
import { registerSchema } from "./auth.registerSchema.js";
import { loginSchema } from "./auth.loginSchema.js";
import { loginUser } from "@/services/auth.service";
import { CREATED, OK } from "@/utils/httpStatusCode.js";
import { verifyToken } from "@/services/auth.JWTtoke.js";
import db from "@/lib/db.js";
import { eq } from "drizzle-orm";
import { SessionDocument } from "@/schema/schema.js";

export const registerHandler = catchError(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { newUser, accessToken, refreshToken } = await createAccount(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(newUser);
});

export const loginHandler = catchError(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { refreshToken, accessToken } = await loginUser(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json({ message: "Login successful!" });
});

export const logoutHandler = catchError(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const { payload } = verifyToken(accessToken);

  console.log(req.cookies);

  if (payload) {
    await db
      .delete(SessionDocument)
      .where(eq(SessionDocument.id, payload.sessionId));
  }

  return clearOutCookies(res)
    .status(OK)
    .json({ message: "Logout successFull" });
});
