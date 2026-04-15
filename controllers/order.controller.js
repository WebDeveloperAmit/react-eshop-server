import crypto from "crypto";
import { razorpay } from "../config/razorpay.js";
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
      paymentStatus: "pending",
      subtotal,
      shipping,
      total
    });
    await order.save();

    if (paymentMethod === "COD") {

      order.paymentStatus = "paid";
      order.isPaid = true;
      order.paidAt = new Date();

      await order.save();

      cart.products = [];
      await cart.save();

      return res.status(201).json({
        status: true,
        message: "Order placed successfully",
        order,
      });
    } 
    
    if (paymentMethod === "Razorpay") {

      const razorpayOrder = await razorpay.orders.create({
        amount: total * 100, // paise
        currency: "INR",
        receipt: order._id.toString(),
      });

      // store razorpayOrderId
      order.razorpayOrderId = razorpayOrder.id;
      await order.save();

      return res.status(200).json({
        status: true,
        razorpayOrder,
        orderId: order._id,
      });
      
    }

  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        status: false,
        message: "Missing payment data"
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        status: false,
        message: "Invalid signature"
      });
    }

    // Update Order
    const order = await Order.findOne({
      razorpayOrderId: razorpay_order_id
    });

    if (!order) {
      return res.status(404).json({
        status: false,
        message: "Order not found"
      });
    }

    if (order.isPaid) {
      return res.status(200).json({
        status: true,
        message: "Already paid"
      });
    }

    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    order.paymentStatus = "paid";
    order.isPaid = true;
    order.paidAt = new Date();

    await order.save();

    // clear cart
    const cart = await Cart.findOne({ userId: order.user });

    if (cart) {
      cart.products = [];
      await cart.save();
    }

    return res.status(200).json({
      status: true,
      message: "Payment verified successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
};


export const razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(req.body) // RAW BODY
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).send("Invalid webhook signature");
    }

    const event = JSON.parse(req.body.toString());

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      const order = await Order.findOne({
        razorpayOrderId: payment.order_id
      });

      if (order && !order.isPaid) {
        order.razorpayPaymentId = payment.id;
        order.paymentStatus = "paid";
        order.isPaid = true;
        order.paidAt = new Date();

        await order.save();

        const cart = await Cart.findOne({ userId: order.user });

        if (cart) {
          cart.products = [];
          await cart.save();
        }
      }
    }

    res.status(200).json({ status: "ok" });

  } catch (error) {
    console.error("WEBHOOK ERROR:", error);
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
};


// export const razorpayWebhook = async (req, res) => {

//   try {
//     const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

//     const signature = req.headers["x-razorpay-signature"];

//     const expectedSignature = crypto
//       .createHmac("sha256", secret)
//       .update(JSON.stringify(req.body))
//       .digest("hex");

//     if (signature !== expectedSignature) {
//       return res.status(400).send("Invalid webhook signature");
//     }

//     // const event = req.body;
//     const event = JSON.parse(req.body.toString());

//     if (event.event === "payment.captured") {
//       const payment = event.payload.payment.entity;

//       const order = await Order.findOne({
//         razorpayOrderId: payment.order_id
//       });

//       if (order && !order.isPaid) {
//         order.razorpayPaymentId = payment.id;
//         order.paymentStatus = "paid";
//         order.isPaid = true;
//         order.paidAt = new Date();

//         await order.save();

//         const cart = await Cart.findOne({ userId: order.user });

//         if (cart) {
//           cart.products = [];
//           await cart.save();
//         }
//       }
//     }

//     res.status(200).json({ status: "ok" });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       message: error.message
//     });
//   }
// };