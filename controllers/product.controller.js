import Product from '../models/product.model.js';
import ProductGalleries from '../models/productGalleries.model.js';

export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: 'desc'});
        console.log(products);
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const createProduct = async (req, res) => {
    try {
        const { cat_id, brand_id, product_name, short_desc, long_desc, regular_price, sale_price, sku, qty, stock_status, is_featured } = req.body;

        // const thumbnail_image_url = req.file ? `/uploads/products/${req.file.filename}` : null;
        // handle thumbnail image
        // const thumbnail_image_url = req.files && req.files.thumbnail_image
        // ? `/uploads/products/${req.files.thumbnail_image[0].filename}`
        // : null;

        console.log("Request files:", req.body);

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
        return res.status(200).json({ message: "Product created successfully", status: "success", product: newProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({ message: "Server error", status: "error" });
    }
}