import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

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

    const user = await userModel.findById(decoded.id).select("-password");

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
  
};
