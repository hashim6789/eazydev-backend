import express, { Application } from "express";
import { Server } from "http";
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
    proxied: true,
    allow_discovery: true, // Let peers discover each other
    // debug: true, // Enable debugging logs
  });

  app.use("/peerjs", peerServer);
  console.log(`✅ PeerJS running at /peerjs`);
};
