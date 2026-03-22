import express from "express";
<<<<<<< HEAD
import { createSlider, deleteSlider, getAllSliders, getSlider, updateSlider } from "../controllers/slider.controller.js";
=======
<<<<<<< HEAD
import { createSlider, getAllSliders } from "../controllers/slider.controller.js";
=======
import { createSlider, deleteSlider, getAllSliders, getSlider, updateSlider } from "../controllers/slider.controller.js";
>>>>>>> amit_dev_lap
>>>>>>> 9283a0506b529cb749bfce52d7f3df25da5469e4
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createUploadMiddleware } from "../middlewares/upload.middleware.js";
const router = express.Router();

const uploadSliderImage = createUploadMiddleware("sliders");
<<<<<<< HEAD

=======
<<<<<<< HEAD
>>>>>>> 9283a0506b529cb749bfce52d7f3df25da5469e4
router.get("/sliders", protect, isAdmin, getAllSliders);

router.post("/create-slider", protect, isAdmin, uploadSliderImage.single("slider_image"), createSlider);
=======

router.get("/sliders", protect, isAdmin, getAllSliders);

router.post("/slider/create", protect, isAdmin, uploadSliderImage.single("slider_image"), createSlider);

router.get("/slider/:id", protect, isAdmin, getSlider);

router.put("/slider/update/:id", protect, isAdmin, uploadSliderImage.single("slider_image"), updateSlider);

router.delete("/slider/delete/:id", protect, isAdmin, deleteSlider);
>>>>>>> amit_dev_lap

router.get("/slider/:id", protect, isAdmin, getSlider);

router.put("/slider/update/:id", protect, isAdmin, uploadSliderImage.single("slider_image"), updateSlider);

router.delete("/slider/delete/:id", protect, isAdmin, deleteSlider);

export default router;