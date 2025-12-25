import fs from "fs";
import multer from "multer";
import path from "path";

// Allowed file types
const FILE_TYPES = /jpeg|jpg|png|webp|gif/;

/**
 * Reusable Multer upload middleware
 * @param {string} folderName - subfolder under /public/uploads/
 * @returns multer instance
 */
export const createUploadMiddleware = (folderName) => {
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join("public/uploads", folderName);

      // Create folder if it doesn't exist
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },

    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname).toLowerCase();
      const name = file.originalname.replace(ext, "").replace(/\s+/g, "-");
      cb(null, `${name}-${Date.now()}${ext}`);
    }
  });

  const fileFilter = (req, file, cb) => {
    const extname = FILE_TYPES.test(path.extname(file.originalname).toLowerCase());
    const mimetype = FILE_TYPES.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed (jpg, png, webp, gif)"));
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  });

};
