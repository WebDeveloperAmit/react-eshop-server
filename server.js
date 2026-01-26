import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
// Database connection
import connectDB from "./config/mongoDB/db.js";

import { errorHandler } from "./middlewares/error.middleware.js";
// Route files
import authRoutes from "./routes/auth/auth.routes.js";
import brandRoutes from "./routes/brand.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import couponRoutes from "./routes/coupon.routes.js";
import productRoutes from "./routes/product.routes.js";
import siteSettingRoutes from "./routes/siteSetting.routes.js";
import sliderRoutes from "./routes/slider.routes.js";

const app = express(); // Initialize Express application

app.use(cors({
  origin: "http://localhost:3000", // allow frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

dotenv.config(); // Load environment variables from a .env file into process.env

connectDB(); // Connect to the MongoDB database

const __filename = fileURLToPath(import.meta.url); // Get the current file path

const __dirname = path.dirname(__filename); // Get the directory name of the current module

// Middleware
app.use("/uploads", express.static(path.join(__dirname, "public/uploads"))); // Serve static files from the 'public' directory

app.use(express.json()); // Middleware to parse JSON bodies, Parses incoming JSON data

app.use(express.urlencoded({ extended: true })); // for form-data / x-www-form-urlencoded

app.use(errorHandler); // Custom error handling middleware

// Mount routers
app.use("/v1/api", brandRoutes); // This line registers a set of routes (endpoints), prefixed with /vi/api
app.use("/v1/api", categoryRoutes);
app.use("/v1/api", productRoutes);
app.use("/v1/api", couponRoutes);
app.use("/v1/api", authRoutes);
app.use("/v1/api", sliderRoutes);
app.use("/v1/api", siteSettingRoutes);

app.get("/", (req, res) => {
    res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { // Start the server and listen on the specified port
    console.log(`Server is running on port ${PORT}`);
});