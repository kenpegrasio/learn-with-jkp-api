import dotenv from "dotenv";
import connectDB from "./config/database";
import express from "express";
import userRouter from "./routes/userRoutes";
import cors from "cors";
import topicRouter from "./routes/topicRoutes";
import chapterRouter from "./routes/chapterRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Learn With JKP API!" });
});

app.use("/api/user", userRouter);
app.use("/api/topic", topicRouter);
app.use("/api/chapter", chapterRouter);

// app.listen(3000, () => {
//   console.log("Server is running on PORT 3000");
// });

export default app;
