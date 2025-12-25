import mongoose from "mongoose";
import validator from "validator";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    full_name: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email address'
        }
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        unique: true,
        trim: true,
        validate: {
            validator: function (v) {
                return validator.isMobilePhone(v, 'en-IN');
            },
            message: 'Please provide a valid mobile number'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true
    }
}, {
    timestamps: true
});

export default mongoose.model('User', UserSchema);