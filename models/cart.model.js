import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartSchema = new Schema({
<<<<<<< HEAD
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1, min: 1 },
            price: { type: Number },
            total: { type: Number }
        },
    ],
=======
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
        unique: true
    },
    products: [
        {
            productId: { 
                type: Schema.Types.ObjectId, 
                ref: 'Product',
                required: true
            },
            quantity: { 
                type: Number, 
                default: 1, 
                min: 1,
                required: true
            },
            price: { 
                type: Number,
                required: true,
            }
        },
    ],
    cartTotal: {
        type: Number,
        default: 0
    }
>>>>>>> amit_dev_lap
}, {
    timestamps: true
});

<<<<<<< HEAD
// pre('save') means: "Before we save a cart to the database, run this function first."
cartSchema.pre('save', function(next) {
  this.products.forEach(p => {
    p.total = p.quantity * p.price;
  });

  next(); // next(); After all calculations are done, this tells Mongoose: “Okay, I’m done. Go ahead and save this cart to the database now.”
});

=======
cartSchema.pre('save', function(next) {

  let total = 0;

  this.products.forEach(p => {
    total += p.quantity * p.price;
  });

  this.cartTotal = total;

  next();
});

// pre('save') means: "Before we save a cart to the database, run this function first."
// cartSchema.pre('save', function(next) {
//   this.products.forEach(p => {
//     p.total = p.quantity * p.price;
//   });

//   next(); // next(); After all calculations are done, this tells Mongoose: “Okay, I’m done. Go ahead and save this cart to the database now.”
// });

>>>>>>> amit_dev_lap
export default mongoose.model('Cart', cartSchema);