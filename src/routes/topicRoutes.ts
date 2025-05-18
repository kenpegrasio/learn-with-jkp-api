import express from "express";
import {
  createTopic,
  deleteTopic,
  getTopic,
  getTopicById,
  updateTopic,
} from "../controllers/topicController";

const topicRouter = express.Router();

topicRouter.post("/", createTopic);
topicRouter.get("/", getTopic);
topicRouter.get("/:id", getTopicById);
topicRouter.put("/:id", updateTopic);
topicRouter.delete("/:id", deleteTopic);

export default topicRouter;
