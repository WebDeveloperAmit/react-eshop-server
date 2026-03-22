import express from "express";
<<<<<<< HEAD

import { createOrUpdateSiteInfo, getSiteSettings } from "../controllers/setting.controller.js";
=======
<<<<<<< HEAD
import { createSiteInfo, getAllSiteInfo } from "../controllers/setting.controller.js";
>>>>>>> 9283a0506b529cb749bfce52d7f3df25da5469e4
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createUploadMiddleware } from "../middlewares/upload.middleware.js";

const router = express.Router();

<<<<<<< HEAD
=======
router.get("/site-infos", protect, isAdmin, getAllSiteInfo);
router.post("/create-site-info", protect, isAdmin, createSiteInfo);
=======

import { createOrUpdateSiteInfo, getSiteSettings } from "../controllers/setting.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createUploadMiddleware } from "../middlewares/upload.middleware.js";

const router = express.Router();

>>>>>>> 9283a0506b529cb749bfce52d7f3df25da5469e4
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
<<<<<<< HEAD
=======
>>>>>>> amit_dev_lap
>>>>>>> 9283a0506b529cb749bfce52d7f3df25da5469e4

export default router;