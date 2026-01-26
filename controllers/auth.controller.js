import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminUser from "../models/auth/register.model.js";


export const loginAdminUser  = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await AdminUser.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        //  Create JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        );

        return res.status(200).json({ 
            message: "Login successful", 
            status: "success", 
            token, 
            user 
        });

    } catch (error) {
        console.error("Error logging in admin user:", error);
        return res.status(500).json({ 
            message: "Internal server error", 
            status: "error" 
        });
    }
}

export const registerAdminUser  = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        // Check if user exists
        const userExists = await AdminUser.findOne({email});
        if(userExists) {
            return res.status(400).json({ message: "Email already registered" });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        // Create User
        const newUser = await AdminUser.create({
            name,
            email,
            password: hashedPassword,
            role: "admin"
        });
        return res.status(200).json({message: "Admin user registered successfully", user: newUser});
    } catch (error) {
        console.error("Error registering admin user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
