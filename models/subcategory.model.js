import mongoose from 'mongoose';
import slugify from 'slugify';
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    sub_category_name: {
        type: String,
        required: [true, 'Sub category name is required'],
        unique: true,
        trim: true
    },
    sub_category_slug: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    }, 
    sub_category_image_url: {
        type: String,
        default: null
    },
}, {
    timestamps: true
});

// Pre-save hook to auto-generate slug from sub_category_name
subCategorySchema.pre('save', function (next) {
    if (this.isModified('sub_category_name')) {
        this.sub_category_slug = slugify(this.sub_category_name, {
            lower: true,
            strict: true // removes special characters
        });
    }
    next();
});

export default mongoose.model('SubCategory', subCategorySchema);