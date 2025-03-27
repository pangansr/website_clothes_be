import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/userModel";

import bcrypt from "bcrypt";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/accessToken";
import jwt from "jsonwebtoken";

export const newAccessToken = asyncHandler(
    async (req: Request, res: Response) => {
        console.log("refreshToDDDDDDDDDDDDDDDDDDDDĐ");
        if (req.cookies?.jwt) {
            const refreshToken = req.cookies.jwt;
            console.log("refreshToken",refreshToken);
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET!,
                (err: any, decoded: any) => {
                    if (err) {
                        res.status(403).clearCookie("jwt", {
                            httpOnly: true,
                            sameSite: "none",
                            secure: true,
                        });
                        throw new Error("Refresh token expired, Please login");
                    } else {
                        console.log("token refresh");
                        res.json({ token: generateAccessToken(decoded._id) });
                    }
                }
            );
        } else {
            res.status(401);
            throw new Error("Unauthorized, No Refresh token");
        }
    }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("dd",user);

    if (!user) {
        res.status(404);
        throw new Error("Người dùng đã tồn tại!");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        const _id = user._id.toString();

        const refreshToken = generateRefreshToken(_id);
        console.log(`Đăng nhập thành công: ${email}, UserID: ${_id}`);
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 1000 * 60 * 60 * 24,
        });

        res.status(200).json({
            userId: _id,
            token: generateAccessToken(user._id.toString()),
        });
    } else {
         res.status(404).json({ message: "Người dùng đã tồn tại!" });

    }
});

export const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        console.log("firstName");
        const { username, phoneNumber, email, password, location, role } = req.body;
        console.log("firstName");
     
        const user = await User.findOne({ email });
        if (user) {
            res.status(400);
            throw new Error("Tên người dùng đã tồn tại!");
        }
      
        // Kiểm tra độ dài mật khẩu
        if (password.length < 8) {
            res.status(400);
            throw new Error("Mật khẩu phải ít nhất 8 ký tự");
        }

        // if (password !== confirmPassword) {
        //     res.status(400);
        //     throw new Error("Passwords don't match");
        // }

        // Mã hóa mật khẩu và tạo người dùng mới
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            username,
            phoneNumber,
            email,
            password: hashedPassword,
            location,
            role,
        });

        const refreshToken = generateRefreshToken(newUser._id.toString());

        if (newUser) {
            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 1000 * 60 * 60 * 24,
            });
            res.status(201).json({
                userId: newUser._id,
                token: generateAccessToken(newUser._id.toString()),
            });
        } else {
            res.status(400);
            throw new Error("Registration failed");
        }
    }
);


export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    const cookie = req.cookies?.jwt;

    if (!cookie) {
        res.status(204);
        return;
    }

    res.status(200)
        .clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true })
        .json({ message: "Logout Success" });
});
