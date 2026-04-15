import express from "express";

import { checkout, razorpayWebhook, verifyPayment } from "../controllers/order.controller.js";
import { userProtectMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();

router.post("/place-order", userProtectMiddleware, checkout);
router.post("/verify-payment", verifyPayment);
// webhook route (IMPORTANT: raw body)
// router.post("/webhook", razorpayWebhook);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  razorpayWebhook
);

export default router;