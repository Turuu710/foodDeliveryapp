import { models, model, Schema, ObjectId, Model } from "mongoose";
type User = {
  _id: ObjectId;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: UserRole;
  orderedFoods: ObjectId[];
  ttl: Date;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};
export enum UserRole {
  ADMIN = "admin",
  CUSTOMER = "customer",
}
const UserSchema = new Schema<User>(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CUSTOMER,
      required: true,
    },
    orderedFoods: [{ type: Schema.Types.ObjectId, ref: "Food" }],
    ttl: { type: Date, default: null },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const UserModel: Model<User> =
  models.User || model<User>("User", UserSchema);
