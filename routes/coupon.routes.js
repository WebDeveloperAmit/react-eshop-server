import express from "express"; // Import the Express library
import { createCoupon, getAllCoupons } from "../controllers/coupon.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
const router = express.Router(); // Create a new router object / Instance of the Express Router

router.get("/coupons", protect, isAdmin, getAllCoupons); // verifies token, attaches req.user / checks role === "admin"
router.post("/create-coupon", protect, isAdmin, createCoupon);

export default router;