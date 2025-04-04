import { server } from "./app";
import { env } from "../configs/env.config";

/**
 * Port number for the server to listen on.
 * Default is 3333, can be overridden with the PORT environment variable.
 */
const PORT = env.PORT || 3333;
const domain = env.DOMAIN || "localhost";

/**
 * Start the server and listen on the specified port.
 */

server.listen(PORT, () =>
  console.log(`Server is running in http://${domain}:${PORT}`)
);
