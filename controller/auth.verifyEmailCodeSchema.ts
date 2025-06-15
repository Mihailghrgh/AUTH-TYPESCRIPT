import z from "zod";

export const verificationCodeSchema = z.string().min(36).max(36);
