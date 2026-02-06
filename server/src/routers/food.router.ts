import { Router } from "express";
import { createNewFoods } from "../controllers/foodApi";
import { authencation, authorization } from "../middlewares";
import { UserRole } from "../models";

export const foodRouter = Router();
foodRouter.post(
  "/create-food",
  authencation,
  authorization(UserRole.ADMIN),
  createNewFoods,
);
