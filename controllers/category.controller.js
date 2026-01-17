import Category from "../models/category.model.js";

// Controller to get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: 'desc'});
        return res.status(200).json({ message: "Fetching all categories", status: "success", data: categories });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({ message: "Server error", status: "error" });
    }
}

// Controller to create a new category
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

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json({ message: "Category deleted successfully", status: "success" });
    } catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).json({ message: "Server error", status: "error" });
    }
}