import express from "express";

import { deleteSubscribeNewsletter, getAllSubscribeNewsletter, subscribeNewsletter } from "../controllers/newsletter.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
    "/subscribes", 
    protect, 
    isAdmin, 
    getAllSubscribeNewsletter
);

router.post(
    "/subscribe",
    protect, 
    isAdmin, 
    subscribeNewsletter
);

router.delete(
    "/subscribe/delete/:id",
    protect, 
    isAdmin, 
    deleteSubscribeNewsletter
);

export default router;