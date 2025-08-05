import cors from "cors";
// import { env } from "./env.config";

/**
 * List of allowed origins for CORS.
 */
const allowedOrigins: string[] = [
  "http://localhost",
  "http://localhost:5173",
  "https://www.eazydev.muhammedhashim.online",
  "https://eazydev.muhammedhashim.online",
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    //console.log("Request Origin:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Blocked by CORS: ${origin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export const setupCors = cors(corsOptions);
