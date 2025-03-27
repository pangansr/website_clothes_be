import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel";
import User from "../models/userModel";
import { uploadImg, deleteImg } from "../utils/cloudinary";
import mongoose from "mongoose";

export const searchProducts = asyncHandler(
    async (req: Request, res: Response) => {
        const { productName } = req.query as { productName: string };

        const products = await Product.find();
        const results = products.filter(
            (product) =>
                product.productName.toLowerCase() === productName?.toLowerCase()
        );
        res.status(200).json(results);
    }
);

export const getSingleProduct = asyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.params; 
    console.log("productId:", productId);

    if (!mongoose.Types.ObjectId.isValid(productId)) {
       res.status(400).json({ message: "ID sản phẩm không hợp lệ" });
       return ;
    }

    try {
        const product = await Product.findById(productId).populate({
            path: "seller",
            select: ["username", "phoneNumber", "email"],
        });

        if (!product) {
             res.status(404).json({ message: "Sản phẩm không tồn tại" });
             return ;
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server khi lấy sản phẩm", error });
    }
});


export const getAllProducts = asyncHandler(
    async (req: Request, res: Response) => {
        const { sellerId } = req.query;
        const query = sellerId ? { seller: sellerId } : {};

        const products = await Product.find(query).sort({ updatedAt: "desc" });
 
        res.status(200).json(products);
    }
);


export const addProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { productName, description, category, price, stocks } = req.body;

    // 1️⃣ Kiểm tra độ dài của các trường nhập
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

    if (req.files && (req.files as Express.Multer.File[]).length > 5) {
         res.status(400).json({ error: "Chỉ được tải lên tối đa 5 ảnh." });
         return;
    }

    try {
        const uploadedImages = req.files
            ? await Promise.all(
                  (req.files as Express.Multer.File[]).map(async (file) => {
                      const img = await uploadImg({
                          path: file.path,
                          originalname: file.originalname
                      });

                      return {
                          url: img.url,
                          id: img.asset_id,
                      };
                  })
              )
            : [];

        const newProduct = await Product.create({
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
        } else {
             res.status(400).json({ error: "Thêm sản phẩm thất bại." });
             return;
        }
    } catch (error) {
         res.status(500).json({ error: "Lỗi máy chủ, vui lòng thử lại!" });
         return;
    }
});




export const removeProduct = asyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.query;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404);
            throw new Error("Sản phẩm không tồn tại");
        }

    
        await Promise.all(
            product.productImg.map(async (img) => {
                await deleteImg(img.id);
            })
        );

        await Product.findByIdAndDelete(productId);

        res.status(200).json({ message: "Sản phẩm đã bị xóa!" });
    } catch (error) {
        res.status(500);
        throw new Error("Xóa sản phẩm thất bại, thử lại sau!");
    }
});


export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.query;
    const { productName, description, category, price, stocks } = req.body as {
        productName: string;
        description: string;
        category: string;
        price: number;
        stocks: number;
    };

    const product = await Product.findById(productId);

    if (!product) {
        res.status(404);
        throw new Error("Không tìm thấy sản phẩm");
    }






    if (productName) product.productName = productName;
    if (description) product.description = description;
    if (category) product.category = category;
    if (price) product.price = price;
    if (stocks) product.stocks = stocks;


    
    if (req.files && (req.files as Express.Multer.File[]).length > 0) {
        // Upload từng ảnh mới
        const uploadedImages = await Promise.all(
            (req.files as Express.Multer.File[]).map(async (file) => {
                const img = await uploadImg({ path: file.path, originalname: file.originalname });
                return {
                    url: img.url,
                    id: img.asset_id,
                };
            })
        );

        
        product.productImg.splice(0, product.productImg.length, ...uploadedImages);

    }

    await product.save();
    res.status(200).json({ message: "Cập nhật sản phẩm thành công" });
});
