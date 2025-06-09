import { Router } from "express";
import {
  registerHandler,
  loginHandler,
  refreshHandler,
} from "../controller/auth.controller";
import { logoutHandler } from "../controller/auth.controller";
import { verifyEmailHandler } from "../controller/auth.controller";

export const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.get("/logout", logoutHandler);
authRoutes.get("/refresh", refreshHandler);
authRoutes.get("/email/verify/:code", verifyEmailHandler);
