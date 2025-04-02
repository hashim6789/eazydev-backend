import cors from "cors";
// import { env } from "./env.config";
console.log("hello");

/**
 * List of allowed origins for CORS.
 */
const allowedOrigins: string[] = [
  "http://localhost",
  "http://localhost:5173",
  "http://3.111.35.151", // Your actual server IP
  "http://3.111.35.151:5173",
];

const corsOptions: cors.CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean | string) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin); // Allow if origin is undefined (e.g., from a server-side request) or in the allowed list
    } else {
      callback(new Error("Not allowed by CORS")); // Deny if origin is not in the allowed list
    }
  },
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export const setupCors = cors(corsOptions);
