import { Router } from "express";
import { findSessionHandler } from "@/controller/session.controller";
import { deleteSessionHandler } from "@/controller/session.controller";

export const sessionRoutes = Router();

sessionRoutes.get("/", findSessionHandler);
sessionRoutes.delete("/:id" , deleteSessionHandler)
