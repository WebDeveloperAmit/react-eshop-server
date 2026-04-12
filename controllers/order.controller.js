import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";

export const checkout = async (req, res) => {
  try {
    const {
      billingAddress,
      shippingAddress,
      orderItems,
      paymentMethod,
      subtotal,
      shipping,
      total
    } = req.body;


    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Cart is empty"
      });
    }

    // const subtotal = cart.products.reduce(
    //   (acc, item) => acc + item.price * item.quantity,
    //   0
    // );

    // const subtotal = cart.cartTotal;

    // const shipping = 10;
    // const total = subtotal + shipping;

    const order = new Order({
      user: req.user._id,

      orderItems: orderItems.map(item => ({
        product: item.productId || item._id,
        quantity: item.quantity,
        price: item.price
      })),

      billingAddress,
      shippingAddress,

      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "paid" : "pending",
      paidAt: new Date(),
      isPaid: paymentMethod === "COD" ? true : false,

      subtotal,
      shipping,
      total
    });
    await order.save();

    cart.products = [];
    await cart.save();

    if (paymentMethod === "COD") {
      return res.status(201).json({
        status: true,
        message: "Order placed successfully",
        order,
      });
    } else if (paymentMethod === "Razorpay") {

    }

  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
};