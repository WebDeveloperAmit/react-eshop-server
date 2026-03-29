import express from "express";

import {
    addToCart,
    clearCart,
    getCart,
    removeFromCart,
    updateCartQuantity
} from "../controllers/cart.controller.js";

import { userProtectMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();

router.post("/cart", userProtectMiddleware, addToCart);
router.get("/cart", userProtectMiddleware, getCart);
router.delete("/cart/:productId", userProtectMiddleware, removeFromCart);
router.patch("/cart/:productId", userProtectMiddleware, updateCartQuantity);
router.delete("/cart", userProtectMiddleware, clearCart);

export default router;