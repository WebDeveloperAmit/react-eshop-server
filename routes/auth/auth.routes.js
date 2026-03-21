import express from "express";
<<<<<<< HEAD
import { loginAdminUser, registerAdminUser } from "../../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", loginAdminUser);
router.post("/register", registerAdminUser);
=======

import { adminProfile, loginAdminUser, registerAdminUser, updateAdminProfile } from "../../controllers/auth.controller.js";
import { isAdmin } from "../../middlewares/admin.middleware.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/admin/login", loginAdminUser);
router.post("/admin/register", registerAdminUser);

router.get("/admin/profile", protect, isAdmin, adminProfile);
router.put("/admin/profile", protect, isAdmin, updateAdminProfile);
>>>>>>> amit_dev_lap

export default router;