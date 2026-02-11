import { Request, Response } from "express";
import { UserModel } from "../../models";

export const deleteUser = async (res: Response, req: Request) => {
  try {
    const { id } = req.params;
    const result = await UserModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "failed" });
  }
};
