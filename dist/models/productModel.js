"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    productName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stocks: {
        type: Number,
        required: true,
        min: 0,
    },
    productImg: {
        url: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },
    sold: {
        type: Number,
        default: 0,
    },
    seller: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Product", productSchema);
//# sourceMappingURL=productModel.js.map