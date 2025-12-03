import { UserDataService } from "../services/UserDataService.js";

export const getTargetDataController = () => (req, res) => {
  const roomNumber = req.params.roomNumber; // URL 경로에 있는 'roomNumber' 값을 가져옴
  const roomNum = Number(roomNumber); // URL에서 가져온 값은 문자열(string) 형태라서, 숫자로 형변환 필요
  console.log(`요청받은 방 번호: ${roomNum}`);

  // 2. 해당 방 번호를 이용해 데이터를 조회하는 로직을 수행합니다.
  const hostData = findHostDataByRoom(roomNum); // (예시 함수)

  if (hostData) {
    res.status(200).json({
      success: true,
      message: "방 주인 정보 조회 성공",
      data: hostData,
    });
  } else {
    res.status(404).json({
      success: false,
      message: `${roomNum}호의 주인 정보를 찾을 수 없습니다.`,
    });
  }
};

const findHostDataByRoom = (roomNum) => {
  const hosts = UserDataService.getUserData().hosts;
  const hostData = hosts.find((host) => host.roomNum === roomNum);
  return hostData.user;
};
