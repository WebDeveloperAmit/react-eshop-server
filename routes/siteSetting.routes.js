import express from "express";

import { createOrUpdateSiteInfo } from "../controllers/setting.controller.js";
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

export default router;