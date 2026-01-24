import path from 'path';
import Product from '../models/product.model.js';
import ProductGalleries from '../models/productGalleries.model.js';

export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: 'desc'});
        // console.log(products);
        return res.status(200).json({
            message: "Product fetched successfully",
            status: "success",
            data: products
        });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        return res.status(500).json({ 
            message: error.message, 
            status: "error" 
        });
    }
}

export const createProduct = async (req, res) => {
    try {
        const { 
            cat_id, 
            brand_id, 
            product_name, 
            short_desc, 
            long_desc, 
            regular_price, 
            sale_price, 
            sku, 
            qty, 
            stock_status, 
            is_featured 
        } = req.body;

        // const thumbnail_image_url = req.file ? `/uploads/products/${req.file.filename}` : null;
        // handle thumbnail image
        // const thumbnail_image_url = req.files && req.files.thumbnail_image
        // ? `/uploads/products/${req.files.thumbnail_image[0].filename}`
        // : null;

        // console.log("Request files:", req.body);

        const thumbnail_image_url = req.files?.thumbnail_image?.[0]
        ? `/uploads/products/${req.files.thumbnail_image[0].filename}`
        : null;

        if (!cat_id || !product_name || !short_desc || !long_desc || !regular_price || !sku || !qty) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newProduct = new Product({
            cat_id,
            brand_id,
            product_name,
            short_desc,
            long_desc,
            regular_price,
            sale_price,
            sku,
            qty,
            stock_status,
            is_featured,
            thumbnail_image_url
        });
        await newProduct.save();

        // if (req.files && req.files.galleryImages && req.files.galleryImages.length > 0) {
        if (req.files?.galleryImages?.length > 0) {
            const galleryImages = req.files.galleryImages.map(file => ({
                product_id: newProduct._id,
                image_url: `/uploads/products/${file.filename}`
            }));
            await ProductGalleries.insertMany(galleryImages);
        }
        return res.status(200).json({ 
            message: "Product created successfully", 
            status: "success", 
            product: newProduct 
        });
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({ 
            message: "Server error", 
            status: "error" 
        });
    }
}

export const editProduct = async (req, res) => {
    try {
        const { proId } = req.params;
        const product = await Product.findById(proId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({
            message: "Product fetched successfully",
            status: "success",
            data: product
        });
    } catch (error) {
        console.error("Product fetch error:", error.message);
        return res.status(500).json({
            message: error.message,
            status: "error"
        });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { proId } = req.params;
        const { 
            cat_id, 
            brand_id, 
            product_name, 
            short_desc, 
            long_desc, 
            regular_price, 
            sale_price, 
            sku, 
            qty, 
            stock_status, 
            is_featured,
            thumbnail_image
        } = req.body;

        

        if (!cat_id) {
            return res.status(400).json({ message: "Category id is required" });
        }

        if (!brand_id) {
            return res.status(400).json({ message: "Brand id is required" });
        }

        if (!product_name || product_name.trim() === '') {
            return res.status(400).json({ message: "Product name is required" });
        }

        if (!short_desc || short_desc.trim() === '') {
            return res.status(400).json({ message: "Short description is required" });
        }

        if (!long_desc || long_desc.trim() === '') {
            return res.status(400).json({ message: "Long description is required" });
        }

        if (!regular_price) {
            return res.status(400).json({ message: "Price is required" });
        }

        if (!sku || sku.trim() === '') {
            return res.status(400).json({ message: "SKU is required" });
        }

        if (!qty) {
            return res.status(400).json({ message: "Quantity is required" });
        }

        if (!thumbnail_image) {
            return res.status(400).json({ message: "Thumbnail image is required" });
        }
        
    } catch (error) {
        console.error("Product update error:", error.message);
        return res.status(500).json({
            message: error.message,
            status: "error"
        });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { proId } = req.params;

        const product = await Product.findById(proId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const productImage = product.thumbnail_image_url;

        if (productImage) {
            const productImagePath = path.join(
                process.cwd(),
                'public',
                product.thumbnail_image_url
            );
            if (fs.existsSync(productImagePath)) {
                fs.unlinkSync(productImagePath);
            }
        }

        /* ------------------ Delete gallery images ------------------ */
        const galleries = await ProductGalleries.find({ product_id: proId });

        for (const gallery of galleries) {
            if (gallery.image_url) {
                const galleryPath = path.join(
                    process.cwd(),
                    "public",
                    gallery.image_url
                );

                if (fs.existsSync(galleryPath)) {
                    fs.unlinkSync(galleryPath);
                }
            }
        }

        /* ------------------ Delete gallery records ------------------ */
        await ProductGalleries.deleteMany({ product_id: proId });

        await Product.findByIdAndDelete(proId);

        return res.status(200).json({
            message: "Product deleted successfully",
            status: "success"
        });
    } catch (error) {
        console.error("Product delete error:", error.message);
        return res.status(500).json({
            message: error.message,
            status: "error"
        });
    }
}

