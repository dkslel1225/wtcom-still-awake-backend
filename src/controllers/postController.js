import { getAppData, writeAppData } from "../utils/useAppData.js";

// * 내 방 차지하는 요청들어올때 - 순차적으로 처리해야할듯 - 싱글스레드로
export const submitUserData = (io) => (req, res) => {
  const { room, job, name, calledAsName, socketId } = req.body;
  const roomNum = Number(room);
  const nickName = calledAsName ? name : job;
  const userDataZip = { job, name, nickName, socketId };

  // 받은 데이터로, 백엔드 작업 수행
  try {
    const userTypeResult = userRegistration(io, roomNum, userDataZip);

    res.status(200).json({
      success: true,
      message: "유저 등록 성공",
      data: {
        myRoom: roomNum,
        job: job,
        name: name,
        calledAs: nickName, //-> 이게 나중에 말 걸때 hey, 누구누구 이렇게 되는것..
        userType: userTypeResult, // Host or Guest
      },
    });
  } catch (e) {
    // 에러 response 보내기. 회원 등록을 실패했습니다.
  }
};

const userRegistration = (io, room, userDataZip) => {
  const data = getAppData();
  const availableRooms = data.availableRooms;
  const activatedRooms = data.activatedRooms;
  let rooms = data.registered;
  let guests = data.guests;

  const validateRoom = availableRooms.find((e) => e === room) || false;

  if (validateRoom && availableRooms.length > 0) {
    updateRoomList(availableRooms, activatedRooms, room);
    registerAsHost(rooms, room, userDataZip);
    writeAppData(data);

    io.emit("recent_activated_rooms", activatedRooms);

    //return `Welcome! ${nickName}.`;
    return "Host";
  }

  // 만석인 경우, 게스트로 추가
  registerAsGuest(guests, userDataZip);
  writeAppData(data);

  //return `The building's rooms are fully booked. You will be admitted as a guest.`;
  return "Guest";
};

const updateRoomList = (availableRooms, activatedRooms, roomNum) => {
  // add room
  const roomIdx = availableRooms.indexOf(roomNum); // 남은 방에서 room 삭제
  availableRooms.splice(roomIdx, 1);
  activatedRooms.push(roomNum); // 활성화 방 목록에 room 추가
};

const registerAsHost = (rooms, room, userDataZip) => {
  rooms.push({
    room: room,
    user: { ...userDataZip },
  });
};

const registerAsGuest = (guests, userDataZip) => {
  const guest = { ...userDataZip };

  guests.push(guest);
};
