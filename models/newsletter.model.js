import mongoose from "mongoose";
const { Schema } = mongoose;

const newsletterSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true
    }
},
{
    timestamps: true
});

const newsletterModel = mongoose.model("Newsletter", newsletterSchema);

export default newsletterModel;