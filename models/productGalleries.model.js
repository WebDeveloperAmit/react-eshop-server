import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productGalleriesSchema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    image_url: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

export default mongoose.model('ProductGalleries', productGalleriesSchema);