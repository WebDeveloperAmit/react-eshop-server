import mongoose from 'mongoose';
import slugify from 'slugify';
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    cat_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    brand_id: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: [true, 'Brand is required']
    },
    product_name: {
        type: String,
        required: [true, 'Product name is required'],
        unique: true,
        trim: true
    },
    product_slug: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true
    },
    short_desc: {
        type: String,
        required: [true, 'Short description is required']
    },
    long_desc: {
        type: String,
        required: [true, 'Long description is required']
    },
    regular_price: {
        type: Number,
        required: [true, 'Regular price is required']
    },
    sale_price: {
        type: Number,
        default: 0
    },
    sku: {
        type: String,
        required: [true, 'SKU is required'],
        unique: true,
        trim: true
    },
    qty: {
        type: Number,
        required: [true, 'Quantity is required']
    },
    stock_status: {
        type: String,
        enum: ['in-stock', 'out-of-stock'],
        default: 'in-stock'
    },
    is_featured: {
        type: Boolean,
        default: false
    },
    just_arrived: {
        type: Boolean,
        default: false
    },
    is_trendy: {
        type: Boolean,
        default: false
    },
    is_top_selling: {
        type: Boolean,
        default: false
    },
    thumbnail_image_url: {
        type: String,
        required: [true, 'Thumbnail image is required']
    }
}, {
    timestamps: true
});

// Index for unique slug
// ProductSchema.index({ product_slug: 1 }, { unique: true });

// Pre-save hook to auto-generate slug from product_name
ProductSchema.pre('save', function (next) {
    if (this.isModified('product_name')) {
        this.product_slug = slugify(this.product_name, {
            lower: true,
            strict: true // removes special characters
        });
    }
    next();
});

// Export the model
export default mongoose.model('Product', ProductSchema);