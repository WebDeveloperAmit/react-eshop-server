import express from "express";

import {
    addToCart,
    clearCart,
    getCart,
    removeFromCart,
    updateCartQuantity
} from "../controllers/cart.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/cart", protect, addToCart);
router.get("/cart", protect, getCart);
router.delete("/cart/:productId", protect, removeFromCart);
router.patch("/cart/:productId", protect, updateCartQuantity);
router.delete("/cart", protect, clearCart);

export default router;