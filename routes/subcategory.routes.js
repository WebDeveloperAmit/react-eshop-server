import express from "express";

import { allSubCategories, createSubCategory, deleteSubCategory, getSubCategory, updateSubCategory } from "../controllers/subcategory.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";


const router = express.Router();

// Use dynamic folder
const uploadSubCategoryImage = createUploadMiddleware("sub-categories");

router.get("/sub-categories", protect, isAdmin, allSubCategories);

router.post("/sub-category/create", protect, isAdmin, uploadSubCategoryImage.single('sub_category_image'), createSubCategory);

router.get("/sub-category/:id", protect, isAdmin, getSubCategory);

router.put("/sub-category/update/:id", protect, isAdmin, uploadSubCategoryImage.single('sub_category_image'), updateSubCategory);

router.delete("/sub-category/delete/:id", protect, isAdmin, deleteSubCategory);

export default router;