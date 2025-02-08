import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

// Details of the account logged in
export const getAccountDetails = asyncHandler(
    async (req: Request, res: Response) => {
        console.log("hhhhhhhhhhhhhhh");
        const user = await User.findById(req.user._id).select("-password");
        console.log("mmmmmmmmmmmmmmmm"+ user);
        res.status(200).json(user);
    }
);

export const updateAccountDetails = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await User.findById(req.user._id).select("-password");
        const { firstName, lastName, username } = req.body as {
            firstName: string;
            lastName: string;
            username: string;
        };

        if (user) {
            if (firstName) user.firstName = firstName;
            if (lastName) user.lastName = lastName;
            if (username) {
                const isUsernameExist = await User.findOne({ username });
                if (isUsernameExist) {
                    res.status(400);
                    throw new Error("Username already exist");
                }
                user.username = username;
            }
            await user.save();
            res.status(200).json("Account Details updated successfully");
        } else {
            res.status(404);
            throw new Error("User not found");
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
                throw new Error("Password don't match");
            } else {
                if (newPassword.length < 8) {
                    res.status(400);
                    throw new Error(
                        "Password must be greater than 8 characters"
                    );
                }

                const hashPassword = await bcrypt.hash(newPassword, 12);
                user.password = hashPassword;
                await user.save();

                res.status(200).json(user);
            }
        } else {
            res.status(404);
            throw new Error("User not found");
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
            throw new Error("User not found");
        }
    }
);

export const getFollowers = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.query;
        const seller = await User.findById(userId).populate({
            path: "followers",
            select: ["firstName", "lastName"],
        });

        if (seller) {
            res.status(200).json(seller.followers);
        } else {
            res.status(404);
            throw new Error("Seller not found");
        }
    }
);

export const getFollowing = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.query;
        const currentUser = await User.findById(userId).populate({
            path: "following",
            select: ["firstName", "lastName"],
        });

        if (currentUser) {
            res.status(200).json(currentUser.following);
        } else {
            res.status(404);
            throw new Error("User not found");
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
        throw new Error("You already followed this seller");
    } else {
        seller.followers.push(new mongoose.Types.ObjectId(req.user._id));
        currentUser?.following.push(seller._id);
        await seller.save();
        await currentUser?.save();
        res.status(200).json({ message: "You follow this Seller" });
    }
});

export const unfollowUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.query;
        const seller = await User.findById(userId);

        const currentUser = await User.findById(req.user._id);

        if (!seller || !currentUser) {
            res.status(404);
            throw new Error("User not found");
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
            res.status(200).json({ message: "You unfollowed this seller" });
        } else {
            res.status(400);
            throw new Error("You didn't follow this seller yet");
        }
    }
);
