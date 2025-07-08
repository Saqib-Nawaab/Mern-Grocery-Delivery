import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const validEmail = process.env.SELLER_EMAIL;
    const validPassword = process.env.SELLER_PASSWORD;

    if (email !== validEmail || password !== validPassword) {
      res.clearCookie("sellerToken");
      return res.status(400).json({
        success: false,
        message: "Invalid seller credentials",
      });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({
      success: true,
      message: "Seller logged in successfully",
    });
  } catch (error) {
    console.error("Seller Login Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const sellerLogout = async (req, res) => {
  try {
    res
      .clearCookie("sellerToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      })
      .status(200)
      .json({
        success: true,
        message: "Seller logged out successfully",
      });
  } catch (error) {
    console.error("Seller Logout Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const sellerAuth = async (req, res) => {
   try {
    const token = req.cookies.sellerToken;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.email === process.env.SELLER_EMAIL) {
      return res.status(200).json({ success: true, seller: true });
    } else {
      return res.status(403).json({ success: false, message: "Unauthorized seller" });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
