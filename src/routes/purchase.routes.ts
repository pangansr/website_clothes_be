import express, { Request, Response } from "express";
import protectRoute from "../middleware/auth/protectRoute";
import asyncHandler from "express-async-handler";
import Purchase, { purchaseSchemaType } from "../models/purchaseModel";
import roleChecker from "../middleware/auth/roleChecker";

const router = express.Router();

router.get(
    "/all",
    protectRoute,
    roleChecker(["Buyer"]),
    asyncHandler(async (req: Request, res: Response) => {
        const userId = req.query.userId as string;
        const page = parseInt(req.query.page as string);
        const limit = parseInt(req.query.limit as string);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results: {
            next?: {
                page: number;
                limit: number;
            };
            previous?: {
                page: number;
                limit: number;
            };
            results?: purchaseSchemaType[];
            totalPage?: number;
        } = {};

        const purchaseHistory = await Purchase.find({
            purchaseOwner: userId,
        })
            .populate({
                path: "_id",
                populate: {
                    path: "seller",
                    select: ["firstName", "lastName"],
                },
            })
            .sort({
                updatedAt: "desc",
            });

        if (endIndex < purchaseHistory.length) {
            results.next = {
                page: page + 1,
                limit: limit,
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit,
            };
        }

        results.results = await Purchase.find({
            purchaseOwner: userId,
        })
            .populate({
                path: "_id",
                populate: {
                    path: "seller",
                    select: ["firstName", "lastName"],
                },
            })
            .sort({
                updatedAt: "desc",
            })
            .limit(limit)
            .skip(startIndex);

        results.totalPage = Math.ceil(purchaseHistory.length / limit);
        res.status(200).json(results);
    })
);

export default router;
