"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protectRoute_1 = __importDefault(require("../middleware/auth/protectRoute"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const purchaseModel_1 = __importDefault(require("../models/purchaseModel"));
const roleChecker_1 = __importDefault(require("../middleware/auth/roleChecker"));
const router = express_1.default.Router();
router.get("/all", protectRoute_1.default, (0, roleChecker_1.default)(["Buyer"]), (0, express_async_handler_1.default)(async (req, res) => {
    const userId = req.query.userId;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    const purchaseHistory = await purchaseModel_1.default.find({
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
    results.results = await purchaseModel_1.default.find({
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
}));
exports.default = router;
//# sourceMappingURL=purchase.routes.js.map