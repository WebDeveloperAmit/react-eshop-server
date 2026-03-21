import express from "express"; // Import the Express library
<<<<<<< HEAD
import { createCategory, getAllCategories } from "../controllers/category.controller.js";
=======
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/category.controller.js";
>>>>>>> amit_dev_lap
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createUploadMiddleware } from "../middlewares/upload.middleware.js";
const router = express.Router(); // Create a new router object / Instance of the Express Router

// Use dynamic folder
const uploadCategoryImage = createUploadMiddleware("categories");

router.get("/categories", protect, isAdmin, getAllCategories); // verifies token, attaches req.user / checks role === "admin"
<<<<<<< HEAD
router.post("/create-category", protect, isAdmin, uploadCategoryImage.single('category_image'), createCategory);
=======

router.post("/category/create", protect, isAdmin, uploadCategoryImage.single('category_image'), createCategory);

router.get("/category/:id", protect, isAdmin, getCategory);

router.put("/category/update/:id", protect, isAdmin, uploadCategoryImage.single('category_image'), updateCategory);

router.delete("/category/delete/:id", protect, isAdmin, deleteCategory);
>>>>>>> amit_dev_lap

export default router;