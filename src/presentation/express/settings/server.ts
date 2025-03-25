import { app } from "./app";
import http from "http";
import { connectSocket } from "./socket";
import { env } from "../configs/env.config";

/**
 * Port number for the server to listen on.
 * Default is 3333, can be overridden with the PORT environment variable.
 */
const PORT = env.PORT || 3000;
const domain = env.DOMAIN || 3000;

// Create HTTP server
const server = http.createServer(app);

// === Initialize Socket.IO ===
connectSocket(server);

/**
 * Start the server and listen on the specified port.
 */

server.listen(PORT, () =>
  console.log(`Server is running in http://${domain}:${PORT}`)
);
