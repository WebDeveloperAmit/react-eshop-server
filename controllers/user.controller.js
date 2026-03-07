import jwt from "jsonwebtoken";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2d" }
  );
};

export const register = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      mobile, 
      password 
    } = req.body;

    const userExists = await User.findOne({
      $or: [
        { email }, 
        { mobile }
      ],
    });

    if (userExists) {
      return res.status(400).json({
        status: "error",
        message: "Email or mobile already registered",
      });
    }

    const user = await User.create({
      name,
      email,
      mobile,
      password,
    });

    const token = generateToken(user);

    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { 
      email, 
      password 
    } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User not found",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Not authorized",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Profile fetched successfully",
      user: req.user,
    });

  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, mobile } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.mobile = mobile || user.mobile;

    await user.save();

    return res.json({
      status: "success",
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        status: "error",
        message: "Current password incorrect",
      });
    }

    user.password = newPassword;
    await user.save();

    return res.json({
      status: "success",
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
                              .sort({ createdAt: "desc" });
    return res.status(200).json({
      status: "success",
      orders,
    });
  } catch (error) {
    console.error("Get My Orders Error:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch orders",
    });
  }
};