import { ChatSocketService } from "../services/ChatSocketService.js";

export function chatSocket(io) {
  io.on("connect", (socket) => {
    let currentChatRoom = null;
    let currentNickname = null;

    // EVENT: 채팅방 참여
    socket.on("joinRoom", (roomNumber, nickName) => {
      socket.join(roomNumber);
      currentChatRoom = roomNumber;
      currentNickname = nickName; // disconnect 이벤트에 사용함

      const participants = ChatSocketService.addParticipant(
        roomNumber,
        nickName
      ); // 참여자 목록에 추가

      io.to(roomNumber).emit("notification", participants); //Room 내의 모든 소켓(자기 자신 포함)에게 전송하려면 socket.to.emit이 아니라 io.to
    });

    // EVENT: 채팅방 나감
    socket.on("leaveRoom", (roomNumber, nickName) => {
      socket.leave(roomNumber);
      currentChatRoom = null;

      const participants = ChatSocketService.removeParticipant(
        roomNumber,
        nickName
      ); // 참여자 목록에서 삭제

      socket.to(roomNumber).emit("notification", participants); // 채팅방 참여자에게, 참여자 목록 업데이트
    });

    // EVENT: 연결 끊김 (연결 해제 시에도 자동으로 모든 Room에서 나감)
    socket.on("disconnect", () => {
      if (currentChatRoom && currentNickname) {
        const participants = ChatSocketService.removeParticipant(
          currentChatRoom,
          currentNickname
        );
        socket.to(currentChatRoom).emit("notification", participants);
      }

      currentChatRoom = null;
      currentNickname = null;
    });
  });
}
