import express from "express";
import {
    changePassword,
    getAllUsers,
    getMyOrders,
    getProfile,
    login,
    register,
    updateProfile,
} from "../controllers/user.controller.js";

import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { userProtectMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", userProtectMiddleware, getProfile);
router.put("/profile", userProtectMiddleware, updateProfile);
router.put("/change-password", userProtectMiddleware, changePassword);
router.get("/my-orders", userProtectMiddleware, getMyOrders);

// Admin route
router.get("/admin/users", protect, isAdmin, getAllUsers);

export default router;