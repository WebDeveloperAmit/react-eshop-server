import express from "express";

import {
    addToCart,
    getCart,
    removeFromCart
} from "../controllers/cart.controller.js";

import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/cart/add", protect, isAdmin, addToCart);
router.get("/carts", protect, isAdmin, getCart);
router.delete("/cart/:productId", protect, isAdmin, removeFromCart);

export default router;