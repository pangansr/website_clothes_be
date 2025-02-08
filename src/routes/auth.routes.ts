import express from "express";
import protectRoute from "../middleware/auth/protectRoute";
import {
    loginUser,
    logoutUser,
    newAccessToken,
    registerUser,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protectRoute, logoutUser);
router.get("/refresh", newAccessToken);

export default router;
