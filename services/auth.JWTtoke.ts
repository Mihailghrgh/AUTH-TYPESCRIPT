import { SignOptions, VerifyOptions } from "jsonwebtoken";
import Jwt from "jsonwebtoken";

export type refreshTokenPayload = {
  sessionId: string;
};

export type accessTokenPayload = {
  userId: string;
  sessionId: string;
};

type signOptionsSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ["user"],
};

const accessTokenSignOptions: signOptionsSecret = {
  expiresIn: "15m",
  secret: process.env.JWT_SECRET as string,
};

export const refreshTokenSignOptions: signOptionsSecret = {
  expiresIn: "30d",
  secret: process.env.JWT_REFRESH_SECRET as string,
};

export const signToken = (
  payload: accessTokenPayload | refreshTokenPayload,
  options?: signOptionsSecret
) => {
  const { secret, ...signOpts } = options || accessTokenSignOptions;

  return Jwt.sign(payload, secret, { ...defaults, ...signOpts });
};

export const verifyToken = <TPayload extends object = accessTokenPayload>(
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
  const { secret = process.env.JWT_SECRET as string, ...verifyOpts } =
    options || {};

  try {
    const payload = Jwt.verify(token, secret, {
      ...defaults,
      ...verifyOpts,
    }) as TPayload;


    return { payload };
  } catch (error: any) {
    return { error: error.message };
  }
};
