import User from "../models/User.js";

const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const { userId } = req;

    if (!userId || typeof cartItems !== 'object') {
      return res.status(400).json({
        success: false,
        message: "userId and cartItems are required",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cartItems },
      { new: true } 
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartItems: updatedUser.cartItems,
    });
  } catch (error) {
    console.error("Update Cart Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default updateCart;
