import { Router } from "express";
import { createNewFoods, deleteFood } from "../controllers/foodApi";
import { authencation, authorization } from "../middlewares";
import { UserRole } from "../models";

export const foodRouter = Router();
foodRouter.post(
  "/create-food",
  authencation,
  authorization(UserRole.ADMIN),
  createNewFoods,
);
foodRouter.delete("/delete-food", deleteFood);
