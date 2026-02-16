import { Request, Response } from "express";
import { UserModel } from "../../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { newToken } = req.query;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const existingUser = await UserModel.findByIdAndUpdate(password);
    const oldPassword = existingUser?.password;
    const isValidPassword = await bcrypt.compare(password, oldPassword!);
    const token = jwt.sign({ newToken }, "hello", {
      expiresIn: "5min",
    });
    if (!isValidPassword) {
      res.status(400).json({ message: "faill" });
      return;
    }
    res.status(200).json({ existingUser: hashedPassword, token });
  } catch (error) {
    res.status(400).json({ message: "failedd" });
  }
};
