import SiteSetting from "../models/siteSetting.model.js";

export const getAllSiteInfo = async (req, res) => {
    try {
        const siteInfo = new SiteSetting.find();
        return res.status(200).json({ message: "Successfully fetching site infos", status: "success", site_info: siteInfo });
    } catch (error) {
        console.error("Error fetching site info:", error);
        return res.status(500).json({ message: "Server Error", status: "error" });
    }
}

export const createSiteInfo = async (req, res) => {
    try {
        const { 
            contact_heading, 
            contact_sub_heading, 
            address,
            address_2,
            phone,
            phone_2,
            email,
            email_2,
            facebook_url,
            twitter_url,
            instagram_url,
            linkedin_url,
            youtube_url,
            footer_text
        } = req.body;

        if (!address || !phone || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const siteInfo = new SiteSetting({
            contact_heading, 
            contact_sub_heading, 
            address,
            address_2,
            phone,
            phone_2,
            email,
            email_2,
            facebook_url,
            twitter_url,
            instagram_url,
            linkedin_url,
            youtube_url,
            footer_text
        });
        await siteInfo.save();
        return res.status(200).json({ message: "Site info created successfully", status: "success", site_info: siteInfo });
    } catch (error) {
        console.error("Error creating Site Info:", error);
        return res.status(500).json({ message: "Server Error", status: "error" });
    }
}