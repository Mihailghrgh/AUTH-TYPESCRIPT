import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorRequestHandler } from "express";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
  return res.status(400).json({ message: error.message, errors });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH ${req.path}`, error);

  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }
  return res
    .status(error.status || 500)
    .send(error.message || "Internal Server Error");
};

export default errorHandler;
