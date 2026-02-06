import { Request, Response } from "express";

export const verifyResetPassword = async (req: Request, res: Response) => {
  try {
    const newToken = token;
    res.status(200).redirect(`local3000/reset-pass?token=${newToken}`);
  } catch (error) {}
};
