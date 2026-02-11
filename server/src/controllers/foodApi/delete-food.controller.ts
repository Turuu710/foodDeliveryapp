import { Request, Response } from "express";
import { Foodmodel } from "../../models";

export const deleteFood = async (res: Response, req: Request) => {
  try {
    const { id } = req.params;
    const result = await Foodmodel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "failed" });
  }
};
