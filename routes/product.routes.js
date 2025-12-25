import express from "express"; // Import the Express library
import { createProduct, getAllProduct } from "../controllers/product.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createUploadMiddleware } from "../middlewares/upload.middleware.js";
const router = express.Router(); // Create a new router object / Instance of the Express Router

// Use dynamic folder
const uploadProductImage = createUploadMiddleware("products");

router.get("/products", protect, isAdmin, getAllProduct);
router.post(
    "/create-product", 
    protect, 
    isAdmin, 
    uploadProductImage.fields([
        { name: 'thumbnail_image', maxCount: 1 }, // single thumbnail image
        { name: 'galleryImages', maxCount: 10 } // up to 10 gallery images
    ]), 
    createProduct
);

export default router;