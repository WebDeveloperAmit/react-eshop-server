import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminUser from "../models/auth/register.model.js";

<<<<<<< HEAD

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
<<<<<<< HEAD
=======
        return res.status(500).json({ message: "Internal server error", status: "error" });
=======
export const loginAdminUser  = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ 
                message: "Email and password are required",
                status: "error"
            });
        }

        const user = await AdminUser.findOne({ 
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(401).json({ 
                message: "Invalid email or password",
                status: "error"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ 
                message: "Invalid email or password",
                status: "error"
            });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET not defined");
        }

        //  Create JWT token
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN || '1d'}
        );

        return res.status(200).json({ 
            message: "Login successful", 
            status: "success", 
            token, 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            } 
        });

    } catch (error) {
        console.error("Error logging in admin user:", error);
>>>>>>> 9283a0506b529cb749bfce52d7f3df25da5469e4
        return res.status(500).json({ 
            message: "Internal server error", 
            status: "error" 
        });
<<<<<<< HEAD
=======
>>>>>>> amit_dev_lap
>>>>>>> 9283a0506b529cb749bfce52d7f3df25da5469e4
    }
}

export const registerAdminUser  = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if(!name || !email || !password) {
<<<<<<< HEAD
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        // Check if user exists
        const userExists = await AdminUser.findOne({email});
        if(userExists) {
            return res.status(400).json({ message: "Email already registered" });
        }
=======
            return res.status(400).json({ 
                message: "Please fill all the fields",
                status: "error"
            });
        }

        // Check if user exists
        const userExists = await AdminUser.findOne({ email });
        if(userExists) {
            return res.status(400).json({ 
                message: "Email already registered",
                status: "error"
            });
        }

>>>>>>> amit_dev_lap
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        // Create User
        const newUser = await AdminUser.create({
            name,
            email,
            password: hashedPassword,
            role: "admin"
        });
<<<<<<< HEAD
        return res.status(200).json({message: "Admin user registered successfully", user: newUser});
    } catch (error) {
        console.error("Error registering admin user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
=======
        return res.status(200).json({ 
            message: "Admin user registered successfully",
            status: "success",
            user: newUser
        });
    } catch (error) {
        console.error("Error registering admin user:", error);
        return res.status(500).json({ 
            message: "Internal server error",
            status: "error"
        });
    }
}

export const adminProfile = async (req, res) => {
  try {

    const user = await AdminUser
                    .findById(req.user._id)
                    .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Admin not found",
        status: "error"
      });
    }

    return res.status(200).json({
        message: "Successfully fetched admin detail",
        status: "success",
        user
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      status: "error"
    });
  }
};

export const updateAdminProfile = async (req, res) => {
    try {
        const adminId = req.user._id; // from auth middleware

        const { 
            name, 
            email, 
            oldPassword, 
            newPassword, 
            confirmPassword 
        } = req.body;

        const admin = await AdminUser.findById(adminId);

        if (!admin) {
            return res.status(404).json({
                message: "Admin not found",
                status: "error"
            });
        }

        // Update name
        if (name) {
            admin.name = name;
        }

        // Update email
        if (email) {
            const existingEmail = await AdminUser.findOne({
                email: email.toLowerCase(),
                _id: { $ne: adminId }
            });

            if (existingEmail) {
                return res.status(400).json({
                    message: "Email already in use",
                    status: "error"
                });
            }

            admin.email = email.toLowerCase();
        }

        // Update password (if provided)
        if (oldPassword || newPassword || confirmPassword) {

            if (!oldPassword || !newPassword || !confirmPassword) {
                return res.status(400).json({
                    message: "All password fields are required",
                    status: "error"
                });
            }

            const isMatch = await bcrypt.compare(oldPassword, admin.password);

            if (!isMatch) {
                return res.status(401).json({
                    message: "Old password is incorrect",
                    status: "error"
                });
            }

            if (newPassword !== confirmPassword) {
                return res.status(400).json({
                    message: "New passwords do not match",
                    status: "error"
                });
            }

            const salt = await bcrypt.genSalt(12);
            admin.password = await bcrypt.hash(newPassword, salt);
        }

        await admin.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            status: "success",
            user: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (error) {
        console.error("Error updating admin profile:", error);
        return res.status(500).json({
            message: "Internal server error",
            status: "error"
        });
    }
};
>>>>>>> amit_dev_lap
