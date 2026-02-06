import { FoodOrderModel } from "../../models";
import { Request, Response } from "express";
export const orderNewFood = async (req: Request, res: Response) => {
  try {
    const { user, totalPrice, foodOrderitems, status } = req.body;

    const newOrder = await FoodOrderModel.create({
      user,
      totalPrice,
      foodOrderitems,
      status,
    });
    res
      .status(200)
      .json({ message: "Шинэ захиалга амжилттай үүслээ", order: newOrder });
  } catch (error) {
    console.error("Захиалга үүсгэхэд алдаа гарлаа:", error);
    res.status(400).json({ message: "Захиалга үүсгэхэд алдаа гарлаа", error });
  }
};
