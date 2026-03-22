import mongoose from "mongoose";
import contactModel from "../models/contact.model.js";

export const getAllContacts = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            query = {
                $or: [
                    { full_name: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } }
                ]
            }
        }
        const response = await contactModel
                            .find(query)
                            .sort({ createdAt: -1 });
        if (response.length === 0) {
            return res.status(404).json({
                message: "No contact found",
                status: "error"
            });
        }
        return res.status(200).json({
            message: "Successfully fetched contacts",
            status: "success",
            data: response
        });
    } catch (error) {
        console.error("Error fetching constacts:", error);
        return res.status(500).json({ 
            message: "Server error", 
            status: "error" 
        });
    }
}

export const saveContactInfo = async (req, res) => {
    try {
        const { 
            full_name,
            email,
            subject,
            message
         } = req.body;

         if (!full_name || !full_name.trim()) {
            return res.status(400).json({
                message: "Full name is required",
                status: "error"
            });
         }

        if (!email || !email.trim()) {
            return res.status(400).json({
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

        if (!subject || !subject.trim()) {
            return res.status(400).json({
                message: "Subject is required",
                status: "error"
            });
         }

        if (!message || !message.trim()) {
            return res.status(400).json({
                message: "Message is required",
                status: "error"
            });
         }

        const response = await contactModel.create({
            full_name: full_name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            message: message.trim()
        });

        return res.status(201).json({
            message: "Successfully inserted contact info",
            status: "success",
            data: response
        });

    } catch (error) {
        console.error("Error while saving contact info:", error);
        return res.status(500).json({
            message: "Server error",
            status: "error"
        });
    }
}

export const deleteContactInfo = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid contact ID",
                status: "error"
            });
        }
        
        const response = await contactModel.findByIdAndDelete(id);

        if (!response) {
            return res.status(404).json({
                message: "No contact found",
                status: "error"
            });
        }

        return res.status(200).json({
            message: "Successfully deleted contact",
            status: "success"
        });
    } catch (error) {
        console.error("Error deleting contact:", error);
        return res.status(500).json({
            message: "Server error",
            status: "error"
        });
    }
}