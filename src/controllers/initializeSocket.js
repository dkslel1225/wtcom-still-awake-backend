import { AppDataService } from "../services/AppDataService.js";
import { UserDeleteService } from "../services/UserDeleteService.js";

let userCount = 0;

//Socket.IO 서버 연결 로직
export function initializeSocket(io) {
  io.on("connect", (socket) => {
    userCount += 1;
    console.log(`새로운 사용자 접속 - ${socket.id}, ${userCount}`);

    const activatedRooms = AppDataService.getAppData().activatedRooms;
    io.emit("recent_activated_rooms", activatedRooms);

    // 3. 연결 해제 이벤트 - 프론트가 끊으면 자동으로 호출
    socket.on("disconnect", () => {
      userCount -= 1;
      UserDeleteService.userDelete(io, socket.id);
      console.log(
        `사용자 연결 해제: ${socket.id}. 현재 접속자 수: ${userCount}`
      );
    });
  });

  //Socket.IO 로직 초기화
}
