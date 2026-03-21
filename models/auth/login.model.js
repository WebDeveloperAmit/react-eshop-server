import mongoose from "mongoose";
const Schema = mongoose.Schema;

const loginSchema = new Schema({
<<<<<<< HEAD
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true }
=======
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        lowercase: true 
    },
    password: { 
        type: String, 
        required: true 
    }
>>>>>>> amit_dev_lap
}, {
    timestamps: true
});

export default mongoose.model("Login", loginSchema);