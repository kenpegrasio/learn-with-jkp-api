import { Request, Response } from "express";
import Chapter from "../models/Chapter";
import Topic from "../models/Topic";

export const createChapter = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const chapter = new Chapter({
      ...req.body,
      description: req.body.description || "",
      attachment: req.body.attachment || [],
    });
    const saved = await chapter.save();

    await Topic.findByIdAndUpdate(
      chapter.topic_id,
      { $push: { chapters: saved._id } },
      { new: true }
    );

    res.status(201).json(saved);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getChapter = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const chapters = await Chapter.find();
    res.json(chapters);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getChapterById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) {
      res.status(404).json({ error: "Chapter not found" });
      return;
    }
    res.json(chapter);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateChapter = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updated = await Chapter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      res.status(404).json({ error: "Chapter not found" });
      return;
    }
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteChapter = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const chapter = await Chapter.findByIdAndDelete(req.params.id);
    if (!chapter) {
      res.status(404).json({ error: "Chapter not found" });
      return;
    }

    await Topic.findByIdAndUpdate(chapter.topic_id, {
      $pull: { chapters: chapter._id },
    });

    res.json({ message: "Chapter deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
