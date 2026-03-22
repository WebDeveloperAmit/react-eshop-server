import express from "express"; // Import the Express library
<<<<<<< HEAD
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/category.controller.js";
=======
<<<<<<< HEAD
import { createCategory, getAllCategories } from "../controllers/category.controller.js";
=======
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/category.controller.js";
>>>>>>> amit_dev_lap
>>>>>>> 9283a0506b529cb749bfce52d7f3df25da5469e4
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createUploadMiddleware } from "../middlewares/upload.middleware.js";
const router = express.Router(); // Create a new router object / Instance of the Express Router

// Use dynamic folder
const uploadCategoryImage = createUploadMiddleware("categories");

router.get("/categories", protect, isAdmin, getAllCategories); // verifies token, attaches req.user / checks role === "admin"
<<<<<<< HEAD
=======
<<<<<<< HEAD
router.post("/create-category", protect, isAdmin, uploadCategoryImage.single('category_image'), createCategory);
=======
>>>>>>> 9283a0506b529cb749bfce52d7f3df25da5469e4

router.post("/category/create", protect, isAdmin, uploadCategoryImage.single('category_image'), createCategory);

router.get("/category/:id", protect, isAdmin, getCategory);

router.put("/category/update/:id", protect, isAdmin, uploadCategoryImage.single('category_image'), updateCategory);

router.delete("/category/delete/:id", protect, isAdmin, deleteCategory);
<<<<<<< HEAD
=======
>>>>>>> amit_dev_lap
>>>>>>> 9283a0506b529cb749bfce52d7f3df25da5469e4

export default router;