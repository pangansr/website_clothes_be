"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protectRoute = (0, express_async_handler_1.default)(async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
            next();
        }
        catch (error) {
            res.status(401);
            throw new Error("Token expired, Not Authorized");
        }
    }
    else {
        res.status(401);
        throw new Error("No Token, Not Authorized");
    }
});
exports.default = protectRoute;
//# sourceMappingURL=protectRoute.js.map