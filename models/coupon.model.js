import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
    code: {
        type: String,
        required: [true, 'Coupon code is required'],
        unique: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['fixed', 'percentage'],
        required: [true, 'Coupon type is required'],
        default: 'fixed'
    },
    discount: {
        type: Number,
        required: [true, 'Discount amount is required'],
        default: 0
    },
    expiry_date: {
        type: Date,
        required: [true, 'Expiry date is required']
    },
    usage_limit: {
        type: Number,
        default: null
    },
    used_count: {
        type: Number,
        default: 0
    },
    min_purchase: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.model('Coupon', CouponSchema);