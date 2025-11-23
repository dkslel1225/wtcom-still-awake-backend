import { AppDataService } from "./AppDataService.js";
import { UserDataService } from "./UserDataService.js";

export class UserRegService {
  static userRegistration = (io, userDataZip) => {
    const appData = AppDataService.getAppData();
    const userData = UserDataService.getUserData();
    const { availableRooms, activatedRooms } = appData;
    const { roomNum } = userDataZip;
    let { users, hosts, guests } = userData;

    const alreadyBooked = activatedRooms.find((room) => room === roomNum);

    try {
      if (!alreadyBooked) {
        UserRegService.#registerRoom(availableRooms, activatedRooms, roomNum);
        UserRegService.#registerHost(users, hosts, userDataZip);

        AppDataService.writeAppData(appData);
        UserDataService.writeUserData(userData);

        io.emit("recent_activated_rooms", activatedRooms);

        return ["Host", null];
      }

      // 만석인 경우, 게스트로 등록함
      const guestId = UserRegService.#registerGuest(users, guests, userDataZip);
      UserDataService.writeUserData(userData);
      return ["Guest", guestId];
    } catch (e) {
      console.log(e);
    }
  };

  static #registerRoom(availableRooms, activatedRooms, roomNum) {
    const roomIdx = availableRooms.indexOf(roomNum);
    availableRooms.splice(roomIdx, 1); // availableRooms에서 roomNum 삭제
    activatedRooms.push(roomNum); // activatedRooms에서 roomNum 추가
  }

  //  userDataZip = { roomNum, job, name, nickName, socketId };
  static #registerHost(users, hosts, userDataZip) {
    const { roomNum, socketId } = userDataZip;
    const host = { roomNum, socketId, user: { ...userDataZip } };
    hosts.push(host);

    const userInfo = { socketId, userType: "Host", roomNum };
    users.push(userInfo);
  }

  static #registerGuest(users, guests, userDataZip) {
    const { socketId } = userDataZip;
    const guestId = "guest_" + Math.random().toString(36).substring(2, 10);
    const guest = { guestId, socketId, user: { ...userDataZip } };
    guests.push(guest);

    const userInfo = { socketId, userType: "Guest" };
    users.push(userInfo);
    return guestId;
  }
}
