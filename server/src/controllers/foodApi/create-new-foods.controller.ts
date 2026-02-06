import { Foodmodel } from "../../models/food.model";
import { Request, Response } from "express";
export const createNewFoods = async (req: Request, res: Response) => {
  try {
    const { foodName, ingredients, price, category, image } = req.body;
    const newFood = await Foodmodel.create({
      foodName,
      ingredients,
      price,
      category,
      image,
    });
    res
      .status(200)
      .json({ message: "Шинэ хоол амжилттай үүслээ", food: newFood });
  } catch (error) {
    console.error("Хоол үүсгэхэд алдаа гарлаа:", error);
    res.status(400).json({ message: "Хоол үүсгэхэд алдаа гарлаа", error });
  }
};
