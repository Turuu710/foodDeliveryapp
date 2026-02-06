import { Router } from "express";
import { orderNewFood } from "../controllers/foodApi/order-new-food.controller";
import { authencation, authorization } from "../middlewares";
import { UserRole } from "../models";

export const orderRouter = Router();
orderRouter.post(
  "/create-order",
  authencation,
  authorization(UserRole.ADMIN),
  orderNewFood,
);
