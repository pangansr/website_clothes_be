import express from "express";
import {
    addToCart,
    cartCheckout,
    clearCart,
    decItemQuantity,
    getCartItems,
    incItemQuantity,
    removeToCart,
} from "../controllers/cart.controller";
import protectRoute from "../middleware/auth/protectRoute";
import roleChecker from "../middleware/auth/roleChecker";

const router = express.Router();

router.get("/all", protectRoute, roleChecker(["Buyer"]), getCartItems);

router.post("/add", protectRoute, roleChecker(["Buyer"]), addToCart);
router.delete("/remove", protectRoute, roleChecker(["Buyer"]), removeToCart);
router.delete("/remove/all", protectRoute, roleChecker(["Buyer"]), clearCart);

router.put(
    "/item/increase",
    protectRoute,
    roleChecker(["Buyer"]),
    incItemQuantity
);
router.put(
    "/item/decrease",
    protectRoute,
    roleChecker(["Buyer"]),
    decItemQuantity
);

router.post("/checkout", protectRoute, roleChecker(["Buyer"]), cartCheckout);

export default router;
