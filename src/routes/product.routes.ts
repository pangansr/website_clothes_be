import express from "express";
import {
    addProduct,
    getAllProducts,
    getSingleProduct,
    removeProduct,
    searchProducts,
    updateProduct,
} from "../controllers/product.controller";
import multer from "multer";
import protectRoute from "../middleware/auth/protectRoute";
import roleChecker from "../middleware/auth/roleChecker";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

router.get(
    "/search",
    protectRoute,
    roleChecker(["Seller", "Buyer"]),
    searchProducts
);

router.get(
    "/",
    protectRoute,
    roleChecker(["Seller", "Buyer"]),
    getSingleProduct
);


router.get("/all", getAllProducts);
router.post(
    "/new",
    protectRoute,
    roleChecker(["Seller"]),
    upload.single("productImg"),
    addProduct
);
router.put(
    "/update",
    protectRoute,
    roleChecker(["Seller"]),
    upload.single("productImg"),
    updateProduct
);
router.delete("/remove", protectRoute, roleChecker(["Seller"]), removeProduct);

export default router;
