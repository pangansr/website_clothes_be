"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const protectRoute_1 = __importDefault(require("../middleware/auth/protectRoute"));
const roleChecker_1 = __importDefault(require("../middleware/auth/roleChecker"));
const router = express_1.default.Router();
router.get("/account/details", protectRoute_1.default, (0, roleChecker_1.default)(["Seller", "Buyer"]), user_controller_1.getAccountDetails);
router.post("/account/details/update", protectRoute_1.default, (0, roleChecker_1.default)(["Seller", "Buyer"]), user_controller_1.updateAccountDetails);
router.post("/account/password/update", protectRoute_1.default, (0, roleChecker_1.default)(["Seller", "Buyer"]), user_controller_1.changeAccountPassword);
router.get("/details", protectRoute_1.default, (0, roleChecker_1.default)(["Seller", "Buyer"]), user_controller_1.getUserDetails);
router.get("/followers/list", protectRoute_1.default, (0, roleChecker_1.default)(["Seller", "Buyer"]), user_controller_1.getFollowers);
router.get("/following/list", protectRoute_1.default, (0, roleChecker_1.default)(["Seller", "Buyer"]), user_controller_1.getFollowing);
router.post("/follow", protectRoute_1.default, (0, roleChecker_1.default)(["Seller", "Buyer"]), user_controller_1.followUser);
router.post("/unfollow", protectRoute_1.default, (0, roleChecker_1.default)(["Seller", "Buyer"]), user_controller_1.unfollowUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map