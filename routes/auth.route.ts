import { Router } from "express";
import { registerHandler } from "../controller/auth.controller";

export const authRoutes = Router();

authRoutes.post("/register", registerHandler);
