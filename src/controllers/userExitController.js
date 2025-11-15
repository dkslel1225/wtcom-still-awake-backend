import fs from "fs";
import { getPath } from "../utils/getPathName.js";

export const userExitController = (req, res) => {
  const userData = req.body;

  const path = getPath("../data/activatedRooms.json");
  const data = JSON.parse(fs.readFileSync(path, "utf-8"));

  const availableRooms = data.availableRooms;
  const activatedRooms = data.activatedRooms;
  let rooms = data.registered;
  let guests = data.guests;

  // 받은 데이터로, 백엔드 작업 수행
  if (userData.isUser) {
    deleteRoom(availableRooms, activatedRooms, roomNum);
    exitUser(rooms, roomNum);
    return;
  }
  exitGuest(guests, guestName);
  return;
};

// 유저 연결 끊어지면 실행(방 삭제)
const deleteRoom = (availableRooms, activatedRooms, roomNum) => {
  const roomIdx = activatedRooms.indexOf(roomNum); // 활성화 방 목록에서 room 삭제
  activatedRooms.splice(roomIdx, 1);
  availableRooms.push(roomNum); // 활성화 방 목록에 room 추가
};

const exitUser = (rooms, selectedRoom) => {
  rooms = rooms.filter((item) => item.room !== selectedRoom);
};

const exitGuest = (guests, username) => {
  guests = guests.filter((item) => item.username !== username);
};
