import express, { Application } from "express";
import { createServer } from "http";
import { ExpressPeerServer } from "peer";
import { env } from "../configs/env.config";

export const initializePeerServer = () => {
  const app: Application = express();
  const peerServer = createServer(app);

  // Attach PeerJS to this server
  const peer = ExpressPeerServer(peerServer, {
    path: "/peerjs",
  });

  app.use("/", peer);
  const PORT = env.PEER_PORT;
  peerServer.listen(PORT, () => {
    console.log(
      `PeerJS server is running on http://${env.DOMAIN}:${PORT}/peerjs`
    );
  });

  return peerServer;
};
