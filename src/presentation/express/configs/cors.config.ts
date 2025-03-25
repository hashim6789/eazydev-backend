import cors from "cors";
import { env } from "./env.config";

const corsOptions: cors.CorsOptions = {
  origin: env.FRONTEND_HOST,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export const setupCors = cors(corsOptions);
