import { Response } from "express";
import { z } from "zod";
import { ErrorRequestHandler } from "express";
import AppError from "@/utils/appError";
import { clearOutCookies } from "@/utils/cookies";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
  return res.status(400).json({ message: error.message, errors });
};

const handleAppError = (res: Response, error: AppError) => {
  return res
    .status(error.statusCode)
    .json({ message: error.message, errorCode: error.errorCode });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH ${req.path}`, error);

  if (req.path === "/auth/refresh") {
    clearOutCookies(res);
  }

  if (error instanceof z.ZodError) {
    handleZodError(res, error);
    return;
  }

  if (error instanceof AppError) {
    handleAppError(res, error);
    return;
  }
  res
    .status(error.status || 500)
    .send(error.message || "Internal Server Error");
};

export default errorHandler;
