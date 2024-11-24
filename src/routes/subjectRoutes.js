import express from "express";
import {
  createSubject,
  deleteSubject,
  getSubjects,
  getSubjectsbyID,
} from "../controllers/subjectController.js";

const subjectRouter = express.Router();

subjectRouter.post("/", createSubject);
subjectRouter.get("/", getSubjects);
subjectRouter.delete("/:id", deleteSubject);
subjectRouter.get("/:id", getSubjectsbyID);

export default subjectRouter;
