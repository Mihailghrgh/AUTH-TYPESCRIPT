import { z } from "zod";

export const verifyAccessTokenSchema = z
  .string()
  .min(280, { message: "Access token not a valid type" })
  .max(280, { message: "Access token not a valid type" });
