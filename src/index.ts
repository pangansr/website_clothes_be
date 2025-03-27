import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import errorHandler from "./middleware/errorHandler";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import productRouter from "./routes/product.routes";
import cartRouter from "./routes/cart.routes";
import purchaseRouter from "./routes/purchase.routes";
import compression from "compression";



dotenv.config();
const port = process.env.PORT || 5000; 
const app = express();
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://clothes-eosin.vercel.app"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/auth", (req, res) => {
    res.send("ddddddddddddddđ");
  });
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/purchase", purchaseRouter);

app.use(errorHandler);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

if (!accessTokenSecret || !refreshTokenSecret) {
    throw new Error("Missing environment variables for JWT tokens.");
}
mongoose.connect("mongodb+srv://user:123456aA%40@mydb.npp4k.mongodb.net/test?retryWrites=true&w=majority")
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });


app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});


