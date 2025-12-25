import Brand from '../models/brand.model.js';

export const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find().sort({createdAt: "desc"});
        return res.status(200).json({message: "Fetching all brands", status: "success", brand: brands});
    } catch (error) {
        console.error("Error fetching models", error);
        return res.status(500).json({message: "Server Error", status: "error"});
    }
}

export const createBrand = async (req, res) => {
    try {
        const { brand_name } = req.body;
        const brand_image_url = req.file ? `uploads/brands/${req.file.filename}` : null;
        if (!brand_name) {
            return res.status(400).json({message: "Brand name is required"});
        }
        const newBrand = new Brand({
            brand_name,
            brand_image_url
        });
        await newBrand.save();
        return res.status(200).json({message: "Brand created successfully", status: "success", brand: newBrand});
    } catch (error) {
        if (error.code === 11000 && error.keyPattern?.brand_name) {
            return res.status(400).json({message: "Brand name already exists"});
        }
        console.error("Error creating brand:", error);
        return res.status(500).json({message: "Server Error", status: "error"});
    }
}