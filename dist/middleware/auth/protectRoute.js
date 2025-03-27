"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const protectRoute = (0, express_async_handler_1.default)(async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log("token", token);
    if (token) {
        try {
            console.log("decodedccccccccc");
            const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
            console.log("decoded", decoded);
            console.log("userId", decoded.userId);
            const user = await userModel_1.default.findById(decoded.userId).select("-password");
            console.log("user", user);
            if (!user) {
                res.status(401);
                throw new Error("User not found, Not Authorized");
            }
            req.user = {
                ...user.toObject(),
                _id: user._id.toString()
            };
            next();
        }
        catch (error) {
            res.status(401);
            console.error("Lỗi khi verify token:", error);
        }
    }
    else {
        res.status(401);
        throw new Error("No Token, Not Authorized");
    }
});
exports.default = protectRoute;
//# sourceMappingURL=protectRoute.js.map