import express from "express";

import { checkout } from "../controllers/order.controller.js";
import { userProtectMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();


router.post("/place-order", userProtectMiddleware, checkout);

export default router;