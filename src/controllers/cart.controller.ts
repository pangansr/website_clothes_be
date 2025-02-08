import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Cart from "../models/cartModel";
import Product, { productType } from "../models/productModel";
import User from "../models/userModel";
import Purchase from "../models/purchaseModel";

export const getCartItems = asyncHandler(
    async (req: Request, res: Response) => {
        const { _id } = req.user;

        const products = await Product.find();
        let cartItems = await Cart.find({ cartOwner: _id }).sort({
            updatedAt: "desc",
        });

        //todo Alisin sa cart yung product if deleted na yung product by the seller.
        //* pansamantala na filter muna, hindi pa nareremove sa db
        cartItems = cartItems.filter((cartItem) =>
            products.some(
                (product) => cartItem._id.toString() === product._id.toString()
            )
        );

        res.status(200).json(cartItems);
    }
);

export const clearCart = asyncHandler(async (req: Request, res: Response) => {
    const { _id } = req.user;

    try {
        await Cart.deleteMany({ cartOwner: _id });
        res.status(200).json({ message: "Cart items cleared" });
    } catch (error) {
        res.status(400);
        throw new Error("Failed to delete all");
    }
});

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.query;
    const { quantity } = req.body;
    const product = await Product.findById(productId);
    const { productName, stocks, productImg, seller, price } =
        product as productType;

    const isInCart = await Cart.findById(productId);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    if (stocks > (isInCart?.inCart || 0)) {
        if (isInCart) {
            isInCart.inCart += Number(quantity);
            await isInCart.save();

            res.status(200).json({ message: "+1 Item Quantity" });
        } else {
            await Cart.create({
                productImg,
                productName,
                _id: product._id,
                seller: seller,
                price,
                inCart: quantity,
                cartOwner: req.user._id,
            });

            res.status(201).json({ message: "Added to cart" });
        }
    } else {
        res.status(400);
        throw new Error("No stocks available");
    }
});

export const removeToCart = asyncHandler(
    async (req: Request, res: Response) => {
        const { productId } = req.query;
        const isInCart = await Cart.findById(productId);

        if (!isInCart) {
            res.status(404);
            throw new Error("Product not found");
        }

        await Cart.findByIdAndDelete(productId);
        res.status(200).json({ message: "Item removed to cart" });
    }
);

export const incItemQuantity = asyncHandler(
    async (req: Request, res: Response) => {
        const { productId } = req.query;
        const itemInCart = await Cart.findById(productId);
        const product = await Product.findById(productId);

        if (!itemInCart || !product) {
            res.status(404);
            throw new Error("Product not found");
        }

        if (product.stocks > itemInCart.inCart) {
            itemInCart.inCart++;
            await itemInCart.save();

            res.status(200).json({ message: "+1 Item Quantity" });
        } else {
            res.status(400);
            throw new Error("No more stocks");
        }
    }
);

export const decItemQuantity = asyncHandler(
    async (req: Request, res: Response) => {
        const { productId } = req.query;
        const itemInCart = await Cart.findById(productId);

        if (!itemInCart) {
            res.status(404);
            throw new Error("Product not found");
        }

        if (itemInCart.inCart > 1) {
            itemInCart.inCart--;
            await itemInCart.save();

            res.status(200).json({ message: "-1 Item Quantity" });
        } else {
            res.status(400);
            throw new Error("Minimum Quantity reached");
        }
    }
);

export const cartCheckout = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.query;
        const itemInCart = await Cart.find({ cartOwner: userId });

        for (let item of itemInCart) {
            const product = await Product.findById(item._id);
            const seller = await User.findById(item.seller);
            const totalCost = item.price * item.inCart;

            if (product && seller) {
                if (item.inCart <= product.stocks) {
                    // reduce the stocks of the product
                    product.stocks -= item.inCart;
                    product.sold += item.inCart;
                    await product.save();
                    // add the total sales to seller's profile
                    seller.totalSales += totalCost;
                    seller.totalSales.toFixed(2);
                    await seller.save();

                    // add the new purchase to user's purchase history
                    const purchaseItem = await Purchase.findById(item._id);

                    if (purchaseItem) {
                        // adds up to the existing item in purchase history
                        purchaseItem.totalSpent += item.price * item.inCart;
                        purchaseItem.totalQuantity += item.inCart;
                        await purchaseItem.save();
                    } else {
                        await Purchase.create({
                            _id: item._id,
                            totalSpent: item.price * item.inCart,
                            purchaseOwner: item.cartOwner,
                            totalQuantity: item.inCart,
                        });
                    }

                    // remove all items in cart
                    await Cart.deleteMany({ cartOwner: userId });
                } else {
                    res.status(400);
                    throw new Error("Stocks not sufficient");
                }
            } else {
                res.status(404);
                throw new Error("Checkout failed, product not found");
            }
        }

        res.status(200).json({
            message: "Order success",
        });
    }
);
