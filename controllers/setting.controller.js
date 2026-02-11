import SiteSetting from "../models/siteSetting.model.js";

export const createOrUpdateSiteInfo = async (req, res) => {
    try {
        const { 
            site_name, 
            site_info, 
            site_mobile_no,
            site_email,
            site_address,
            facebook_url,
            twitter_url,
            instagram_url,
            linkedin_url,
            youtube_url,
            contact_page_heading,
            get_in_touch_content,
            home_page_section_name,
            home_page_section_content
        } = req.body || {};

        const site_logo_url = req.file 
        ? `uploads/site-settings/${req.file.filename}` 
        : undefined; // Handle the case when no file is uploaded

        if (!site_name || !site_info | !site_mobile_no || !site_email || !site_address || !contact_page_heading || !get_in_touch_content || !home_page_section_name || !home_page_section_content) {

            return res.status(400).json({ 
                message: "All fields are required", 
                status: "error"
            });
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

            if (site_logo_url) {
                existingSiteInfo.site_logo_url = site_logo_url;
            }

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
            facebook_url,
            twitter_url,
            instagram_url,
            linkedin_url,
            youtube_url,
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
    }
}