import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  },
});

// { userId : socketId }
const userSocketMap = {};

// { receiverId : [senderIds...] }
const typingUsers = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // ==========================
  // Typing Indicator
  // ==========================

  socket.on("typing", ({ senderId, receiverId }) => {
    if (!receiverId) return;

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing", {
        senderId,
      });
    }
  });

  socket.on("stopTyping", ({ senderId, receiverId }) => {
    if (!receiverId) return;

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("stopTyping", {
        senderId,
      });
    }
  });

  // ==========================

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    delete userSocketMap[userId];
    delete typingUsers[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };