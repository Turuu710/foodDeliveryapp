import { Router } from "express";
import { createNewUser, signInNewUser } from "../controllers/userApi";
import { authencation, authorization } from "../middlewares";
import { UserRole } from "../models";
export const userRouter = Router();

userRouter.post(
  "/create-user",
  //   authencation,
  //   authorization(UserRole.ADMIN),
  createNewUser,
);

userRouter.post("/signin-user", signInNewUser);
