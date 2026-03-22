import express from "express"; // Import the Express library
<<<<<<< HEAD
import { createCoupon, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from "../controllers/coupon.controller.js";
=======
<<<<<<< HEAD
import { createCoupon, getAllCoupons } from "../controllers/coupon.controller.js";
=======
import { createCoupon, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from "../controllers/coupon.controller.js";
>>>>>>> amit_dev_lap
>>>>>>> 9283a0506b529cb749bfce52d7f3df25da5469e4
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
const router = express.Router(); // Create a new router object / Instance of the Express Router

router.get("/coupons", protect, isAdmin, getAllCoupons); // verifies token, attaches req.user / checks role === "admin"
<<<<<<< HEAD

router.post("/create-coupon", protect, isAdmin, createCoupon);

=======
<<<<<<< HEAD
router.post("/create-coupon", protect, isAdmin, createCoupon);

=======

router.post("/create-coupon", protect, isAdmin, createCoupon);

>>>>>>> 9283a0506b529cb749bfce52d7f3df25da5469e4
router.get("/coupon/:id", protect, isAdmin, getCoupon);

router.put("/coupon/update/:id", protect, isAdmin, updateCoupon);

router.delete("/coupon-delete/:id", protect, isAdmin, deleteCoupon);

<<<<<<< HEAD
=======
>>>>>>> amit_dev_lap
>>>>>>> 9283a0506b529cb749bfce52d7f3df25da5469e4
export default router;