import { getAppData } from "../utils/useAppData.js";

export const socketIdMap = new Map();
let userCount = 0;

//Socket.IO 서버 연결 로직
export function initializeSocket(io) {
  io.on("connect", (socket) => {
    userCount += 1;
    socketIdMap.set("socketId", socket.id);
    console.log(`새로운 사용자 접속 - ${socket.id}, ${userCount}`);

    const activatedRooms = getAppData().activatedRooms;
    io.emit("recent_activated_rooms", activatedRooms);

    // 3. 연결 해제 이벤트 - 프론트가 끊으면 자동으로 호출
    socket.on("disconnect", () => {
      socketIdMap.delete("socketId");
      userCount -= 1;
      console.log(
        `사용자 연결 해제: ${socket.id}. 현재 접속자 수: ${userCount}`
      );

      // 4. 연결 해제 후 모든 클라이언트에게 업데이트된 접속자 수를 전송
      io.emit("users-update-after-disconnect", userCount);
    });
  });

  //Socket.IO 로직 초기화
}
