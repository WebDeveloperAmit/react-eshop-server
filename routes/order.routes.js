import express from "express";

import { checkout } from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/checkout", protect, checkout);

export default router;