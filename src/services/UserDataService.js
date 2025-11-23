import fs from "fs";
import { USER_DATA_PATH } from "../constants/filePath.js";

// 유저 데이터 관리 서비스
export class UserDataService {
  static getUserData() {
    const data = fs.readFileSync(USER_DATA_PATH, "utf-8");
    return JSON.parse(data);
  }

  static writeUserData(data) {
    fs.writeFileSync(USER_DATA_PATH, JSON.stringify(data, null, 2));
  }
}
