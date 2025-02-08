"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.cartSchema = new mongoose_1.default.Schema({
    productName: {
        type: String,
        required: true,
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
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    seller: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    inCart: {
        type: Number,
        required: true,
    },
    cartOwner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Cart", exports.cartSchema);
//# sourceMappingURL=cartModel.js.map