import NewsletterModel from "../models/newsletter.model.js";

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

        const response = await NewsletterModel.create({
            name: name.trim(),
            email: email.trim()
        });

        return res.status(201).json({ 
            message: "Successfully inserted", 
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

        if (!mongoose.Types.ObjectId.isvalid(id)) {
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