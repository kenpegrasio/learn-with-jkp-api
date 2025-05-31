import express from "express";
import {
  register,
  login,
  getUserInfo,
  userMarkComplete,
  userFavourite,
} from "../controllers/userController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/userInfo", getUserInfo);
router.post("/userMarkComplete", userMarkComplete);
router.post("/userFavourite", userFavourite);

export default router;
