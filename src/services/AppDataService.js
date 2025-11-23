import fs from "fs";
import { APP_DATA_PATH } from "../constants/filePath.js";

// 앱 데이터 관리 서비스 ..rooms[]
export class AppDataService {
  // static 메서드: 클래스 이름을 통해 바로 접근 가능(인스턴스 생성 없이 클래스 자체에 접근)
  static getAppData() {
    const data = fs.readFileSync(APP_DATA_PATH, "utf-8");
    return JSON.parse(data);
  }

  static writeAppData(data) {
    fs.writeFileSync(APP_DATA_PATH, JSON.stringify(data, null, 2));
  }
}
