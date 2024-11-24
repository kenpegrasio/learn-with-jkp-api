import dotenv from "dotenv";
import connectDB from "./config/database.js";
import express from "express";
import subjectRouter from "./routes/subjectRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
import materialRouter from "./routes/materialRoutes.js";

const app = express();
app.use(express.json());

app.use(cors());

dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Learn With JKP API!" });
});

app.use("/api/subject", subjectRouter);
app.use("/api/user", userRouter);
app.use("/api/material", materialRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Listening on PORT " + PORT);
});
