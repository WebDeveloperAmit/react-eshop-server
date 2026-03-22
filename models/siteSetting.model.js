import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SiteSettingSchema = new Schema({
<<<<<<< HEAD
    site_name: {
=======
<<<<<<< HEAD
    contact_heading: {
>>>>>>> 9283a0506b529cb749bfce52d7f3df25da5469e4
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
<<<<<<< HEAD
=======
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
>>>>>>> 9283a0506b529cb749bfce52d7f3df25da5469e4
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
    contact_page_heading: {
=======
<<<<<<< HEAD
    footer_text: {
>>>>>>> 9283a0506b529cb749bfce52d7f3df25da5469e4
        type: String,
        required: [true, 'Contact page heading is required'],
        trim: true
    },
<<<<<<< HEAD
=======

=======
    contact_page_heading: {
        type: String,
        required: [true, 'Contact page heading is required'],
        trim: true
    },
>>>>>>> 9283a0506b529cb749bfce52d7f3df25da5469e4
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
<<<<<<< HEAD
=======
>>>>>>> amit_dev_lap
>>>>>>> 9283a0506b529cb749bfce52d7f3df25da5469e4
});

export default mongoose.model('SiteSetting', SiteSettingSchema);