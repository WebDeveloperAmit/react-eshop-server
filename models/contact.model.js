import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    full_name: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Contact', ContactSchema);