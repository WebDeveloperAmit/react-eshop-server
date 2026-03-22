import jwt from "jsonwebtoken";
<<<<<<< HEAD

export const protect = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Contains user id
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
  
=======
import AdminUser from "../models/auth/register.model.js";

export const protect = async (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "No token provided",
      status: "error"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AdminUser.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "User not found",
        status: "error"
      });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({ 
      message: err.message,
      status: "error" 
    });
  }
  
  
>>>>>>> amit_dev_lap
};
