"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.removeProduct = exports.addProduct = exports.getAllProducts = exports.getSingleProduct = exports.searchProducts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const productModel_1 = __importDefault(require("../models/productModel"));
const cloudinary_1 = require("../utils/cloudinary");
exports.searchProducts = (0, express_async_handler_1.default)(async (req, res) => {
    const { productName } = req.query;
    const products = await productModel_1.default.find();
    const results = products.filter((product) => product.productName.toLowerCase() === productName?.toLowerCase());
    res.status(200).json(results);
});
exports.getSingleProduct = (0, express_async_handler_1.default)(async (req, res) => {
    const { productId } = req.query;
    const product = await productModel_1.default.findById(productId).populate({
        path: "seller",
        select: ["username", "firstName", "lastName"],
    });
    if (product) {
        res.status(200).json(product);
    }
    else {
        res.status(404);
        throw new Error("Product not found");
    }
});
exports.getAllProducts = (0, express_async_handler_1.default)(async (req, res) => {
    const { sellerId } = req.query;
    const query = sellerId ? { seller: sellerId } : {};
    const products = await productModel_1.default.find(query).sort({ updatedAt: "desc" });
    res.status(200).json(products);
});
exports.addProduct = (0, express_async_handler_1.default)(async (req, res) => {
    const { productName, description, category, price, stocks } = req.body;
    const img = await (0, cloudinary_1.uploadImg)(req.file);
    const productImg = {
        url: img.url,
        id: img.asset_id,
    };
    const newProduct = await productModel_1.default.create({
        productName,
        description,
        category,
        price,
        stocks,
        productImg,
        seller: req.user._id,
    });
    if (newProduct) {
        res.status(200).json({ message: "Added a new product!" });
    }
    else {
        res.status(400);
        throw new Error("Adding product failed");
    }
});
exports.removeProduct = (0, express_async_handler_1.default)(async (req, res) => {
    const { productId } = req.query;
    try {
        await productModel_1.default.findByIdAndDelete(productId);
        res.status(200).json({ message: "Product deleted!" });
    }
    catch (error) {
        res.status(500);
        throw new Error("Deleting failed! Try again");
    }
});
exports.updateProduct = (0, express_async_handler_1.default)(async (req, res) => {
    const { productId } = req.query;
    const { productName, description, category, price, stocks } = req.body;
    const product = await productModel_1.default.findById(productId);
    if (product) {
        if (productName)
            product.productName = productName;
        if (description)
            product.description = description;
        if (category)
            product.category = category;
        if (price)
            product.price = price;
        if (stocks)
            product.stocks = stocks;
        if (req.file && product.productImg) {
            const img = await (0, cloudinary_1.uploadImg)(req.file);
            if (img) {
                const newProductImg = {
                    id: img.asset_id,
                    url: img.url,
                };
                product.productImg = newProductImg;
            }
        }
        await product.save();
        res.status(200).json({ message: "Product updated!" });
    }
    else {
        res.status(404);
        throw new Error("Failed to update, product not found");
    }
});
//# sourceMappingURL=product.controller.js.map