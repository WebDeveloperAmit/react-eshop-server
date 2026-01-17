import express from "express"; // Import the Express library
import { createCategory, deleteCategory, getAllCategories } from "../controllers/category.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createUploadMiddleware } from "../middlewares/upload.middleware.js";
const router = express.Router(); // Create a new router object / Instance of the Express Router

// Use dynamic folder
const uploadCategoryImage = createUploadMiddleware("categories");

router.get("/categories", protect, isAdmin, getAllCategories); // verifies token, attaches req.user / checks role === "admin"

router.post("/create-category", protect, isAdmin, uploadCategoryImage.single('category_image'), createCategory);

router.delete("/category-delete/:id", protect, isAdmin, deleteCategory);

export default router;