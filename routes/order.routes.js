import express from "express";

import { checkout } from "../controllers/order.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/checkout", protect, isAdmin, checkout);

export default router;