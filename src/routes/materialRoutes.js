import express from "express";
import {
  createMaterial,
  deleteMaterialbyID,
  getMaterials,
  getMaterialsbyID,
} from "../controllers/materialController.js";

const materialRouter = express.Router();

materialRouter.post("/", createMaterial);
materialRouter.get("/", getMaterials);
materialRouter.get("/:id", getMaterialsbyID);
materialRouter.delete("/:id", deleteMaterialbyID);

export default materialRouter;
