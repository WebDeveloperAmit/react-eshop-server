import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SiteSettingSchema = new Schema({
    site_name: {
        type: String,
        trim: true
    },
    site_logo_url: {
        type: String,
        required: [true, 'Site logo is required'],
    },
    site_info: {
        type: String,
        trim: true
    },
    site_mobile_no: {
        type: String,
        required: [true, 'Site mobile number is required'],
        trim: true,
    },
    site_email: {
        type: String,
        required: [true, 'Site email is required'],
        trim: true
    },
    site_address: {
        type: String,
        required: [true, 'Site address is required'],
        trim: true
    },
    facebook_url: {
        type: String,
        trim: true,
        default: null
    },
    twitter_url: {
        type: String,
        trim: true,
        default: null
    },
    instagram_url: {
        type: String,
        trim: true,
        default: null
    },
    linkedin_url: {
        type: String,
        trim: true,
        default: null
    },
    youtube_url: {
        type: String,
        trim: true,
        default: null
    },
    contact_page_heading: {
        type: String,
        required: [true, 'Contact page heading is required'],
        trim: true
    },
    get_in_touch_content: {
        type: String,
        required: [true, 'Get in touch content is required'],
        trim: true
    },
    home_page_section_name: {
        type: String,
        required: [true, 'Home page section name is required'],
        trim: true
    },
    home_page_section_content: {
        type: String,
        required: [true, 'Home page section content is required'],
        trim: true
    },
}, { 
    timestamps: true 
});

export default mongoose.model('SiteSetting', SiteSettingSchema);