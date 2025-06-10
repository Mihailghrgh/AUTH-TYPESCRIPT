import { z } from "zod";
import { verificationCodeSchema } from "./auth.verifyEmailCodeSchema";

export const resetPasswordSchema = z.object({
  password: z.string().min(1).max(50),
  verificationCode: verificationCodeSchema,
});
