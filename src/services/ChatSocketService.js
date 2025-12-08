import { AppDataService } from "./AppDataService.js";

export class ChatSocketService {
  static #getRoomParticipants(roomNumber, appData) {
    const room = appData.roomParticipants.find(
      (room) => room.roomNum === roomNumber
    );
    return room.participants;
  }

  // 방 참여자 추가(본인)
  static addParticipant(roomNumber, nickName) {
    const appData = AppDataService.getAppData();
    const participants = this.#getRoomParticipants(roomNumber, appData);
    participants.push(nickName);
    AppDataService.writeAppData(appData);

    return participants;
  }

  // 방 참여자 제거(본인)
  static removeParticipant(roomNumber, nickName) {
    const appData = AppDataService.getAppData();
    const participants = this.#getRoomParticipants(roomNumber, appData);

    if (participants.length !== 0) {
      const idx = participants.findIndex((name) => name === nickName);
      participants.splice(idx, 1);
      AppDataService.writeAppData(appData);
    }

    return participants;
  }
}
