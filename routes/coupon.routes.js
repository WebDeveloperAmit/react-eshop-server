import express from "express"; // Import the Express library
import { createCoupon, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from "../controllers/coupon.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
const router = express.Router(); // Create a new router object / Instance of the Express Router

router.get("/coupons", protect, isAdmin, getAllCoupons); // verifies token, attaches req.user / checks role === "admin"

router.post("/create-coupon", protect, isAdmin, createCoupon);

router.get("/coupon/:id", protect, isAdmin, getCoupon);

router.put("/coupon/update/:id", protect, isAdmin, updateCoupon);

router.delete("/coupon-delete/:id", protect, isAdmin, deleteCoupon);

export default router;