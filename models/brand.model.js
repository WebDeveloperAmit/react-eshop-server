import mongoose from 'mongoose';
import slugify from 'slugify';
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    brand_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    brand_slug: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    brand_image_url: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

// Index for unique slug
// BrandSchema.index({ brand_slug: 1 }, { unique: true });

// Pre-save hook to auto-generate slug from brand_name
BrandSchema.pre('save', function (next) {
    if (this.isModified('brand_name')) {
        this.brand_slug = slugify(this.brand_name, {
            lower: true,
            strict: true // removes special characters
        });
    }
    next();
});

export default mongoose.model('Brand', BrandSchema);