import { UserRegService } from "../services/UserRegistrationService.js";

// * 내 방 차지하는 요청들어올때 - 순차적으로 처리해야할듯 - 싱글스레드로
export const submitUserData = (io) => (req, res) => {
  const { room, job, name, calledAsName, avatarNum, socketId } = req.body;
  const roomNum = Number(room);
  const nickName = calledAsName ? name : job;
  const userDataZip = { roomNum, job, name, nickName, socketId };

  if (socketId == null) {
    //에러 전송
  }
  // 받은 데이터로, 백엔드 작업 수행
  try {
    const userTypeResult = UserRegService.userRegistration(io, userDataZip);

    if (userTypeResult[0] === "Host")
      res.status(200).json({
        success: true,
        message: "유저 등록 성공",
        data: {
          myRoom: roomNum,
          job: job,
          name: name,
          avatarNum: avatarNum,
          nickName: nickName,
          calledAs: calledAsName ? "Name" : "Job",
          userType: userTypeResult[0], // Host or Guest
          guestId: null,
        },
      });
    if (userTypeResult[0] === "Guest")
      res.status(201).json({
        success: true,
        message: "유저 등록 실패. 게스트 등록 성공",
        data: {
          myRoom: 0,
          job: job,
          name: name,
          avatarNum: avatarNum,
          nickName: nickName,
          calledAs: calledAsName ? "Name" : "Job",
          userType: userTypeResult[0], // Host or Guest
          guestId: userTypeResult[1],
        },
      });
  } catch (e) {
    // 에러 response 보내기. 회원 등록을 실패했습니다.
  }
};
