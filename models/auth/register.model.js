import mongoose from "mongoose";
const Schema = mongoose.Schema;

const registerSchema = new Schema({
<<<<<<< HEAD
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" }
=======
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
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
    },
    role: { 
        type: String, 
        enum: ["admin", "user"], 
        default: "user" 
    }
>>>>>>> amit_dev_lap
}, {
    timestamps: true
});

export default mongoose.model("AdminUser", registerSchema);