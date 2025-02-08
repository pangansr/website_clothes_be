import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel";
import User from "../models/userModel";
import { uploadImg, deleteImg } from "../utils/cloudinary";

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

export const getSingleProduct = asyncHandler(
    async (req: Request, res: Response) => {
        const { productId } = req.query;
        console.log("productId",productId);
        const product = await Product.findById(productId).populate({
            path: "seller",
            select: ["username", "firstName", "lastName"],
        });
       
        if (product) {
            
            res.status(200).json(product);
        } else {
            res.status(404);
            throw new Error("Product not found");
        }
    }
);

// Get all products or only products of the specific seller
export const getAllProducts = asyncHandler(
    async (req: Request, res: Response) => {
        const { sellerId } = req.query;
        const query = sellerId ? { seller: sellerId } : {};

        const products = await Product.find(query).sort({ updatedAt: "desc" });

        res.status(200).json(products);
    }
);

// export const getAllProducts = asyncHandler(
//         async (req: Request, res: Response) => {
        
//             const products = await Product.find().sort({ updatedAt: "desc" });
//     // console.log("Danh sách sản phẩm"+products);
//             res.status(200).json(products);
//         }
//     );

export const addProduct = asyncHandler(async (req: Request, res: Response) => {
    const { productName, description, category, price, stocks } = req.body;

    const img = await uploadImg(
        req.file as { path: string; originalname: string }
    );
    console.log("Uploaded File Info:", req.file);
    const productImg = {
        url: img.url,
        id: img.asset_id,
    };


    const newProduct = await Product.create({
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
    } else {
        res.status(400);
        throw new Error("Adding product failed");
    }
});

export const removeProduct = asyncHandler(
    async (req: Request, res: Response) => {
        const { productId } = req.query;

        try {
            await Product.findByIdAndDelete(productId);

            res.status(200).json({ message: "Product deleted!" });
        } catch (error) {
            res.status(500);
            throw new Error("Deleting failed! Try again");
        }
    }
);

export const updateProduct = asyncHandler(
    async (req: Request, res: Response) => {
        const { productId } = req.query;
        const { productName, description, category, price, stocks } =
            req.body as {
                productName: string;
                description: string;
                category: string;
                price: number;
                stocks: number;
            };

        const product = await Product.findById(productId);

        if (product) {
            if (productName) product.productName = productName;
            if (description) product.description = description;
            if (category) product.category = category;
            if (price) product.price = price;
            if (stocks) product.stocks = stocks;

            if (req.file && product.productImg) {
                const img = await uploadImg(req.file);

                if (img) {
                    const newProductImg = {
                        id: img.asset_id,
                        url: img.url,
                    };

                    // delete the previous img
                    //todo: FIX DELETE THE PREVIOUS IMAGE
                    // await deleteImg(product.productImg.id);
                    // save the new img to db
                    product.productImg = newProductImg;
                }
            }

            await product.save();
            res.status(200).json({ message: "Product updated!" });
        } else {
            res.status(404);
            throw new Error("Failed to update, product not found");
        }
    }
);
