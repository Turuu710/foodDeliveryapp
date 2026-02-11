import { Router } from "express";
import {
  createNewUser,
  deleteUser,
  signInNewUser,
  verifyPass,
  verifyResetPassword,
} from "../controllers/userApi";
import { authencation, authorization } from "../middlewares";
import { UserRole } from "../models";

export const userRouter = Router();

userRouter.post(
  "/create-user",
  //   authencation,
  //   authorization(UserRole.ADMIN),
  createNewUser,
);
userRouter.get("verify-user", verifyResetPassword);
userRouter.post("/signin-user", signInNewUser);
userRouter.post("/reset-password-request", verifyPass);
userRouter.delete("/delete-user", deleteUser);
