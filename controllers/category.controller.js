import fs from 'fs';
import path from 'path';
import Category from "../models/category.model.js";

// All categories
export const getAllCategories = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            query = {
                $or: [
                    { category_name: { $regex: search, $options: "i" } }
                ]
            };
        }
        const categories = await Category
        .find(query)
        .sort({ createdAt: 'desc'});

        return res.status(200).json({ 
            message: "Fetching all categories", 
            status: "success", 
            data: categories 
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({ 
            message: "Server error", 
            status: "error" 
        });
    }
}

// Create new category
export const createCategory = async (req, res) => {
    try {
        const { category_name } = req.body;
        const category_image = req.file;
        if (!category_name) {
            return res.status(400).json({ message: "Category name is required" });
        }
        if (!category_image) {
            return res.status(400).json({ message: "Category image is required" });
        }
        const imageUrl = `uploads/categories/${category_image.filename}`;
        const newCategory = new Category({
            category_name,
            category_image_url: imageUrl
        });
        await newCategory.save();
        return res.status(200).json({ message: "Category created successfully", status: "success", category: newCategory });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern?.category_name) {
            return res.status(400).json({ message: "Category name already exists" });
        }
        console.error("Error creating category:", error);
        return res.status(500).json({ message: "Server error", status: "error" });
    }

}

// Get single category
export const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json({
            message: "Category fetched successfully",
            status: "success",
            data: category
        });
    } catch (error) {
        console.error("Error category fetching...:", error);
        return res.status(500).json({ message: "Server Error", status: "error" });
    }
}

// Update category
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            category_name, 
            category_slug
        } = req.body;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        if (!category_name || category_name.trim() === '') {
            return res.status(400).json({ message: "Category name is required" });
        }

        let category_image_url = category.category_image_url;

        if (req.file) {

            if (category.category_image_url) {
                const oldImagePath = path.join(
                    process.cwd(),
                    'public',
                    category.category_image_url
                );

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            } 

            category_image_url = `uploads/categories/${req.file.filename}`;
        }

        category.category_name = category_name ?? category.category_name;
        category.category_slug = category_slug ?? category.category_slug;
        category.category_image_url = category_image_url ?? category.category_image_url;
        await category.save();

        return res.status(200).json({ 
            message: "Category updated successfully", 
            status: "success",
            data: category
        });
    } catch (error) {
        console.error("Category update error:", error.message);
        return res.status(500).json({ 
            message: error.message, 
            status: "error" 
        });
    }
}

// Delete category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params; 
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ 
                message: "Category not found" 
            });
        }
        if (category.category_image_url) {
            const imagePath = path.join(
                process.cwd(),
                'public',
                category.category_image_url
            );
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            } else {
                console.warn("Image file does not exist:", imagePath);
            }
            
        } else {
            console.warn("No category image found");
        }
        await Category.findByIdAndDelete(id);
        return res.status(200).json({ 
            message: "Category deleted successfully", 
            status: "success" 
        });
    } catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).json({ 
            message: "Server error", 
            status: "error" 
        });
    }

}