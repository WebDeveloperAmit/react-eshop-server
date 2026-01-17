import fs from 'fs';
import path from 'path';
import Slider from "../models/slider.model.js";

export const getAllSliders = async (req, res) => {
    try {
        const sliders = await Slider.find().sort({ createdAt: "desc" });
        return res.status(200).json({ message: "Fetching all sliders", status: "success", slider: sliders });
    } catch (error) {
        console.error("Error fetching sliders:", error);
        return res.status(500).json({ message: "Server Error", status: "error" });
    }
}

export const createSlider = async (req, res) => {
    try {
        const { cat_slug, slider_title, slider_heading, slider_sub_heading } = req.body;
        const slider_image_url = req.file ? `uploads/sliders/${req.file.filename}` : null;
        if (!slider_title || !slider_heading || !slider_sub_heading) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newSlider = new Slider({
            cat_slug,
            slider_title,
            slider_heading,
            slider_sub_heading,
            slider_image_url
        });
        await newSlider.save();
        return res.status(200).json({ message: "Slider created successfully", status: "success", slider: newSlider });
    } catch (error) {
        console.error("Error create sliders:", error);
        return res.status(500).json({ message: "Server Error", status: "error" });
    }
}

export const deleteSlider = async (req, res) => {
    try {
        const { id } = req.params;
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
            } else {
                console.warn("Slider image file does not exist:", imagePath);
            }
            // fs.unlink(imagePath, (err) => {
            //     if (err) {
            //         console.error("Error deleting slider image:", err);
            //     }
            // });
        }
        await Slider.findByIdAndDelete(id);
        return res.status(200).json({ 
            message: "Slider deleted successfully", 
            status: "success" 
        });
    } catch (error) {
        console.error("Error deleting slider:", error);
        return res.status(500).json({ 
            message: "Server Error", 
            status: "error" 
        });
    }
}