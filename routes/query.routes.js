import express from "express";

import { deleteContactInfo, getAllContacts, saveContactInfo } from "../controllers/query.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
    "/contacts", 
    protect, 
    isAdmin, 
    getAllContacts
);

router.post(
    "/contact",
    protect, 
    isAdmin, 
    saveContactInfo
);

router.delete(
    "/contact/delete/:id",
    protect, 
    isAdmin, 
    deleteContactInfo
);

export default router;
