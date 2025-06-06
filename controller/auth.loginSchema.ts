import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.string().email().min(1).max(50),
    password: z.string().min(6).max(50),
    confirmPassword: z.string().min(6).max(50),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
