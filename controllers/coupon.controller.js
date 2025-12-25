import Coupon from "../models/coupon.model.js";

export const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find().sort({ createdAt: 'desc' });
        return res.status(200).json({ message: "Fetching all coupons", status: "success", coupon: coupons });
    } catch (error) {
        console.error("Error fetching coupons:", error);
        return res.status(500).json({ message: "Server error", status: "error" });
    }
}
  
export const createCoupon = async (req, res) => {
    try {
        // Logic to create a new coupon
        const { code, type, discount, expiry_date, usage_limit, min_purchase } = req.body;

        if (!code || !type || !discount || !expiry_date || !usage_limit || !min_purchase) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newCoupon = new Coupon({
            code,
            type,
            discount,   
            expiry_date,
            usage_limit,
            min_purchase
        });
        await newCoupon.save();
        return res.status(200).json({ message: "Coupon created successfully", status: "success", coupon: newCoupon });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern?.code) {
            return res.status(400).json({ message: "Coupon code already exists" });
        }
        console.error("Error creating coupon:", error);
        return res.status(500).json({ message: "Server error", status: "error" });
    }
}