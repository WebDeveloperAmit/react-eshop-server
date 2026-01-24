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

export const getCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = Coupon.findById(id);
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }
        return res.status(200).json({
            message: "Coupon fetched successfully",
            status: "success",
            data: coupon
        });
    } catch (error) {
        console.error("Error coupon fetching...:", error);
        return res.status(500).json({ message: "Server Error", status: "error" });
    }
}

export const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            code, 
            type, 
            discount, 
            expiry_date, 
            usage_limit, 
            used_count, 
            min_purchase 
        } = req.body || {};

        if (!code || code.trim() === "") {
            return res.status(400).json({ message: "Coupon code is required" });
        }

        if (!expiry_date || isNaN(new Date(expiry_date))) {
            return res.status(400).json({ message: "Coupon expire date is required" });
        }

        const coupon = await Coupon.findById(id);

        if (!coupon) {
            return res.status(404).json({ message: "Coupon is not found" });
        }

        coupon.code = code ?? coupon.code;
        coupon.type = type ?? coupon.type;
        coupon.discount = discount ?? coupon.discount;
        coupon.expiry_date = new Date(expiry_date) ?? coupon.expiry_date;
        coupon.usage_limit = Number(usage_limit) ?? coupon.usage_limit;
        coupon.used_count = Number(used_count) ?? coupon.used_count;
        coupon.min_purchase = min_purchase ?? coupon.min_purchase;

        await coupon.save();

        return res.status(200).json({ 
            message: "Coupon successfully updated", 
            status: "success",
            data: coupon
        });
        
    } catch (error) {
        console.error("Coupon update error:", error.message);
        return res.status(500).json({ 
            message: error.message, 
            status: "error" 
        });
    }
}

export const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCoupon = await Coupon.findByIdAndDelete(id);
        if (!deletedCoupon) {
            return res.status(404).json({ 
                message: "Coupon not found" 
            });
        }
        return res.status(200).json({ 
            message: "Coupon deleted successfully", 
            status: "success" 
        });
    } catch (error) {
        console.error("Error deleting coupon:", error);
        return res.status(500).json({ 
            message: "Server error", 
            status: "error" 
        });
    }
}