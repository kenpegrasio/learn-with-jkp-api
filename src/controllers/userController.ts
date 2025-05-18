import { Request, Response } from "express";
import User from "../models/User";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = new User({
      ...req.body,
      point: req.body.point || 0,
      accesstype: req.body.accesstype || "User",
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

export const findUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({
      google_id: req.params.id,
    });
    if (!user) {
      res.status(200).json({});
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(404).json({ message: "No users found" });
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOneAndDelete({
      google_id: req.params.id,
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};
