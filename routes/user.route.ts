import { Router } from "express";
import { getUserHandler } from "@/controller/user.controller";
export const userRoutes = Router();

//userRoutes

userRoutes.get("/", getUserHandler);
