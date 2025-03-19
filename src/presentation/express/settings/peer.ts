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

  // Listen on a dedicated port (e.g., 3001)
  const PORT = 3001;
  peerServer.listen(PORT, () => {
    console.log(`PeerJS server is running on http://localhost:${PORT}/peerjs`);
  });

  return peerServer;
};
