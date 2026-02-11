import { Request, Response } from "express";
import { UserModel } from "../../models";
import bcrypt from "bcrypt";
import { sendMail } from "../../utils";
import jwt from "jsonwebtoken";
import { verifyResetPassword } from "./verify-reset-password-request.controller";
export const verifyPass = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    const oldPassword = existingUser?.password;
    const isValidPassword = await bcrypt.compare(password, oldPassword!);

    if (!isValidPassword) {
      const token = jwt.sign({ email }, "hello", {
        expiresIn: "5min",
      });
      await sendMail(
        email,
        `${process.env.BACKEND_API}/verify-user?token=${token}`,
      );

      res
        .status(200)
        .json({ message: "ok", userInformation: existingUser, token });
      return;
    }
    res.status(200).json({ message: "welcome" });
  } catch (error) {
    res.status(400).json({ message: "not found", error });
  }
};
