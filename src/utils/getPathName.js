import path from "path";
import { fileURLToPath } from "url";

// import.meta.url 기준으로 현재 파일(server.js) 디렉토리 가져오기
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getPath = (dataPath) => {
  const DATA_FILE = path.join(__dirname, dataPath);
  return DATA_FILE;
};
