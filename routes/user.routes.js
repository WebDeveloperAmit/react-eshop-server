import express from "express";
import {
    changePassword,
    getMyOrders,
    getProfile,
    login,
    register,
    updateProfile,
} from "../controllers/user.controller.js";

import { userProtectMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", userProtectMiddleware, getProfile);
router.put("/profile", userProtectMiddleware, updateProfile);
router.put("/change-password", userProtectMiddleware, changePassword);
router.get("/my-orders", userProtectMiddleware, getMyOrders);

export default router;