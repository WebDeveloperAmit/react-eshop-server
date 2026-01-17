import express from "express"; // Import the Express library
import { createBrand, deleteBrand, getAllBrands } from "../controllers/brand.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createUploadMiddleware } from "../middlewares/upload.middleware.js";
const router = express.Router(); // Create a new router object / Instance of the Express Router

const uploadBrandImage = createUploadMiddleware("brands");

router.get("/brands", protect, isAdmin, getAllBrands);

router.post("/create-brand", protect, isAdmin, uploadBrandImage.single('brand_image'), createBrand);

router.delete("/brand-delete/:id", protect, isAdmin, deleteBrand);

export default router;