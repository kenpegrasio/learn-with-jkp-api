import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "i_love_you";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, username, email, password } = req.body;

    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(password)) {
      res.status(400).json({
        message:
          "Password must be at least 8 characters long, contain at least one capital letter and one special character.",
      });
      return;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      res.status(400).json({ message: "Invalid email format." });
      return;
    }

    const user = new User({
      name,
      username,
      email,
      accesstype: "User",
      point: 0,
      password,
      completed_chapters: [],
      favourite_chapters: [],
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Username or email already exists." });
    } else {
      res
        .status(400)
        .json({ message: "Registration failed", error: error.message });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { emailOrUsername, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ message: "Login failed", error: error.message });
  }
};

export const getUserInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer", "").trim();
  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: "Token is not valid." });
  }
};

export const userMarkComplete = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer", "").trim();
  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const updated = await User.findByIdAndUpdate(
      decoded.userId,
      {
        $push: { completed_chapters: req.body.chapter_id },
        $inc: { point: 10 },
      },
      { new: true }
    );
    if (!updated) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(201).json(updated);
  } catch (error: any) {
    res.status(400).json({ message: "Token is not valid." });
  }
};

export const userFavourite = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer", "").trim();
  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const updated = await User.findByIdAndUpdate(
      decoded.userId,
      { $push: { favourite_chapters: req.body.chapter_id } },
      { new: true }
    );
    if (!updated) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(201).json(updated);
  } catch (error: any) {
    res.status(400).json({ message: "Token is not valid." });
  }
};
