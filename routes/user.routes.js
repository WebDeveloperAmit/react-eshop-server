import express from "express";
import {
    changePassword,
    getMyOrders,
    getProfile,
    login,
    register,
    updateProfile,
} from "../controllers/auth.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);
router.get("/my-orders", protect, getMyOrders);

export default router;