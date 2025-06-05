import catchError from "../utils/catchError.js";
import { AuthUsers } from "@/schema/schema.js";
import db from "@/lib/db";
import { z } from "zod";

const registerScheme = z
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

export const registerHandler = catchError(async (req, res) => {
  const request = registerScheme.parse({
    ...req.body,
  });
});
