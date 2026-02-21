import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
import SubCategoryModel from "../models/subcategory.model.js";

export const allSubCategories = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            query = {
                $or: [
                    { sub_category_name: { $regex: search, $options: "i" } }
                ]
            };
        }
        
        const subcategories = await SubCategoryModel
                                .find(query)
                                .sort({ createdAt: 'desc'});

        return res.status(200).json({ 
            message: "Successfully fetched sub categories", 
            status: "success", 
            data: subcategories 
        });
    } catch (error) {
        console.error("Error fetching sub categories:", error);
        return res.status(500).json({ 
            message: "Server error", 
            status: "error" 
        });
    }
}

export const createSubCategory = async (req, res) => {
    try {
        const { sub_category_name } = req.body;
        const sub_category_image = req.file;

        if (!sub_category_name || !sub_category_name.trim()) {
            return res.status(400).json({ 
                message: "Sub category name is required",
                status: "error"
            });
        }
        if (!sub_category_image) {
            return res.status(400).json({ 
                message: "Sub category image is required",
                status: "error"
            });
        }
        const imageUrl = `uploads/sub-categories/${sub_category_image.filename}`;

        const newSubCategory = new SubCategoryModel({
            sub_category_name,
            sub_category_image: imageUrl
        });

        await newSubCategory.save();

        return res.status(200).json({ 
            message: "Sub category created successfully", 
            status: "success", 
            category: newSubCategory 
        });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern?.sub_category_name) {
            return res.status(400).json({ 
                message: "Sub category name already exists",
                status: "error"
            });
        }
        console.error("Error creating sub category:", error);
        return res.status(500).json({ 
            message: "Server error", 
            status: "error" 
        });
    }
}

export const getSubCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID",
                status: "error"
            });
        }

        const subcategory = await SubCategoryModel.findById(id);

        if (!subcategory) {
            return res.status(404).json({ 
                message: "Sub category not found",
                status: "error"
            });
        }
        return res.status(200).json({
            message: "Sub category fetched successfully",
            status: "success",
            data: subcategory
        });
    } catch (error) {
        console.error("Error fetching sub category:", error);
        return res.status(500).json({ 
            message: "Server Error", 
            status: "error" 
        });
    }
}

export const updateSubCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID",
                status: "error"
            });
        }

        const { 
            sub_category_name, 
            // sub_category_slug
        } = req.body;

        const subcategory = await SubCategoryModel.findById(id);
        if (!subcategory) {
            return res.status(404).json({ 
                message: "Sub category not found",
                status: "error"
            });
        }

        if (!sub_category_name || sub_category_name.trim() === '') {
            return res.status(400).json({ 
                message: "Sub category name is required",
                status: "error"
            });
        }

        let sub_category_image_url = subcategory.sub_category_image_url;

        if (req.file) {

            if (subcategory.sub_category_image_url) {
                const oldImagePath = path.join(
                    process.cwd(),
                    'public',
                    subcategory.sub_category_image_url
                );

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            } 

            sub_category_image_url = `uploads/sub-categories/${req.file.filename}`;
        }

        subcategory.sub_category_name = sub_category_name ?? subcategory.sub_category_name;
        // subcategory.sub_category_slug = sub_category_slug ?? subcategory.sub_category_slug;
        subcategory.sub_category_image_url = sub_category_image_url ?? subcategory.sub_category_image_url;

        await subcategory.save();

        return res.status(200).json({ 
            message: "Sub category updated successfully", 
            status: "success",
            data: subcategory
        });
    } catch (error) {
        console.error("Error updating sub category:", error);
        return res.status(500).json({ 
            message: "Server error", 
            status: "error" 
        });
    }
}

export const deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID",
                status: "error"
            });
        }

        const subcategory = await SubCategoryModel.findById(id);

        if (!subcategory) {
            return res.status(404).json({ 
                message: "Sub category not found",
                status: "error"
            });
        }

        if (subcategory.sub_category_image_url) {
            const oldImagePath = path.join(
                process.cwd(), // Current working directory
                'public',
                subcategory.sub_category_image_url
            );

            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }
        
        await SubCategoryModel.findByIdAndDelete(id);

        return res.status(200).json({ 
            message: "Sub category deleted successfully", 
            status: "success" 
        });
    } catch (error) {
        console.error("Error deleting sub category:", error);
        return res.status(500).json({ 
            message: "Server error", 
            status: "error" 
        });
    }
}