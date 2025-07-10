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

export const productList = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Product List Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export const productById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Product By ID Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

export const changeStock = async (req, res) => {
  try {
    const { productId, inStock } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    product.inStock = inStock;
    await product.save();

    return res
      .status(200)
      .json({ success: true, message: "Stock updated successfully" });
  } catch (error) {
    console.error("Change Stock Error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
