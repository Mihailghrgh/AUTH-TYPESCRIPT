import { verifyToken } from "@/services/auth.JWTtoke";
import appAssert from "@/utils/appAssert";
import AppErrorCode from "@/utils/appErrorCode";
import { UNAUTHORIZED } from "@/utils/httpStatusCode";
import { RequestHandler } from "express";

const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Not authorized",
    AppErrorCode.InvalidAccessToken
  );

  const { error, payload } = verifyToken(accessToken);

  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid Token",
    AppErrorCode.InvalidAccessToken
  );

  req.userId = payload.userId;
  req.sessionId = payload.sessionId;
  next();
};

export default authenticate