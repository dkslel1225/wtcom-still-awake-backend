import { getPath } from "./getPathName.js";
import fs from "fs";

const path = getPath("../data/appData.json");

export const writeAppData = (data) => {
  fs.writeFileSync(path, JSON.stringify(data, null, 2)); // 데이터 업데이트
};

export const getAppData = () => {
  const data = JSON.parse(fs.readFileSync(path, "utf-8"));
  return data;
};
