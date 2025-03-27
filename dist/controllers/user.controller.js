"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unfollowUser = exports.followUser = exports.getFollowing = exports.getFollowers = exports.getUserDetails = exports.changeAccountPassword = exports.updateAccountDetails = exports.getAccountDetails = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.getAccountDetails = (0, express_async_handler_1.default)(async (req, res) => {
    const user = await userModel_1.default.findById(req.user._id).select("-password");
    res.status(200).json(user);
});
exports.updateAccountDetails = (0, express_async_handler_1.default)(async (req, res) => {
    const user = await userModel_1.default.findById(req.user._id).select("-password");
    const { username, phoneNumber, email } = req.body;
    if (user) {
        if (username)
            user.username = username;
        if (phoneNumber)
            user.phoneNumber = phoneNumber;
        if (email) {
            const isUsernameExist = await userModel_1.default.findOne({ email });
            if (isUsernameExist) {
                res.status(400);
                throw new Error("Người dùng đã tồn tại");
            }
            user.email = email;
        }
        await user.save();
        res.status(200).json("Cập nhật thành công");
    }
    else {
        res.status(404);
        throw new Error("Không tìm thấy người dùng");
    }
});
exports.changeAccountPassword = (0, express_async_handler_1.default)(async (req, res) => {
    const user = await userModel_1.default.findById(req.user._id);
    const { oldPassword, newPassword } = req.body;
    if (user) {
        if (!(await bcrypt_1.default.compare(oldPassword, user?.password))) {
            res.status(400);
            throw new Error("Mật khẩu không chính xác");
        }
        else {
            if (newPassword.length < 8) {
                res.status(400);
                throw new Error("Mật khẩu phải chứa ít nhất 8 ký tự");
            }
            const hashPassword = await bcrypt_1.default.hash(newPassword, 12);
            user.password = hashPassword;
            await user.save();
            res.status(200).json(user);
        }
    }
    else {
        res.status(404);
        throw new Error("Người dùng không tồn tại");
    }
});
exports.getUserDetails = (0, express_async_handler_1.default)(async (req, res) => {
    const { userId } = req.query;
    const user = await userModel_1.default.findById(userId).select("-password");
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404);
        throw new Error("Người dùng không tồn tại");
    }
});
exports.getFollowers = (0, express_async_handler_1.default)(async (req, res) => {
    const { userId } = req.query;
    const seller = await userModel_1.default.findById(userId).populate({
        path: "followers",
        select: ["username", "phoneNumber"],
    });
    if (seller) {
        res.status(200).json(seller.followers);
    }
    else {
        res.status(404);
        throw new Error("Người dùng không tồn tại");
    }
});
exports.getFollowing = (0, express_async_handler_1.default)(async (req, res) => {
    const { userId } = req.query;
    const currentUser = await userModel_1.default.findById(userId).populate({
        path: "following",
        select: ["username", "phoneNumber"],
    });
    if (currentUser) {
        res.status(200).json(currentUser.following);
    }
    else {
        res.status(404);
        throw new Error("Người dùng không tồn tại");
    }
});
exports.followUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { userId } = req.query;
    const seller = await userModel_1.default.findById(userId);
    const currentUser = await userModel_1.default.findById(req.user._id);
    if (!seller) {
        res.status(404);
        throw new Error("User not found");
    }
    if (seller.followers.find((id) => id.toString() == req.user._id)) {
        res.status(400);
        throw new Error("Bạn đã theo dõi người bán này");
    }
    else {
        seller.followers.push(new mongoose_1.default.Types.ObjectId(req.user._id));
        currentUser?.following.push(seller._id);
        await seller.save();
        await currentUser?.save();
        res.status(200).json({ message: "Theo dõi người bán thành công" });
    }
});
exports.unfollowUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { userId } = req.query;
    const seller = await userModel_1.default.findById(userId);
    const currentUser = await userModel_1.default.findById(req.user._id);
    if (!seller || !currentUser) {
        res.status(404);
        throw new Error("Không tìm thấy người dùng");
    }
    if (seller.followers.find((id) => id.toString() == req.user._id)) {
        seller.followers = seller.followers.filter((id) => id.toString() !== req.user._id.toString());
        currentUser.following = currentUser?.following.filter((id) => id.toString() !== seller?._id.toString());
        await currentUser?.save();
        await seller.save();
        res.status(200).json({ message: "Bạn đã người theo dõi người bán này" });
    }
    else {
        res.status(400);
        throw new Error("Bạn vẫn chưa theo dõi người bán này");
    }
});
//# sourceMappingURL=user.controller.js.map