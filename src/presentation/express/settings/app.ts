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

const app = express();

/**
 * CORS options for allowing all origins.
 */
const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:5173",
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

/**
 * Mounting routes for documentation, user-related, and authentication endpoints.
 */
// app.use("/", documentsRoutes);
app.use("/api", apiRouter);
// app.use("/authenticate", authenticateRoutes);

export { app };
