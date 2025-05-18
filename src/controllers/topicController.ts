import { Request, Response } from "express";
import Topic from "../models/Topic";

export const createTopic = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const topic = new Topic({
      ...req.body,
      description: req.body.description || "",
      attachment: req.body.attachment || [],
      chapters: req.body.chapters || [],
    });
    const saved = await topic.save();
    res.status(201).json(saved);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getTopic = async (req: Request, res: Response): Promise<void> => {
  try {
    const topics = await Topic.find().populate("chapters");
    res.json(topics);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getTopicById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const topic = await Topic.findById(req.params.id).populate("chapters");
    if (!topic) {
      res.status(404).json({ error: "Topic not found" });
      return;
    }
    res.json(topic);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateTopic = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updated = await Topic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      res.status(404).json({ error: "Topic not found" });
      return;
    }
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTopic = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleted = await Topic.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "Topic not found" });
      return;
    }
    res.json({ message: "Topic deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
