import express from "express";
import { createSlider, getAllSliders } from "../controllers/slider.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createUploadMiddleware } from "../middlewares/upload.middleware.js";
const router = express.Router();

const uploadSliderImage = createUploadMiddleware("sliders");
router.get("/sliders", protect, isAdmin, getAllSliders);
router.post("/create-slider", protect, isAdmin, uploadSliderImage.single("slider_image"), createSlider);

export default router;