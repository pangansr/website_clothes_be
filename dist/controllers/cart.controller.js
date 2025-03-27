"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartCheckout = exports.decItemQuantity = exports.incItemQuantity = exports.removeToCart = exports.addToCart = exports.clearCart = exports.getCartItems = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cartModel_1 = __importDefault(require("../models/cartModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const purchaseModel_1 = __importDefault(require("../models/purchaseModel"));
exports.getCartItems = (0, express_async_handler_1.default)(async (req, res) => {
    const { _id } = req.user;
    const products = await productModel_1.default.find();
    let cartItems = await cartModel_1.default.find({ cartOwner: _id }).sort({
        updatedAt: "desc",
    });
    cartItems = cartItems.filter((cartItem) => products.some((product) => cartItem._id.toString() === product._id.toString()));
    res.status(200).json(cartItems);
});
exports.clearCart = (0, express_async_handler_1.default)(async (req, res) => {
    const { _id } = req.user;
    try {
        await cartModel_1.default.deleteMany({ cartOwner: _id });
        res.status(200).json({ message: "Giỏ hàng hiện tại đang trống" });
    }
    catch (error) {
        res.status(400);
        throw new Error("Xóa thất bại");
    }
});
exports.addToCart = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { productId } = req.query;
        const { quantity } = req.body;
        if (!productId) {
            res.status(400).json({ error: "Thiếu ID sản phẩm." });
            return;
        }
        if (!quantity || quantity <= 0) {
            res.status(400).json({ error: "Số lượng phải lớn hơn 0." });
            return;
        }
        const product = await productModel_1.default.findById(productId);
        if (!product) {
            res.status(404).json({ error: "Sản phẩm không tồn tại." });
            return;
        }
        const { productName, stocks, productImg, seller, price } = product;
        const isInCart = await cartModel_1.default.findById(productId);
        if (stocks > (isInCart?.inCart || 0)) {
            if (isInCart) {
                isInCart.inCart += Number(quantity);
                await isInCart.save();
                res.status(200).json({ message: `Đã thêm ${quantity} sản phẩm vào giỏ hàng.` });
            }
            else {
                await cartModel_1.default.create({
                    productImg: productImg[0],
                    productName,
                    _id: product._id,
                    seller,
                    price,
                    inCart: quantity,
                    cartOwner: req.user._id,
                });
                res.status(201).json({ message: "Thêm vào giỏ hàng thành công!" });
            }
        }
        else {
            res.status(400).json({ error: "Không đủ hàng." });
        }
    }
    catch (error) {
        console.error("Lỗi BE:", error);
        res.status(500).json({ error: "Lỗi máy chủ, vui lòng thử lại sau." });
    }
});
exports.removeToCart = (0, express_async_handler_1.default)(async (req, res) => {
    const { productId } = req.query;
    const isInCart = await cartModel_1.default.findById(productId);
    if (!isInCart) {
        res.status(404);
        throw new Error("Sản phẩm không tìm thấy");
    }
    await cartModel_1.default.findByIdAndDelete(productId);
    res.status(200).json({ message: "Xóa thành công" });
});
exports.incItemQuantity = (0, express_async_handler_1.default)(async (req, res) => {
    const { productId } = req.query;
    const itemInCart = await cartModel_1.default.findById(productId);
    const product = await productModel_1.default.findById(productId);
    if (!itemInCart || !product) {
        res.status(404);
        throw new Error("Sản phẩm không tìm thấy");
    }
    if (product.stocks > itemInCart.inCart) {
        itemInCart.inCart++;
        await itemInCart.save();
        res.status(200).json({ message: "+1" });
    }
    else {
        res.status(400);
        throw new Error("Không đủ hàng");
    }
});
exports.decItemQuantity = (0, express_async_handler_1.default)(async (req, res) => {
    const { productId } = req.query;
    const itemInCart = await cartModel_1.default.findById(productId);
    if (!itemInCart) {
        res.status(404);
        throw new Error("Sản phẩm không tìm thấy");
    }
    if (itemInCart.inCart > 1) {
        itemInCart.inCart--;
        await itemInCart.save();
        res.status(200).json({ message: "-1" });
    }
    else {
        res.status(400);
        throw new Error("Số lượng không thể nhỏ hơn 1");
    }
});
exports.cartCheckout = (0, express_async_handler_1.default)(async (req, res) => {
    const { userId } = req.query;
    const itemInCart = await cartModel_1.default.find({ cartOwner: userId });
    for (let item of itemInCart) {
        const product = await productModel_1.default.findById(item._id);
        const seller = await userModel_1.default.findById(item.seller);
        const totalCost = item.price * item.inCart;
        if (product && seller) {
            if (item.inCart <= product.stocks) {
                product.stocks -= item.inCart;
                product.sold += item.inCart;
                await product.save();
                seller.totalSales += totalCost;
                seller.totalSales.toFixed(2);
                await seller.save();
                const purchaseItem = await purchaseModel_1.default.findById(item._id);
                if (purchaseItem) {
                    purchaseItem.totalSpent += item.price * item.inCart;
                    purchaseItem.totalQuantity += item.inCart;
                    await purchaseItem.save();
                }
                else {
                    await purchaseModel_1.default.create({
                        _id: item._id,
                        totalSpent: item.price * item.inCart,
                        purchaseOwner: item.cartOwner,
                        totalQuantity: item.inCart,
                    });
                }
                await cartModel_1.default.deleteMany({ cartOwner: userId });
            }
            else {
                res.status(400);
                throw new Error("Stocks not sufficient");
            }
        }
        else {
            res.status(404);
            throw new Error("Checkout failed, product not found");
        }
    }
    res.status(200).json({
        message: "Order success",
    });
});
//# sourceMappingURL=cart.controller.js.map