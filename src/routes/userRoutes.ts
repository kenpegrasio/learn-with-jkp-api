import express from "express";
import {
  createUser,
  deleteUser,
  findUser,
  getUsers,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", findUser);
userRouter.delete("/:id", deleteUser)

export default userRouter;
