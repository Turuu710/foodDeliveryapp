import { models, model, Schema, ObjectId, Model } from "mongoose";
export enum FoodOrderStatus {
  PENDING = "pending",
  PREPARING = "preparing",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}
const FoodOrderitemSchema = new Schema({
  food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
  quantity: { type: Number, required: true, default: 1 },
});

type FoodOrderitem = {
  food: Schema.Types.ObjectId;
  quantity: Number;
};
type FoodOrder = {
  _id: ObjectId;
  user: ObjectId;
  totalPrice: Number;
  foodOrderitems: FoodOrderitem[];
  status: FoodOrderStatus;
  createdAt: Date;
  updatedAt: Date;
};
const FoodOrderSchema = new Schema<FoodOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalPrice: { type: Number, required: true },
    foodOrderitems: [FoodOrderitemSchema],
    status: {
      type: String,
      enum: Object.values(FoodOrderStatus),
      default: FoodOrderStatus.PENDING,
      required: true,
    },
  },
  { timestamps: true },
);

export const FoodOrderModel: Model<FoodOrder> =
  models.FoodOrder || model<FoodOrder>("FoodOrder", FoodOrderSchema);
