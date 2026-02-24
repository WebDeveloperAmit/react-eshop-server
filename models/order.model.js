import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        price: Number,
      },
    ],
    shippingAddress: {
      firstName: String,
      lastName: String,
      email: String,
      mobile: String,
      address1: String,
      address2: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
    },
    paymentMethod: {
      type: String,
      enum: ["Paypal", "Direct Check", "Bank Transfer"],
    },
    subtotal: Number,
    shipping: Number,
    total: Number,
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);