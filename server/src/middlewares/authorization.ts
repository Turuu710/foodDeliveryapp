import { NextFunction, Request, Response } from "express";

export const authorization =
  (...role: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    if (role.includes(user.role)) {
      req.body.user = user;
      next();
    } else {
      res.status(400).send({ message: "Invalid role" });
    }
  };
