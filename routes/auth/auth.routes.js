import express from "express";

import { adminProfile, loginAdminUser, registerAdminUser, updateAdminProfile } from "../../controllers/auth.controller.js";
import { isAdmin } from "../../middlewares/admin.middleware.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/admin/login", loginAdminUser);
router.post("/admin/register", registerAdminUser);

router.get("/admin/profile", protect, isAdmin, adminProfile);
router.put("/admin/profile", protect, isAdmin, updateAdminProfile);

export default router;