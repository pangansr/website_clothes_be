import express from "express";
import {
    getAccountDetails,
    getUserDetails,
    updateAccountDetails,
    changeAccountPassword,
    followUser,
    getFollowers,
    unfollowUser,
    getFollowing,
} from "../controllers/user.controller";
import protectRoute from "../middleware/auth/protectRoute";
import roleChecker from "../middleware/auth/roleChecker";

const router = express.Router();


router.get(
    "/account/details",
    protectRoute,
    roleChecker(["Seller", "Buyer"]),
    getAccountDetails
);





router.post(
    "/account/details/update",
    protectRoute,
    roleChecker(["Seller", "Buyer"]),
    updateAccountDetails
);
router.post(
    "/account/password/update",
    protectRoute,
    roleChecker(["Seller", "Buyer"]),
    changeAccountPassword
);

// Details of the user (any user)
router.get(
    "/details",
    protectRoute,
    roleChecker(["Seller", "Buyer"]),
    getUserDetails
);

router.get(
    "/followers/list",
    protectRoute,
    roleChecker(["Seller", "Buyer"]),
    getFollowers
);
router.get(
    "/following/list",
    protectRoute,
    roleChecker(["Seller", "Buyer"]),
    getFollowing
);
// Follow user/seller
router.post(
    "/follow",
    protectRoute,
    roleChecker(["Seller", "Buyer"]),
    followUser
);
router.post(
    "/unfollow",
    protectRoute,
    roleChecker(["Seller", "Buyer"]),
    unfollowUser
);

export default router;
