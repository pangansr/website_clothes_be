"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const multer_1 = __importDefault(require("multer"));
const protectRoute_1 = __importDefault(require("../middleware/auth/protectRoute"));
const roleChecker_1 = __importDefault(require("../middleware/auth/roleChecker"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
router.get("/search", product_controller_1.searchProducts);
router.get("/all", product_controller_1.getAllProducts);
router.get("/:productId", product_controller_1.getSingleProduct);
router.post("/new", protectRoute_1.default, (0, roleChecker_1.default)(["Seller"]), upload.array("productImg", 5), product_controller_1.addProduct);
router.put("/update", protectRoute_1.default, (0, roleChecker_1.default)(["Seller"]), upload.array("productImg", 5), product_controller_1.updateProduct);
router.delete("/remove", protectRoute_1.default, (0, roleChecker_1.default)(["Seller"]), product_controller_1.removeProduct);
exports.default = router;
//# sourceMappingURL=product.routes.js.map