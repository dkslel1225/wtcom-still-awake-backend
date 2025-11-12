import express from "express";
import cors from "cors";

import { corsOptions } from "./config/corsOptions.js";
import { submitUserData } from "./controllers/userEnterController.js";

const app = express();

// ✅ 모든 미들웨어 설정은 여기서
app.use(cors(corsOptions));
app.use(express.json());

// ✅ 라우트 연결
app.use("/submit/userdata", submitUserData);

app.get("/", (req, res) => {
  res.json({ message: "Hello Node.js Server!" });
});

export default app;
