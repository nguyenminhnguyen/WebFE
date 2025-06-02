import { io } from "socket.io-client";

let socket = null;

export function connectSocket() {
  if (!socket) {
    socket = io("https://findwork-backend.onrender.com");
    socket.connect();
    console.log("Socket connected");
  }
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}