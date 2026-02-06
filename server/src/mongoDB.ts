import mongoose from "mongoose";
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOB_CONNECTION_STRING as string);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
export default connectMongoDB;
