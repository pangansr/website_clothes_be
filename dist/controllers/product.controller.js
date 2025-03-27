"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.removeProduct = exports.addProduct = exports.getAllProducts = exports.getSingleProduct = exports.searchProducts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const productModel_1 = __importDefault(require("../models/productModel"));
const cloudinary_1 = require("../utils/cloudinary");
const mongoose_1 = __importDefault(require("mongoose"));
exports.searchProducts = (0, express_async_handler_1.default)(async (req, res) => {
    const { productName } = req.query;
    const products = await productModel_1.default.find();
    const results = products.filter((product) => product.productName.toLowerCase() === productName?.toLowerCase());
    res.status(200).json(results);
});
exports.getSingleProduct = (0, express_async_handler_1.default)(async (req, res) => {
    const { productId } = req.params;
    console.log("productId:", productId);
    if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
        res.status(400).json({ message: "ID sản phẩm không hợp lệ" });
        return;
    }
    try {
        const product = await productModel_1.default.findById(productId).populate({
            path: "seller",
            select: ["username", "phoneNumber", "email"],
        });
        if (!product) {
            res.status(404).json({ message: "Sản phẩm không tồn tại" });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Lỗi server khi lấy sản phẩm", error });
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
    if (!productName || productName.length > 100) {
        res.status(400).json({ error: "Tên sản phẩm không được để trống và tối đa 100 ký tự." });
        return;
    }
    if (description.length > 1000) {
        res.status(400).json({ error: "Mô tả sản phẩm tối đa 1000 ký tự." });
        return;
    }
    if (isNaN(price) || price <= 0) {
        res.status(400).json({ error: "Giá sản phẩm phải là số và lớn hơn 0." });
        return;
    }
    if (isNaN(stocks) || stocks < 0) {
        res.status(400).json({ error: "Số lượng tồn kho phải là số và không nhỏ hơn 0." });
        return;
    }
    if (req.files && req.files.length > 5) {
        res.status(400).json({ error: "Chỉ được tải lên tối đa 5 ảnh." });
        return;
    }
    try {
        const uploadedImages = req.files
            ? await Promise.all(req.files.map(async (file) => {
                const img = await (0, cloudinary_1.uploadImg)({
                    path: file.path,
                    originalname: file.originalname
                });
                return {
                    url: img.url,
                    id: img.asset_id,
                };
            }))
            : [];
        const newProduct = await productModel_1.default.create({
            productName,
            description,
            category,
            price,
            stocks,
            productImg: uploadedImages,
            seller: req.user._id,
        });
        if (newProduct) {
            res.status(200).json({ message: "Thêm sản phẩm thành công!" });
            return;
        }
        else {
            res.status(400).json({ error: "Thêm sản phẩm thất bại." });
            return;
        }
    }
    catch (error) {
        res.status(500).json({ error: "Lỗi máy chủ, vui lòng thử lại!" });
        return;
    }
});
exports.removeProduct = (0, express_async_handler_1.default)(async (req, res) => {
    const { productId } = req.query;
    try {
        const product = await productModel_1.default.findById(productId);
        if (!product) {
            res.status(404);
            throw new Error("Sản phẩm không tồn tại");
        }
        await Promise.all(product.productImg.map(async (img) => {
            await (0, cloudinary_1.deleteImg)(img.id);
        }));
        await productModel_1.default.findByIdAndDelete(productId);
        res.status(200).json({ message: "Sản phẩm đã bị xóa!" });
    }
    catch (error) {
        res.status(500);
        throw new Error("Xóa sản phẩm thất bại, thử lại sau!");
    }
});
exports.updateProduct = (0, express_async_handler_1.default)(async (req, res) => {
    const { productId } = req.query;
    const { productName, description, category, price, stocks } = req.body;
    const product = await productModel_1.default.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error("Không tìm thấy sản phẩm");
    }
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
    if (req.files && req.files.length > 0) {
        const uploadedImages = await Promise.all(req.files.map(async (file) => {
            const img = await (0, cloudinary_1.uploadImg)({ path: file.path, originalname: file.originalname });
            return {
                url: img.url,
                id: img.asset_id,
            };
        }));
        product.productImg.splice(0, product.productImg.length, ...uploadedImages);
    }
    await product.save();
    res.status(200).json({ message: "Cập nhật sản phẩm thành công" });
});
//# sourceMappingURL=product.controller.js.map