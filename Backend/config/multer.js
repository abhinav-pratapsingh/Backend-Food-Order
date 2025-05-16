// import multer from "multer";

// // image storage engine

// const storage = multer.diskStorage({
//     destination: 'uploads',
//     filename: (req, file, cb) => {
//         return cb(null, `${Date.now()}${file.originalname}`)

//     }
// });

// const uploadLocal = multer({ storage: storage });

// const upload_middleware = (req,res,next) =>{
//     uploadLocal.single('image')(req, res, (err) => {
//         if (err instanceof multer.MulterError) {
//             return res.status(400).json({ error: 'File upload error: ' + err.message });
//         } else if (err) {
//             return res.status(500).json({ error: 'Server error' });
//         }
//         if (!req.file){
//             return res.status(400).json( {success:false,message:`failed to fecth image`} );
//         }
//         next();
//     });
// }

// export default upload_middleware;

import multer from "multer";
import pkg from "cloudinary";
const { v2: cloudinary } = pkg;
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// 🔹 Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.c_api_key,
  api_secret: process.env.c_api_secret,
});

// 🔹 Setup Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // 🔹 Folder name in Cloudinary
    format: async (req, file) => "png", // 🔹 Convert to PNG (change if needed)
    public_id: (req, file) =>
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname,
  },
});

// 🔹 Setup Multer Middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 🔹 Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP allowed."),
        false
      );
    }
    cb(null, true);
  },
});

// 🔹 Middleware Function
const uploadMiddleware = (req, res, next) => {
  console.log(process.env.c_api_key);
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ success: false, message: `Multer error: ${err.message}` });
    } else if (err) {
      console.error("Upload error:", err);
      return res
        .status(500)
        .json({ success: false, message: `Server error: ${err.message}` });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded." });
    }

    req.imageUrl = req.file.path; // 🔹 Cloudinary URL added to request
    next();
  });
};

export default uploadMiddleware;
