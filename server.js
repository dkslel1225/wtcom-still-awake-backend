import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { corsOptions } from "./src/config/corsOptions.js";

import { submitUserData } from "./src/controllers/postController.js";
import { initializeSocket } from "./src/controllers/initializeSocket.js";

const PORT = process.env.PORT || 4000;
export const app = express(); // express 앱

// 미들웨어 설정
app.use(cors(corsOptions));
app.use(express.json());

// 서버 구동 및 socket.io 적용
// HTTP 서버 객체 생성 (Socket.IO의 기반)
const httpServer = createServer(app);

// Socket.IO 서버 생성 및 HTTP 서버에 연결
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
initializeSocket(io); //Socket.IO 로직 초기화

// HTTP 라우팅 목록
app.use("/submit/userdata", submitUserData(io)); //submitUserData 컨트롤러가 io를 인수로 받음

// HTTP 서버 리스닝 시작
httpServer.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`⚡️ Socket.IO attached to port ${PORT}`);
});
