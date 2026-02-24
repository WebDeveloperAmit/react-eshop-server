import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";

export const checkout = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const subtotal = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const shipping = 10; // static shipping
    const total = subtotal + shipping;

    const order = new Order({
      user: req.user.id,
      orderItems: cart.items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shipping,
      total,
    });

    await order.save();

    // Clear cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};