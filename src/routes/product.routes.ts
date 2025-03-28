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
    searchProducts
);



router.get("/all", getAllProducts);


router.get("/:productId", getSingleProduct);

router.post(
    "/new",
    protectRoute,
    roleChecker(["Seller"]),
    upload.array("productImg", 5),  
    addProduct
);
router.put(
    "/update",
    protectRoute,
    roleChecker(["Seller"]),
    upload.array("productImg", 5),  
    updateProduct
);
router.delete("/remove", protectRoute, roleChecker(["Seller"]), removeProduct);

export default router;
