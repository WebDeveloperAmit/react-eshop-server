import express from "express";
import { loginAdminUser, registerAdminUser } from "../../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", loginAdminUser);
router.post("/register", registerAdminUser);

export default router;