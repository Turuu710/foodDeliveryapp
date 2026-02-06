import { configDotenv } from "dotenv";
import { Application } from "express";
import cors from "cors";
import express from "express";
import { userRouter } from "./routers/user.router";
import connectMongoDB from "./mongoDB";
import { foodRouter, orderRouter } from "./routers";

configDotenv();

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/food", foodRouter);
app.use("/order", orderRouter);

app.listen(7000, async () => {
  console.log("Listening");
  await connectMongoDB();
});
