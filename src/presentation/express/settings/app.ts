import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { apiRouter } from "../routers";

/**
 * Express connections instance.
 */
import { connectDB } from "../../../infra/databases/mongoose/connecton";
import { initializePeerServer } from "./peer";
import { env, setupCors } from "../configs";

const app = express();

app.use(morgan("dev"));
app.use(setupCors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database connection setup
connectDB();

if (env.NODE_ENV === "development") {
  // === Initialize PeerJS ===
  initializePeerServer();
}

/**
 * Mounting routes for documentation, user-related, and authentication endpoints.
 */
app.use("/api", apiRouter);

export { app };
