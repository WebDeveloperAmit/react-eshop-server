import express from "express";

import { deleteSubscribeNewsletter, getAllSubscribeNewsletter, subscribeNewsletter } from "../controllers/newsletter.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/admin/subscribes", protect, isAdmin, getAllSubscribeNewsletter);
router.post("/subscribe", subscribeNewsletter); // Public route for subscribing to the newsletter
router.delete("/admin/subscribe/:id", protect, isAdmin, deleteSubscribeNewsletter);

export default router;