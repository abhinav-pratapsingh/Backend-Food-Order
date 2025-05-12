import foodModel from "../models/foodModels.js";
import fs from "fs";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.c_api_key,
  api_secret: process.env.c_api_secret,
});

const addfood = async (req, res) => {
  let image_filename = `${req.imageUrl}`;
  console.log(image_filename);
  const food = new foodModel({
    restroId: req.restroId,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: image_filename,
    category: req.body.category,
  });
  try {
    await food.save();
    res.json({ success: true, message: "success" });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: `failed to save`,
    });
  }
};

const menu = async (req, res) => {
  try {
    console.log(req.body.restroId);
    const data = await foodModel.find({ restroId: req.body.restroId });
    res.json({ success: true, data: data });
  } catch (e) {
    res.json({ success: false, message: `error  ${e}` });
  }
};

const listFood = async (req, res) => {
  try {
    const food = await foodModel.find({ restroId: req.restroId });
    res.json({ success: true, data: food });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: `failed to fecth` });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    // Extract public ID from Cloudinary URL
    const extractPublicId = (url) => {
      const parts = url.split('/upload/')[1];
      const segments = parts.split('/');
      segments.shift(); // Remove version from link
      const filename = segments.pop().split('.')[0]; // Remove extension
      return [...segments, filename].join('/');
    };

    const publicId = extractPublicId(food.image);

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete food item from database
    await foodModel.findByIdAndDelete(food._id);

    res.json({ success: true, message: "Removed food and deleted image from Cloudinary" });
  } catch (e) {
    res.json({ success: false, message: `Failed: ${e.message}` });
  }
};


export { addfood, listFood, removeFood, menu };
