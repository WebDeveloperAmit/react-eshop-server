import express from "express";

import { deleteContactInfo, getAllContacts, saveContactInfo } from "../controllers/query.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/admin/contacts", protect, isAdmin, getAllContacts);
router.post("/contact", saveContactInfo); // Public route to save contact info
router.delete("/admin/contact/:id",protect, isAdmin, deleteContactInfo);

export default router;
