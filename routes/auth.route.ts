import { Router } from "express";
import { registerHandler, loginHandler } from "../controller/auth.controller";
import { logoutHandler } from "../controller/auth.controller";

export const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.get("/logout", logoutHandler);
