import express from "express"; // Import the Express library
import { createProduct, deleteProduct, deleteProductGalleryImage, editProduct, getAllProduct, updateProduct } from "../controllers/product.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createUploadMiddleware } from "../middlewares/upload.middleware.js";
const router = express.Router(); // Create a new router object / Instance of the Express Router

// Use dynamic folder
const uploadProductImage = createUploadMiddleware("products");

router.get("/products", protect, isAdmin, getAllProduct);

router.post(
    "/product/create", 
    protect, 
    isAdmin, 
    uploadProductImage.fields([
        { name: 'thumbnail_image', maxCount: 1 }, // single thumbnail image
        { name: 'galleryImages', maxCount: 10 } // up to 10 gallery images
    ]), 
    createProduct
);

router.get("/product/edit/:id", protect, isAdmin, editProduct);

router.put(
    "/product/update/:id", 
    protect, 
    isAdmin, 
    uploadProductImage.fields([
        { name: 'thumbnail_image', maxCount: 1 }, // single thumbnail image
        { name: 'galleryImages', maxCount: 10 } // up to 10 gallery images
    ]), 
    updateProduct
);

router.delete("/product/delete/:id", protect, isAdmin, deleteProduct);

router.delete("/product/gallery-image/delete/:id", protect, isAdmin, deleteProductGalleryImage);


export default router;