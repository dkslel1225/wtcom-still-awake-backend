import fs from "fs";
import { getPath } from "../utils/getPathName.js";

export const submitUserData = (req, res) => {
  const userData = req.body;

  // 받은 데이터로, 백엔드 작업 수행
  console.log("Received user data:", userData);
  userRegistration(Number(userData.room), userData.job, userData.name);

  // response 보내기
  const userName = userData.name;
  const userJob = userData.job;
  const calledAsName = userData.calledAsName;

  // * 내 방 차지하는 요청들어올때 - 순차적으로 처리해야할듯 - 싱글스레드로
  res.status(200).json({
    success: true,
    message: "User created successfully",
    data: {
      myRoom: 304,
      job: userJob,
      name: userName,
      calledAs: calledAsName ? userName : userJob, //-> 이게 나중에 말 걸때 hey, 누구누구 이렇게 되는것..
    },
  });
};

//
const userRegistration = (roomNum, job, name) => {
  const path = getPath("../data/activatedRooms.json");
  const data = JSON.parse(fs.readFileSync(path, "utf-8"));

  const availableRooms = data.availableRooms;
  const activatedRooms = data.activatedRooms;
  let rooms = data.registered;
  let guests = data.guests;

  const selectedRoom = availableRooms.find((e) => e === roomNum) || false;
  if (selectedRoom && availableRooms.length > 0) {
    addRoom(availableRooms, activatedRooms, roomNum);
    registerUser(rooms, selectedRoom, name, job);
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    return;
    //{ success: true, temporary: false };
  }

  // 만석인 경우, 게스트로 추가
  registerGuest(guests);
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  return;
  // {  success: true,...guest,};
};

const addRoom = (availableRooms, activatedRooms, roomNum) => {
  const roomIdx = availableRooms.indexOf(roomNum); // 남은 방에서 room 삭제
  availableRooms.splice(roomIdx, 1);
  activatedRooms.push(roomNum); // 활성화 방 목록에 room 추가
};

const registerUser = (rooms, selectedRoom, name, job) => {
  rooms.push({
    room: selectedRoom,
    user: { name: name, job: job, socketId: "xyz" },
  });
};

const registerGuest = (guests) => {
  const tempName = `Guest${Math.floor(Math.random() * 1000)}`;
  const guest = { username: tempName, socketId: "ddd", temporary: true };

  guests.push(guest);
};
