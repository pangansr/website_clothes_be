"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.registerUser = exports.loginUser = exports.newAccessToken = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const accessToken_1 = require("../utils/accessToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.newAccessToken = (0, express_async_handler_1.default)(async (req, res) => {
    if (req.cookies?.jwt) {
        const refreshToken = req.cookies.jwt;
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).clearCookie("jwt", {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                });
                throw new Error("Refresh token expired, Please login");
            }
            else {
                console.log("token refresh");
                res.json({ token: (0, accessToken_1.generateAccessToken)(decoded._id) });
            }
        });
    }
    else {
        res.status(401);
        throw new Error("Unauthorized, No Refresh token");
    }
});
exports.loginUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel_1.default.findOne({ username });
    if (!user) {
        res.status(404);
        throw new Error("Username doesn't exists");
    }
    if (user && (await bcrypt_1.default.compare(password, user.password))) {
        const _id = user._id.toString();
        const refreshToken = (0, accessToken_1.generateRefreshToken)(_id);
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 1000 * 60 * 60 * 24,
        });
        res.status(200).json({
            userId: _id,
            token: (0, accessToken_1.generateAccessToken)(user._id.toString()),
        });
    }
    else {
        res.status(400);
        throw new Error("Wrong password");
    }
});
exports.registerUser = (0, express_async_handler_1.default)(async (req, res) => {
    console.log("firstName");
    const { firstName, lastName, username, password, location, role } = req.body;
    console.log("firstName");
    const user = await userModel_1.default.findOne({ username });
    if (user) {
        res.status(400);
        throw new Error("Username already exists!");
    }
    if (password.length < 8) {
        res.status(400);
        throw new Error("Password must be at least 8 characters");
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 12);
    const newUser = await userModel_1.default.create({
        firstName,
        lastName,
        password: hashedPassword,
        username,
        location,
        role,
    });
    const refreshToken = (0, accessToken_1.generateRefreshToken)(newUser._id.toString());
    if (newUser) {
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 1000 * 60 * 60 * 24,
        });
        res.status(201).json({
            userId: newUser._id,
            token: (0, accessToken_1.generateAccessToken)(newUser._id.toString()),
        });
    }
    else {
        res.status(400);
        throw new Error("Registration failed");
    }
});
exports.logoutUser = (0, express_async_handler_1.default)(async (req, res) => {
    const cookie = req.cookies?.jwt;
    if (!cookie) {
        res.status(204);
        return;
    }
    res.status(200)
        .clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true })
        .json({ message: "Logout Success" });
});
//# sourceMappingURL=auth.controller.js.map