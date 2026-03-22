import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
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
      enum: ["Razorpay", "COD"],
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paidAt: Date,
    subtotal: Number,
    shipping: Number,
    total: Number,
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { 
    timestamps: true 
  }
);

export default mongoose.model('Order', orderSchema);