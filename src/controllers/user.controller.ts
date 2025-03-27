import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

// Details of the account logged in
export const getAccountDetails = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await User.findById(req.user._id).select("-password");

        res.status(200).json(user);
    }
);

export const updateAccountDetails = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await User.findById(req.user._id).select("-password");
        const {username , phoneNumber, email } = req.body as {
            username: string;
            phoneNumber: string;
            email: string;
        
        };

        if (user) {
            if (username) user.username = username;
            if (phoneNumber) user.phoneNumber = phoneNumber;
            if (email) {
                const isUsernameExist = await User.findOne({ email });
                if (isUsernameExist) {
                    res.status(400);
                    throw new Error("Người dùng đã tồn tại");
                }
                user.email = email;
            }
            await user.save();
            res.status(200).json("Cập nhật thành công");
        } else {
            res.status(404);
            throw new Error("Không tìm thấy người dùng");
        }
    }
);

export const changeAccountPassword = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await User.findById(req.user._id);
        const { oldPassword, newPassword } = req.body as {
            oldPassword: string;
            newPassword: string;
        };

        if (user) {
            if (!(await bcrypt.compare(oldPassword, user?.password))) {
                res.status(400);
                throw new Error("Mật khẩu không chính xác");
            } else {
                if (newPassword.length < 8) {
                    res.status(400);
                    throw new Error(
                        "Mật khẩu phải chứa ít nhất 8 ký tự"
                    );
                }

                const hashPassword = await bcrypt.hash(newPassword, 12);
                user.password = hashPassword;
                await user.save();

                res.status(200).json(user);
            }
        } else {
            res.status(404);
            throw new Error("Người dùng không tồn tại");
        }
    }
);

// Details of normal user
// For user profile
export const getUserDetails = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.query;
        const user = await User.findById(userId).select("-password");

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404);
            throw new Error("Người dùng không tồn tại");
        }
    }
);

export const getFollowers = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.query;
        const seller = await User.findById(userId).populate({
            path: "followers",
            select: ["username", "phoneNumber"],
        });

        if (seller) {
            res.status(200).json(seller.followers);
        } else {
            res.status(404);
            throw new Error("Người dùng không tồn tại");
        }
    }
);

export const getFollowing = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.query;
        const currentUser = await User.findById(userId).populate({
            path: "following",
            select: ["username", "phoneNumber"],
        });

        if (currentUser) {
            res.status(200).json(currentUser.following);
        } else {
            res.status(404);
            throw new Error("Người dùng không tồn tại");
        }
    }
);

export const followUser = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.query;
    const seller = await User.findById(userId);

    const currentUser = await User.findById(req.user._id);

    if (!seller) {
        res.status(404);
        throw new Error("User not found");
    }

    if (seller.followers.find((id) => id.toString() == req.user._id)) {
        res.status(400);
        throw new Error("Bạn đã theo dõi người bán này");
    } else {
        seller.followers.push(new mongoose.Types.ObjectId(req.user._id));
        currentUser?.following.push(seller._id);
        await seller.save();
        await currentUser?.save();
        res.status(200).json({ message: "Theo dõi người bán thành công" });
    }
});

export const unfollowUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.query;
        const seller = await User.findById(userId);

        const currentUser = await User.findById(req.user._id);

        if (!seller || !currentUser) {
            res.status(404);
            throw new Error("Không tìm thấy người dùng");
        }

        if (seller.followers.find((id) => id.toString() == req.user._id)) {
            seller.followers = seller.followers.filter(
                (id) => id.toString() !== req.user._id.toString()
            );
            currentUser.following = currentUser?.following.filter(
                (id) => id.toString() !== seller?._id.toString()
            );
            await currentUser?.save();
            await seller.save();
            res.status(200).json({ message: "Bạn đã người theo dõi người bán này" });
        } else {
            res.status(400);
            throw new Error("Bạn vẫn chưa theo dõi người bán này");
        }
    }
);
