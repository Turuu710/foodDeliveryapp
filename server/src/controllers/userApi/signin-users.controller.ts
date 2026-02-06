import { UserModel } from "../../models";
import { Request, Response } from "express";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
export const signInNewUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      res.status(400).json({
        message: "Burtgelgui hereglegch",
      });

      return;
    }

    const isValidPassword = compareSync(password, existingUser.password);

    if (!isValidPassword) {
      res.status(400).json({
        message: "Email esvel password buruu",
      });

      return;
    }
    const token = jwt.sign({ _id: existingUser._id }, "hello", {
      expiresIn: "2h",
    });

    res.status(200).send({ user: existingUser, token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "not found", error });
  }
};
