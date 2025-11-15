import { socketIdMap } from "../controllers/initializeSocket.js";

export const getSocketId = () => {
  const socketId = socketIdMap.get("socketId");
  return socketId;
};
