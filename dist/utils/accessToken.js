"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, "mysecretkey", { expiresIn: "1h" });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, "mysecretkey", { expiresIn: "7d" });
};
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=accessToken.js.map