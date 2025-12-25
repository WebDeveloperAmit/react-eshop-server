import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SliderSchema = new Schema({
    cat_slug: {
        type: String,
        required: [true, 'Select a category'],
        trim: true
    },
    slider_title: {
        type: String,
        required: [true, 'Slider title is required'],
        trim: true
    },
    slider_heading: {
        type: String,
        required: [true, 'Slider heading is required'],
        trim: true
    },
    slider_sub_heading: {
        type: String,
        required: [true, 'Slider sub heading is required'],
        trim: true
    },
    slider_image_url: {
        type: String,
        required: [true, 'Slider image is required']
    }
});

export default mongoose.model('Slider', SliderSchema);