import * as globalTypes from "../../types/global";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/userModel";
import mongoose from 'mongoose';
const protectRoute = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        // Lấy token từ header authorization
        const token = req.headers["authorization"]?.split(" ")[1];
        console.log("token",token);
        if (token) {
            try {
                // Giải mã token và lấy _id người dùng
                console.log("decodedccccccccc");
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
                    userId: string;
                };
console.log("decoded",decoded);
           
                console.log("userId",decoded.userId);
                const user = await User.findById(decoded.userId).select("-password");
                console.log("user",user);

             
                if (!user) {
                    res.status(401);
                    throw new Error("User not found, Not Authorized");
                }

                // Đính kèm thông tin người dùng vào req.user
                req.user = {
                    ...user.toObject(),
                    _id: user._id.toString()
                
                };

                // Tiếp tục xử lý middleware tiếp theo
                next();
            } catch (error: any) {
                res.status(401);
                console.error("Lỗi khi verify token:", error);
            }
        } else {
            res.status(401);
            throw new Error("No Token, Not Authorized");
        }
    }
);


export default protectRoute;
