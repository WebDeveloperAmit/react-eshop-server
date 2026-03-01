import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";

export const checkout = async (req, res) => {
  try {
    const { 
      shippingAddress, 
      paymentMethod 
    } = req.body;

    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });
    }

    // const subtotal = cart.products.reduce(
    //   (acc, item) => acc + item.price * item.quantity,
    //   0
    // );

    const subtotal = cart.cartTotal;

    const shipping = 10;
    const total = subtotal + shipping;

    const order = new Order({
      user: req.user.id,
      orderItems: cart.products.map(item => ({
        product: item.productId,
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress,
      paymentMethod,
      subtotal,
      shipping,
      total,
    });

    await order.save();

    cart.products = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};