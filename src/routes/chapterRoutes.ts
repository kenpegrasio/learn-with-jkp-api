import express from "express";
import {
  createChapter,
  deleteChapter,
  getChapter,
  getChapterById,
  updateChapter,
} from "../controllers/chapterController";

const chapterRouter = express.Router();

chapterRouter.post("/", createChapter);
chapterRouter.get("/", getChapter);
chapterRouter.get("/:id", getChapterById);
chapterRouter.put("/:id", updateChapter);
chapterRouter.delete("/:id", deleteChapter);

export default chapterRouter;
