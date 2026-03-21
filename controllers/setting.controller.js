<<<<<<< HEAD
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
=======
import fs from 'fs';
import path from 'path';
import SiteSetting from "../models/siteSetting.model.js";

export const createOrUpdateSiteInfo = async (req, res) => {
    try {
        const {
            site_name, 
            site_info, 
            site_mobile_no,
            site_email,
            site_address,
>>>>>>> amit_dev_lap
            facebook_url,
            twitter_url,
            instagram_url,
            linkedin_url,
            youtube_url,
<<<<<<< HEAD
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
=======
            contact_page_heading,
            get_in_touch_content,
            home_page_section_name,
            home_page_section_content
        } = req.body || {};

        if (!site_name || !site_info || !site_mobile_no || !site_email || !site_address || !contact_page_heading || !get_in_touch_content || !home_page_section_name || !home_page_section_content) {

            return res.status(400).json({ 
                message: "All fields are required", 
                status: "error"
            });
        }

        let site_logo_url = null;
        if (req.file) {
            site_logo_url = `uploads/site-settings/${req.file.filename}`;
        }

        const existingSiteInfo = await SiteSetting.findOne();
        if (existingSiteInfo) {
            existingSiteInfo.site_name = site_name;
            existingSiteInfo.site_info = site_info;
            existingSiteInfo.site_mobile_no = site_mobile_no;
            existingSiteInfo.site_email = site_email;
            existingSiteInfo.site_address = site_address;
            existingSiteInfo.facebook_url = facebook_url;
            existingSiteInfo.twitter_url = twitter_url;
            existingSiteInfo.instagram_url = instagram_url;
            existingSiteInfo.linkedin_url = linkedin_url;
            existingSiteInfo.youtube_url = youtube_url;
            existingSiteInfo.contact_page_heading = contact_page_heading;
            existingSiteInfo.get_in_touch_content = get_in_touch_content;
            existingSiteInfo.home_page_section_name = home_page_section_name;
            existingSiteInfo.home_page_section_content = home_page_section_content;

            site_logo_url = existingSiteInfo.site_logo_url;

            if (req.file) {

                if (existingSiteInfo.site_logo_url) {
                    let oldImagePath = path.join(
                        process.cwd(),
                        'public',
                        existingSiteInfo.site_logo_url
                    );
                    
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                site_logo_url = `uploads/site-settings/${req.file.filename}`;
            }

            existingSiteInfo.site_logo_url = site_logo_url;

            await existingSiteInfo.save();

            return res.status(200).json({
                message: "Site info updated successfully",
                status: "success",
                data: existingSiteInfo,
            });

        }

        const siteInfo = new SiteSetting({
            site_name,
            site_logo_url,
            site_info,
            site_mobile_no,
            site_email,
            site_address,
>>>>>>> amit_dev_lap
            facebook_url,
            twitter_url,
            instagram_url,
            linkedin_url,
            youtube_url,
<<<<<<< HEAD
            footer_text
        });
        await siteInfo.save();
        return res.status(200).json({ message: "Site info created successfully", status: "success", site_info: siteInfo });
    } catch (error) {
        console.error("Error creating Site Info:", error);
        return res.status(500).json({ message: "Server Error", status: "error" });
=======
            contact_page_heading,
            get_in_touch_content,
            home_page_section_name,
            home_page_section_content
        });

        await siteInfo.save();

        return res.status(200).json({ 
            message: "Site info created successfully", 
            status: "success", 
            data: siteInfo 
        });

    } catch (error) {
        console.error("Error creating/updating site info:", error);
        return res.status(500).json({ 
            message: "Server Error", 
            status: "error" 
        });
    }
}

export const getSiteSettings = async (req, res) => {
    try {
        const siteInfo = await SiteSetting.find();
        return res.status(200).json({ 
            message: "Site settings fetched successfully", 
            status: "success", 
            data: siteInfo 
        });
    } catch (error) {
        console.error("Error fetching site settings:", error);
        return res.status(500).json({ 
            message: "Server Error", 
            status: "error" 
        });
>>>>>>> amit_dev_lap
    }
}