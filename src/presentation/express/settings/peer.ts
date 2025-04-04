import express, { Application } from "express";
import { createServer, Server } from "http";
import { ExpressPeerServer } from "peer";
import { env } from "../configs/env.config";

// export const initializePeerServer = () => {
//   const app: Application = express();
//   const peerServer = createServer(app);

//   // Attach PeerJS to this server
//   const peer = ExpressPeerServer(peerServer, {
//     path: "/peerjs",
//   });

//   app.use("/", peer);
//   const PORT = env.PEER_PORT;
//   peerServer.listen(PORT, () => {
//     console.log(
//       `PeerJS server is running on http://${env.DOMAIN}:${PORT}/peerjs`
//     );
//   });

//   return peerServer;
// };

export const initializePeerServer = (app: Application, server: Server) => {
  const peerServer = ExpressPeerServer(server, {
    path: "/peerjs",
    // debug: true,
    proxied: true, // Important if behind a reverse proxy (NGINX, Vercel, etc.)
    allow_discovery: true, // Allow peers to discover each other
  });

  app.use("/peerjs", peerServer);

  console.log(
    `✅ PeerJS running on http://${env.DOMAIN}:${env.PEER_PORT}/peerjs`
  );
};
