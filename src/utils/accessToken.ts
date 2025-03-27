import jwt from "jsonwebtoken";

// Hàm tạo access token
export const generateAccessToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "2h" });
};

// Hàm tạo refresh token
export const generateRefreshToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "10d" });
};
