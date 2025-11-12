// import express from "express";
// import cors from "cors";
// import userRoutes from "./src/routes/userRoutes.js";
// import { corsOptions } from "./src/config/corsOptions.js";

// const app = express();
// const PORT = 4000;

// // 미들웨어
// app.use(express.json());
// app.use(cors(corsOptions));

// // 사용자 관련 라우트
// app.use("/", userRoutes);

// // 서버 실행
// app.listen(PORT, () => {
//   console.log(`✅ Server is running on http://localhost:${PORT}`);
// });

import app from "./src/app.js";

// 배포하면 PORT 서버 주소로 설정하기 //현재는 임시 4000포트에서 서버 실행
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
