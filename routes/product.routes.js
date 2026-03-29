import express from "express"; // Import the Express library

import { createProduct, deleteProduct, deleteProductGalleryImage, editProduct, getAllProduct, getSingleProduct, updateProduct } from "../controllers/product.controller.js";

import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

import { createUploadMiddleware } from "../middlewares/upload.middleware.js";

const router = express.Router(); // Create a new router object / Instance of the Express Router

// Use dynamic folder
const uploadProductImage = createUploadMiddleware("products");

// Public routes
router.get("/products", getAllProduct);
router.get("/product/:id", getSingleProduct);


// Admin routes
router.get("/admin/products", protect, isAdmin, getAllProduct);

router.post(
    "/admin/product/create", 
    protect, 
    isAdmin, 
    uploadProductImage.fields([
        { name: 'thumbnail_image', maxCount: 1 }, // single thumbnail image
        { name: 'galleryImages', maxCount: 10 } // up to 10 gallery images
    ]), 
    createProduct
);

router.get("/admin/product/edit/:id", protect, isAdmin, editProduct);

router.put(
    "/admin/product/update/:id", 
    protect, 
    isAdmin, 
    uploadProductImage.fields([
        { name: 'thumbnail_image', maxCount: 1 }, // single thumbnail image
        { name: 'galleryImages', maxCount: 10 } // up to 10 gallery images
    ]), 
    updateProduct
);

router.delete("/admin/product/delete/:id", protect, isAdmin, deleteProduct);

router.delete("/admin/product/gallery-image/delete/:id", protect, isAdmin, deleteProductGalleryImage);

export default router;