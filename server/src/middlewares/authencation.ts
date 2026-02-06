import { NextFunction, Request, Response } from "express";
import jwt, { verify } from "jsonwebtoken";
import { UserModel } from "../models";

export const authencation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authtoken = req.headers.authorization;
  if (!authtoken) {
    res.status(400).json({ message: "Authentication token missing" });
    return;
  }
  if (!authtoken.startsWith("Bearer ")) {
    res.status(400).json({ message: "Invalid authentication token format" });
    return;
  }
  const token = authtoken.split(" ")[1] ?? "";
  const verifiedToken = verify(token, "hello") as { _id: string };
  if (!verifiedToken._id) {
    res.status(400).send({ message: "Invalid token3" });
    return;
  }
  const userId = verifiedToken._id;
  const existingUser = await UserModel.findById(userId);
  if (!existingUser) {
    res.status(400).json({ message: "Invalid token 4" });
    return;
  }
  req.body.user = existingUser;
  next();
};
