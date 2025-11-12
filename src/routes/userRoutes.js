import express from "express";
import { submitUserData } from "../controllers/userEnterController.js";

const router = express.Router();

// 기본 라우트
router.get("/", (req, res) => {
  res.json({ message: "Hello Node.js Server!" });
});

// POST
router.post("/submitUserData", submitUserData);
export default router;
