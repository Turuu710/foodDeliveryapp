import { Request, Response } from "express";
import { UserModel } from "../../models";
import bcrypt from "bcrypt";
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      res.status(400).json({ message: "failed" });
      return;
    }
    const user = await UserModel.findOne({ email });

    // const savePassword = user.password;
    const hashedPassword = await bcrypt.hash(newPassword, 8);
  } catch (error) {
    res.status(400).json({ message: "message failed" });
  }
};
