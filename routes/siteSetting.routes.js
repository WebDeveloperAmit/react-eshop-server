import express from "express";
<<<<<<< HEAD
import { createSiteInfo, getAllSiteInfo } from "../controllers/setting.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/site-infos", protect, isAdmin, getAllSiteInfo);
router.post("/create-site-info", protect, isAdmin, createSiteInfo);
=======

import { createOrUpdateSiteInfo, getSiteSettings } from "../controllers/setting.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createUploadMiddleware } from "../middlewares/upload.middleware.js";

const router = express.Router();

const uploadSiteLogo = createUploadMiddleware("site-settings");

router.post(
    "/site-settings", 
    protect, 
    isAdmin, 
    uploadSiteLogo.single('site_logo'), 
    createOrUpdateSiteInfo
);

router.get(
    '/site-settings',
    protect, 
    isAdmin,
    getSiteSettings
);
>>>>>>> amit_dev_lap

export default router;