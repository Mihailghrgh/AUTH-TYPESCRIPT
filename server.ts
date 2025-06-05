import express from "express";
import next from "next";
import cors from "cors";
import { createServer } from "node:http";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";
import { authRoutes } from "./routes/auth.route.js";
import dotenv from "dotenv";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const nextApp = next({ dev, hostname, port });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  dotenv.config();
  const app = express();
  app.use(cors({ origin: process.env.AP_ORIGIN, credentials: true }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
  });

  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", server: "running" });
  });

  app.use("/auth", authRoutes);

  app.use((req, res) => {
    return nextHandler(req, res);
  });

  app.use(errorHandler);

  const httpServer = createServer(app);

  httpServer
    .once("error", (err) => {
      console.error("Error occurred:", err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`>>>>>>>> Ready on http://${hostname}:${port}`);
    });
});
