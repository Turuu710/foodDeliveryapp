import { Request, Response } from "express";
import { UserModel } from "../../models";
import { compareSync } from "bcrypt";
import { sendMail } from "../../utils";
import jwt from "jsonwebtoken";
export const verifyPass = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser = UserModel.findOne(email);

    if (!existingUser) {
      res.status(400).json({ message: "email not found" });
      return;
    }
    const token = jwt.sign({ _id: existingUser }, "hello", {
      expiresIn: "5min",
    });
    await sendMail(
      email,
      `${process.env.BACKEND_API}/verify-email?token=${token}`,
    );
    // const oldPassword = existingUser?.password
    const isValidPassword = compareSync(password, existingUser.password);
    if (!isValidPassword) {
      res.status(400).json({ message: " " });
      return;
    }
    res.status(200).send({ user: existingUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "not found", error });
  }
};
