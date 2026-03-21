import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SiteSettingSchema = new Schema({
<<<<<<< HEAD
    contact_heading: {
        type: String,
        required: [true, 'Contact heading is required'],
        trim: true
    },
    contact_sub_heading: {
        type: String,
        required: [true, 'Contact sub heading is required'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },
    address_2: {
        type: String,
        trim: true,
        default: null
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    phone_2: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],  
        trim: true
    },
    email_2: {
        type: String,
        trim: true,
        default: null
    },
=======
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
>>>>>>> amit_dev_lap
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
<<<<<<< HEAD
    footer_text: {
        type: String,
        default: null,
        trim: true
    },

=======
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
>>>>>>> amit_dev_lap
});

export default mongoose.model('SiteSetting', SiteSettingSchema);