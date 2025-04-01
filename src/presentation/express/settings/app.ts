import cors from "cors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// import { authenticateRoutes } from "../routers/authenticate";
// import { documentsRoutes } from "../routers/documentation";
import { apiRouter } from "../routers";

/**
 * Express connections instance.
 */
import { connectDB } from "../../../infra/databases/mongoose/connecton";
import { initializePeerServer } from "./peer";
import { connectSocket } from "./socket";

const app = express();

/**
 * CORS options for allowing all origins.
 */
const allowedOrigins: string[] = ["http://localhost", "http://localhost:5173"];

const corsOptions: cors.CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean | string) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(sessionConfig);
app.use(cookieParser());

// Database connection setup
connectDB();

// === Initialize PeerJS ===
initializePeerServer();

/**
 * Mounting routes for documentation, user-related, and authentication endpoints.
 */
// app.use("/", documentsRoutes);
app.use("/api", apiRouter);
// app.use("/authenticate", authenticateRoutes);

export { app };
