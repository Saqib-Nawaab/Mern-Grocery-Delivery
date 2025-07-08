import Product from "../models/Product.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

export const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);
    const images = req.files;

    if (!images || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images provided",
      });
    }

    const imageUrls = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });

        fs.unlink(file.path, (err) => {
          if (err) console.error("Failed to delete local file:", err);
        });

        return result.secure_url;
      })
    );

    const product = await Product.create({
      name: productData.name,
      description: productData.description,
      category: productData.category,
      price: productData.price,
      offerPrice: productData.offerPrice,
      images: imageUrls,
    });

    return res.status(200).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add Product Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to add product",
    });
  }
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
