import mongoose from 'mongoose';
import slugify from 'slugify';
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category_name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        trim: true
    },
    category_slug: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    }, 
    category_image_url: {
        type: String,
        default: null
    },
}, {
    timestamps: true
});

// Pre-save hook to auto-generate slug from category_name
CategorySchema.pre('save', function (next) {
    if (this.isModified('category_name')) {
        this.category_slug = slugify(this.category_name, {
            lower: true,
            strict: true // removes special characters
        });
    }
    next();
});

export default mongoose.model('Category', CategorySchema);