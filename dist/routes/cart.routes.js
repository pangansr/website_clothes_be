"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controllers/cart.controller");
const protectRoute_1 = __importDefault(require("../middleware/auth/protectRoute"));
const roleChecker_1 = __importDefault(require("../middleware/auth/roleChecker"));
const router = express_1.default.Router();
router.get("/all", protectRoute_1.default, (0, roleChecker_1.default)(["Buyer"]), cart_controller_1.getCartItems);
router.post("/add", protectRoute_1.default, (0, roleChecker_1.default)(["Buyer"]), cart_controller_1.addToCart);
router.delete("/remove", protectRoute_1.default, (0, roleChecker_1.default)(["Buyer"]), cart_controller_1.removeToCart);
router.delete("/remove/all", protectRoute_1.default, (0, roleChecker_1.default)(["Buyer"]), cart_controller_1.clearCart);
router.put("/item/increase", protectRoute_1.default, (0, roleChecker_1.default)(["Buyer"]), cart_controller_1.incItemQuantity);
router.put("/item/decrease", protectRoute_1.default, (0, roleChecker_1.default)(["Buyer"]), cart_controller_1.decItemQuantity);
router.post("/checkout", protectRoute_1.default, (0, roleChecker_1.default)(["Buyer"]), cart_controller_1.cartCheckout);
exports.default = router;
//# sourceMappingURL=cart.routes.js.map