import { Request, Response } from "express";
import { UserModel } from "../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../../utils/mail-utils";
export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password, phoneNumber, address } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      // console.error("failed");

      res.status(400).json({
        message: "Ийм имэйлтэй хэрэглэгч аль хэдийнэ бүртгэлтэй байна",
      });

      return;
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await UserModel.create({
      userName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });

    const token = jwt.sign({ _id: newUser._id }, "hello", {
      expiresIn: "2h",
    });
    await sendMail(
      email,
      `${process.env.BACKEND_API}/verify-email?token=${token}`,
    );
    res.status(200).json({
      message: "Шинэ хэрэглэгч амжилттай үүслээ",
      user: newUser,
      token,
    });
  } catch (error) {
    console.error("Хэрэглэгч үүсгэхэд алдаа гарлаа:", error);
    res.status(400).json({ message: "Хэрэглэгч үүсгэхэд алдаа гарлаа", error });
  }
};
