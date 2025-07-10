import formidable from "formidable";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  const form = formidable({ multiples: true, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ success: false, message: "Form parse error" });

    try {
      // Parse productData JSON string
      const productData = JSON.parse(fields.productData);

      // Handle images (single or multiple)
      let images = files.images;
      if (!images) return res.status(400).json({ success: false, message: "No images uploaded" });

      // Normalize to array
      if (!Array.isArray(images)) images = [images];

      // Upload images to Cloudinary
      const imageUrls = [];
      for (const file of images) {
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: "products",
        });
        imageUrls.push(result.secure_url);

        // Delete temp file
        fs.unlink(file.filepath, () => {});
      }

      // Save to MongoDB
      const product = new Product({
        ...productData,
        images: imageUrls,
      });
      await product.save();

      res.status(201).json({ success: true, message: "Product created", product });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
};
