import express from "express"; // Import the Express library
<<<<<<< HEAD
import { createBrand, getAllBrands } from "../controllers/brand.controller.js";
=======
import { createBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "../controllers/brand.controller.js";
>>>>>>> amit_dev_lap
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createUploadMiddleware } from "../middlewares/upload.middleware.js";
const router = express.Router(); // Create a new router object / Instance of the Express Router

const uploadBrandImage = createUploadMiddleware("brands");

router.get("/brands", protect, isAdmin, getAllBrands);
<<<<<<< HEAD
router.post("/create-brand", protect, isAdmin, uploadBrandImage.single('brand_image'), createBrand);
=======

router.post("/brand/create", protect, isAdmin, uploadBrandImage.single('brand_image'), createBrand);

router.get("/brand/:id",  protect, isAdmin, getBrand);

router.put("/brand/update/:id",  protect, isAdmin, uploadBrandImage.single('brand_image'), updateBrand);

router.delete("/brand/delete/:id", protect, isAdmin, deleteBrand);
>>>>>>> amit_dev_lap

export default router;