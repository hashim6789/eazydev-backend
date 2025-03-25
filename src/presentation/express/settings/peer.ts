import express, { Application } from "express";
import { createServer } from "http";
import { ExpressPeerServer } from "peer";

export const initializePeerServer = () => {
  const app: Application = express();
  const peerServer = createServer(app);

  // Attach PeerJS to this server
  const peer = ExpressPeerServer(peerServer, {
    path: "/peerjs",
  });

  app.use("/", peer);
  const PORT = 3001;
  peerServer.listen(PORT, () => {
    console.log(`PeerJS server is running on http://localhost:${PORT}/peerjs`);
  });

  return peerServer;
};
