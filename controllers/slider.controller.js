<<<<<<< HEAD
=======
import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
>>>>>>> amit_dev_lap
import Slider from "../models/slider.model.js";

export const getAllSliders = async (req, res) => {
    try {
<<<<<<< HEAD
        const sliders = await Slider.find().sort({ createdAt: "desc" });
        return res.status(200).json({ message: "Fetching all sliders", status: "success", slider: sliders });
    } catch (error) {
        console.error("Error fetching sliders:", error);
        return res.status(500).json({ message: "Server Error", status: "error" });
=======

        const { search } = req.query;
        let query = {};
        if (search)
        {
            query = {
                $or: [
                    { slider_title: { $regex: search, $options: "i" } },
                    { slider_heading: { $regex: search, $options: "i" } }
                ]
            }
        }

        const sliders = await Slider
                        .find(query)
                        .sort({ 
                            createdAt: "desc" 
                        });
        
        return res.status(200).json({ 
            message: "Successfully fetched sliders", 
            status: "success", 
            data: sliders 
        });
    } catch (error) {
        console.error("Error fetching sliders:", error);
        return res.status(500).json({ 
            message: "Server Error", 
            status: "error" 
        });
>>>>>>> amit_dev_lap
    }
}

export const createSlider = async (req, res) => {
    try {
<<<<<<< HEAD
        const { cat_slug, slider_title, slider_heading, slider_sub_heading } = req.body;
        const slider_image_url = req.file ? `uploads/sliders/${req.file.filename}` : null;
        if (!slider_title || !slider_heading || !slider_sub_heading) {
            return res.status(400).json({ message: "All fields are required" });
        }
=======
        const { 
            cat_slug, 
            slider_title, 
            slider_heading, 
            slider_sub_heading 
        } = req.body;

        const slider_image_url = req.file ? `uploads/sliders/${req.file.filename}` : null;

        if (
            (slider_title !== undefined && !slider_title.trim()) ||
            (slider_heading !== undefined && !slider_heading.trim()) ||
            (slider_sub_heading !== undefined && !slider_sub_heading.trim())
        ) {
            return res.status(400).json({ 
                message: "All fields are required",
                status: "error"
            });
        }

>>>>>>> amit_dev_lap
        const newSlider = new Slider({
            cat_slug,
            slider_title,
            slider_heading,
            slider_sub_heading,
            slider_image_url
        });
        await newSlider.save();
<<<<<<< HEAD
        return res.status(200).json({ message: "Slider created successfully", status: "success", slider: newSlider });
    } catch (error) {
        console.error("Error create sliders:", error);
        return res.status(500).json({ message: "Server Error", status: "error" });
=======

        return res.status(200).json({ 
            message: "Slider created successfully", 
            status: "success", 
            slider: newSlider 
        });
    } catch (error) {
        console.error("Error creating sliders:", error);
        return res.status(500).json({ 
            message: "Server Error", 
            status: "error" 
        });
    }
}

export const getSlider = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID",
                status: "error"
            });
        }

        const slider = await Slider.findById(id);

        if (!slider) {
            return res.status(404).json({ 
                message: "Slider not found",
                status: "error"
            });
        }

        return res.status(200).json({
            message: "Slider fetched successfully",
            status: "success",
            data: slider
        });
    } catch (error) {
        console.error("Error fetching slider:", error);
        return res.status(500).json({ 
            message: "Server Error", 
            status: "error" 
        });
    }
}

export const updateSlider = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID",
                status: "error"
            });
        }

        const { 
            cat_slug, 
            slider_title, 
            slider_heading, 
            slider_sub_heading 
        } = req.body;

        const slider = await Slider.findById(id);

        if (!slider) {
            return res.status(404).json({ 
                message: "Slider not found",
                status: "error"
            });
        }

        if (
            (slider_title !== undefined && !slider_title.trim()) ||
            (slider_heading !== undefined && !slider_heading.trim()) ||
            (slider_sub_heading !== undefined && !slider_sub_heading.trim())
        ) {
            return res.status(400).json({ 
                message: "All fields are required",
                status: "error"
            });
        }

        let slider_image_url = slider.slider_image_url;

        if (req.file) {
            
            if (slider.slider_image_url) {
                const oldImagePath = path.join(
                    process.cwd(),
                    'public',
                    slider.slider_image_url
                );

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            slider_image_url = `uploads/sliders/${req.file.filename}`;
        }

        slider.cat_slug = cat_slug ?? slider.cat_slug;
        slider.slider_title = slider_title ?? slider.slider_title;
        slider.slider_heading = slider_heading ?? slider.slider_heading;
        slider.slider_sub_heading = slider_sub_heading ?? slider.slider_sub_heading;
        slider.slider_image_url = slider_image_url;

        await slider.save();

        return res.status(200).json({ 
            message: "Slider updated successfully", 
            status: "success", 
            data: slider 
        });
    } catch (error) {
        console.error("Error updating slider:", error);
        return res.status(500).json({ 
            message: "Server Error", 
            status: "error" 
        });
    }
}

export const deleteSlider = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID",
                status: "error"
            });
        }

        const slider = await Slider.findById(id);

        if (!slider) {
            return res.status(404).json({ 
                message: "Slider not found", 
                status: "error" 
            });
        }
        if (slider.slider_image_url) {
            const imagePath = path.join(
                process.cwd(), // Get current working directory
                'public', // Assuming 'public' is the folder where uploads are stored
                slider.slider_image_url
            );
            if (fs.existsSync(imagePath)) { // Check if file exists
                fs.unlinkSync(imagePath); // Synchronously delete the file
            }
        }

        await Slider.findByIdAndDelete(id);

        return res.status(200).json({ 
            message: "Slider deleted successfully", 
            status: "success",
        });
    } catch (error) {
        console.error("Error deleting slider:", error);
        return res.status(500).json({ 
            message: "Server Error", 
            status: "error" 
        });
>>>>>>> amit_dev_lap
    }
}