"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || "MONGO_URI=mongodb+srv://user:123456aA@%40mydb.npp4k.mongodb.net/mydb?retryWrites=true&w=majority&appName=mydb";
        await mongoose_1.default.connect(uri, {});
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("MongoDB connection failed:", error.message);
        }
        else {
            console.error("MongoDB connection failed:", error);
        }
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map