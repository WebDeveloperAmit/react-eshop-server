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