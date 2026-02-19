import path from 'path';
import brandModel from '../models/brand.model.js';
import categoryModel from '../models/category.model.js';
import Product from '../models/product.model.js';
import ProductGalleries from '../models/productGalleries.model.js';

export const getAllProduct = async (req, res) => {
    try {
        const { searchTerm } = req.query;
        let query = {};

        if (searchTerm) {
            query = {
                $or: [
                   { product_name: { $regex: searchTerm, $options: "i" } }
                ]
            };
        }

        const products = await Product
                .find(query)
                .sort({ createdAt: 'desc'});

        const categories = await categoryModel.find({});
        const brands = await brandModel.find({});
        const productIds = products.map(p => p._id);
        const galleries = await ProductGalleries.find({
            product_id: { $in: productIds }
        });

        const finalProducts = products.map(product => {

            const productCategory = categories.find(
                c => c._id.toString() === product.category_id?.toString()
            );

            const productBrand = brands.find(
                b => b._id.toString() === product.brand_id?.toString()
            );

            const productGalleries = galleries.filter(
                g => g.product_id.toString() === product._id.toString()
            );

            return {
                ...product.toObject(),
                category_name: productCategory?.category_name || null,
                brand_name: productBrand?.brand_name || null,
                galleries: productGalleries
            };

        });

        return res.status(200).json({
            message: "Product fetched successfully",
            status: "success",
            data: finalProducts
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
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const galleries = await ProductGalleries.find({ product_id: id });

        return res.status(200).json({
            message: "Product fetched successfully",
            status: "success",
            data: product,
            gallery_images: galleries
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
        const { id } = req.params;
        const { 
            cat_id, 
            brand_id, 
            product_name, 
            product_slug,
            short_desc, 
            long_desc, 
            regular_price, 
            sale_price, 
            sku, 
            qty, 
            stock_status, 
            is_featured
        } = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

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

        let thumbnail_image_url = product.thumbnail_image_url;

        if (req.files?.thumbnail_image?.length > 0) {
        // delete old thumbnail
        if (thumbnail_image_url) {
            const oldThumbPath = path.join(process.cwd(), "public", thumbnail_image_url);
            if (fs.existsSync(oldThumbPath)) {
                fs.unlinkSync(oldThumbPath);
            }
        }

            thumbnail_image_url = `/uploads/products/${req.files.thumbnail_image[0].filename}`;
        }

        if (req.files?.galleryImages?.length > 0) {

            const oldGalleries = await ProductGalleries.find({ product_id: id });

            // delete old gallery files
            for (const gallery of oldGalleries) {
                const galleryPath = path.join(process.cwd(), "public", gallery.image_url);
                if (fs.existsSync(galleryPath)) {
                    fs.unlinkSync(galleryPath);
                }
            }

            // delete old gallery records
            await ProductGalleries.deleteMany({ product_id: id });

            // insert new gallery records
            const newGalleries = req.files.galleryImages.map(file => ({
                product_id: product._id,
                image_url: `/uploads/products/${file.filename}`
            }));

            await ProductGalleries.insertMany(newGalleries);
        }

        product.cat_id = cat_id ?? product.cat_id;
        product.brand_id = brand_id ?? product.brand_id;
        product.product_name = product_name ?? product.product_name;
        product.product_slug = product_slug ?? product.product_slug;
        product.short_desc = short_desc ?? product.short_desc;
        product.long_desc = long_desc ?? product.long_desc;
        product.regular_price = regular_price ?? product.regular_price;
        product.sale_price = sale_price ?? product.sale_price;
        product.sku = sku ?? product.sku;
        product.qty = qty ?? product.qty;
        product.stock_status = stock_status ?? product.stock_status;
        product.is_featured = is_featured ?? product.is_featured;
        product.thumbnail_image_url = thumbnail_image_url ?? product.thumbnail_image_url;
        await product.save();

        return res.status(200).json({
            message: "Product updated successfully",
            status: "success",
            data: product
        });
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
        const { id } = req.params;

        const product = await Product.findById(id);
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
        const galleries = await ProductGalleries.find({ product_id: id });

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
        await ProductGalleries.deleteMany({ product_id: id });

        await Product.findByIdAndDelete(id);

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

