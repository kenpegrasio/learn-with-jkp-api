import Subject from "../models/Subject.js";

export const createSubject = async (req, res) => {
  try {
    const subject = new Subject({
      ...req.body,
      description: req.body.description || "",
    });
    await subject.save();
    console.log(subject);
    res.status(201).json(subject);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

export const getSubjectsbyID = async (req, res) => {
  try {
    const subject = await Subject.findOne({
      _id: req.params.id,
    });
    if (!subject) {
      res.status(200).json({});
    } else {
      res.status(200).json(subject);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findOneAndDelete({
      _id: req.params.id,
    });
    if (!subject) {
      res.status(404).json({ message: "Subject not found " });
    } else {
      res.status(200).json({ message: "Subject deleted successfully" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};
