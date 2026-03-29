import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

/*
==================================
ADD TO CART
==================================
*/
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        status: "error",
        message: "Invalid quantity"
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found"
      });
    }

    const price = product.sale_price || product.regular_price;

    let cart = await Cart.findOne({ userId: req.user._id });

    // Create cart if not exists
    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        products: []
      });
    }

    const existingItem = cart.products.find(
      (item) => item.productId.equals(productId)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.products.push({
        productId,
        quantity,
        price: price
      });
    }

    await cart.save();

    return res.status(200).json({
      status: "success",
      message: "Product added to cart",
      data: cart
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }

};

/*
==================================
GET CART
==================================
*/
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id })
                      .populate("products.productId");

    if (!cart) {
      return res.status(200).json({
        status: "success",
        data: []
      });
    }

    return res.status(200).json({
      status: "success",
      data: cart
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};


/*
==================================
REMOVE FROM CART
==================================
*/
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    // cart.products = cart.products.filter(
    //   (item) => item.productId.toString() !== productId
    // );

    cart.products = cart.products.filter(
      (item) => !item.productId.equals(productId)
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      data: cart
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/*
==================================
UPDATE QUANTITY
==================================
*/
export const updateCartQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity"
      });
    }

    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    // const item = cart.products.find(
    //   (item) => item.productId.toString() === productId
    // );

    const item = cart.products.find(
      (item) => item.productId.equals(productId)
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not in cart"
      });
    }

    item.quantity = quantity;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated",
      data: cart
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/*
==================================
CLEAR CART
==================================
*/
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    cart.products = [];
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart cleared",
      data: cart
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};