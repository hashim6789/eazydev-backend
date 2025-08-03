import { Server as SocketIOServer, Socket, Namespace } from "socket.io";
import { Server as HttpServer } from "http";
import { env } from "../configs";

//notification
export const handleNotification = (
  io: SocketIOServer,
  socket: Socket
): void => {
  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
};

//group chat
export const handleGroupChat = (namespace: Namespace, socket: Socket): void => {
  socket.on("setup", (userId: string) => {
    socket.join(userId);
    console.log("room created and user joined", userId);
    socket.emit("connected");
  });

  socket.on("join chat", (roomData) => {
    socket.join(roomData.groupId);

    const roomSize = namespace.adapter.rooms.get(roomData.groupId)?.size || 0;
    console.log(
      "user joined the group",
      roomData.groupId,
      "room size =",
      roomSize
    );

    socket.to(roomData.groupId).emit("online", { onlineCount: roomSize });
  });

  socket.on("start typing", (typeData) =>
    socket
      .to(typeData.groupId)
      .emit("start typing", { typeName: typeData.firstName })
  );
  socket.on("stop typing", (roomData) =>
    socket.to(roomData.groupId).emit("stop typing")
  );

  socket.on("send message", (message) => {
    console.log("message", message);

    socket.to(message.groupId).emit("receive message", message);
  });
  socket.on("leave chat", (roomData) => {
    socket.leave(roomData.groupId);
    const roomSize = namespace.adapter.rooms.get(roomData.groupId)?.size || 0;

    console.log(
      `User ${socket.id} left group ${roomData.groupId} room size =`,
      roomSize
    );

    socket.to(roomData.groupId).emit("online", { onlineCount: roomSize });
  });
};

// src/infrastructure/socket/socketSetup.ts
let io: SocketIOServer | undefined;

export const connectSocket = (server: HttpServer): SocketIOServer => {
  io = new SocketIOServer(server, {
    cors: {
      origin: env.FRONTEND_HOST,
      // origin: "https://www.muhammedhashim.online",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    if (io) {
      handleNotification(io, socket);
    }

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });

  // Namespace for Chats
  const chatNamespace = io.of("/chats");
  chatNamespace.on("connection", (socket) => {
    console.log("A user connected to /chats namespace:", socket.id);
    handleGroupChat(chatNamespace, socket); // Pass Namespace instead of Server
    socket.on("disconnect", () => {
      console.log("A user disconnected from /chats namespace:", socket.id);
    });
  });

  return io;
};

export const getIo = (): SocketIOServer => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
