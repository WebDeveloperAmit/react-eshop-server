import mongoose from "mongoose";
import NewsletterModel from "../models/newsletter.model.js";
import { sendEmail } from "../utils/sendEmail.js";

export const getAllSubscribeNewsletter = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } }
                ]
            }
        }
        const response = await NewsletterModel
                            .find(query)
                            .sort({ createAt: -1 });
        if (!response) {
            return res.status(404).json({
                message: "No subscribe found",
                status: "error"
            });
        }
        return res.status(200).json({
            message: "Successfuly fetched",
            status: "success",
            data: response
        });
    } catch (error) {
        console.error("Error fetching subscribe mail:", error);
        return res.status(500).json({
            message: "Server error",
            status: "error"
        });
    }
}

export const subscribeNewsletter = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !name.trim()) {
            return res.status(404).json({
                message: "Name is required",
                status: "error"
            });
        }

        if (!email || !email.trim()) {
            return res.status(404).json({
                message: "Email is required",
                status: "error"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: "Invalid email format", 
                status: "error" 
            });
        }

        const existing = await NewsletterModel.findOne({ email });

        if (existing) {
            return res.status(400).json({
                message: "Email already subscribed",
                status: "error"
            });
        }

        const response = await NewsletterModel.create({
            name: name.trim(),
            email: email.trim()
        });

        const htmlTemplate = `
        <div style="font-family: Arial; padding:20px;">
            <h2>Welcome to Our Store, ${name} 🎉</h2>
            <p>Thank you for subscribing to our newsletter.</p>
            <p>You will now receive:</p>
            <ul>
            <li>Exclusive discounts</li>
            <li>New product updates</li>
            <li>Special offers</li>
            </ul>
            <br/>
            <a href="https://yourwebsite.com" 
            style="background:#000;color:#fff;padding:10px 20px;text-decoration:none;">
            Visit Our Store
            </a>
        </div>
        `;

        await sendEmail(email, "Welcome to Our Store 🎉", htmlTemplate);

        return res.status(201).json({ 
            message: "Successfully subscribed. Check your email!", 
            status: "success",
            data: response
        });

    } catch (error) {
        console.error("Error inserting:", error);
        return res.status(500).json({
            message: "Server error",
            status: "error"
        });
    }
}

export const deleteSubscribeNewsletter = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID",
                status: "error"
            });
        }

        const response = await NewsletterModel.findByIdAndDelete(id);

        if (!response) {
            return res.status(404).json({
                message: "No subscribe found",
                status: "error"
            });
        }

        return res.status(200).json({
            message: "Successfully deleted",
            status: "success"
        });

    } catch (error) {
        console.error("Error deleting:", error);
        return res.status(500).json({
            message: "Server error",
            status: "error"
        });
    }
}