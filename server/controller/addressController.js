import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const { userId } = req;
    

    if (!userId || !address || typeof address !== "object") {
      return res.status(400).json({
        success: false,
        message: "userId and address are required",
      });
    }

    const newAddress = await Address.create({
      ...address,
      userId,
    });

    return res.status(200).json({
      success: true,
      message: "Address added successfully",
      address: newAddress,
    });
  } catch (error) {
    console.error("Add Address Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to add address",
    });
  }
};

export const getAddress = async (req, res) => {
  try {
    const { userId } = req;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const addresses = await Address.find({ userId });

    return res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.error("Get Address Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch address",
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;

    if (!userId || !address) {
      return res.status(400).json({
        success: false,
        message: "userId and updated address are required",
      });
    }

    const updatedAddress = await Address.findOneAndUpdate({ userId }, address, {
      new: true,
    });

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("Update Address Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to update address",
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const deletedAddress = await Address.findOneAndDelete({ userId });

    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      address: deletedAddress,
    });
  } catch (error) {
    console.error("Delete Address Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete address",
    });
  }
};
