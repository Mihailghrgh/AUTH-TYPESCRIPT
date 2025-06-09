import z from "zod";

export const verificationCodeSchema = z.string().min(1).max(36);
