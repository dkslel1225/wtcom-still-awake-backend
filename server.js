// server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Hello Node.js Server!" });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
