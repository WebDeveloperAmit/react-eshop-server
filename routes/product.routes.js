import express from "express"; // Import the Express library
<<<<<<< HEAD
import { createProduct, getAllProduct } from "../controllers/product.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createUploadMiddleware } from "../middlewares/upload.middleware.js";
=======
import { createProduct, deleteProduct, deleteProductGalleryImage, editProduct, getAllProduct, getSingleProduct, updateProduct } from "../controllers/product.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createUploadMiddleware } from "../middlewares/upload.middleware.js";

>>>>>>> amit_dev_lap
const router = express.Router(); // Create a new router object / Instance of the Express Router

// Use dynamic folder
const uploadProductImage = createUploadMiddleware("products");

<<<<<<< HEAD
router.get("/products", protect, isAdmin, getAllProduct);
router.post(
    "/create-product", 
=======
// Public routes
router.get("/products", getAllProduct);
router.get("/product/:id", getSingleProduct);


// Admin routes
router.get("/admin/products", protect, isAdmin, getAllProduct);

router.post(
    "/admin/product/create", 
>>>>>>> amit_dev_lap
    protect, 
    isAdmin, 
    uploadProductImage.fields([
        { name: 'thumbnail_image', maxCount: 1 }, // single thumbnail image
        { name: 'galleryImages', maxCount: 10 } // up to 10 gallery images
    ]), 
    createProduct
);

<<<<<<< HEAD
=======
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


>>>>>>> amit_dev_lap
export default router;