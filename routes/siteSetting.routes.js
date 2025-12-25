import express from "express";
import { createSiteInfo, getAllSiteInfo } from "../controllers/setting.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/site-infos", protect, isAdmin, getAllSiteInfo);
router.post("/create-site-info", protect, isAdmin, createSiteInfo);

export default router;