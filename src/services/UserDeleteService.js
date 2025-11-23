import { AppDataService } from "./AppDataService.js";
import { UserDataService } from "./UserDataService.js";

export class UserDeleteService {
  static userDelete = (io, socketId) => {
    const appData = AppDataService.getAppData();
    const userData = UserDataService.getUserData();
    const { availableRooms, activatedRooms } = appData;
    let { users, hosts, guests } = userData;

    try {
      const user = users.find((user) => user.socketId === socketId);
      UserDeleteService.#deleteUser(users, socketId);

      if (user.userType === "Host") {
        UserDeleteService.#deleteRoom(
          availableRooms,
          activatedRooms,
          user.roomNum
        );
        UserDeleteService.#deleteUser(hosts, socketId);

        AppDataService.writeAppData(appData);
        UserDataService.writeUserData(userData);

        io.emit("recent_deleted_room", user.roomNum);
      }
      if (user.userType === "Guest") {
        UserDeleteService.#deleteUser(guests, socketId);
        UserDataService.writeUserData(userData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  static #deleteRoom(availableRooms, activatedRooms, roomNum) {
    const roomIdx = activatedRooms.indexOf(roomNum);
    activatedRooms.splice(roomIdx, 1); // activatedRooms에서 myRoom 삭제
    availableRooms.push(roomNum); // availableRooms에 myRoom 추가
  }

  static #deleteUser(userArray, socketId) {
    const userIdx = userArray.findIndex(
      (deleteUser) => deleteUser.socketId === socketId
    );
    userArray.splice(userIdx, 1);
  }
}
