import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SiteSettingSchema = new Schema({
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
    footer_text: {
        type: String,
        default: null,
        trim: true
    },

});

export default mongoose.model('SiteSetting', SiteSettingSchema);