import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1, min: 1 },
            price: { type: Number },
            total: { type: Number }
        },
    ],
}, {
    timestamps: true
});

// pre('save') means: "Before we save a cart to the database, run this function first."
cartSchema.pre('save', function(next) {
  this.products.forEach(p => {
    p.total = p.quantity * p.price;
  });

  next(); // next(); After all calculations are done, this tells Mongoose: “Okay, I’m done. Go ahead and save this cart to the database now.”
});

export default mongoose.model('Cart', cartSchema);