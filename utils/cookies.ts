import { Response, CookieOptions } from "express";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";

const secure = process.env.NODE_ENV !== "development";

const defaultToken: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure,
};
type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaultToken,
  expires: fifteenMinutesFromNow(),
});

const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaultToken,
  expires: thirtyDaysFromNow(),
  path: "/auth/refresh",
});

export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) => {
  return res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());
};
