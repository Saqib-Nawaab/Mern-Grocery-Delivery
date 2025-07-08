import ContactMessage from "../models/Conatct.js";

export const contactUs = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Save to DB
    await ContactMessage.create({ name, email, message });

    return res
      .status(200)
      .json({ success: true, message: "Thank you for contacting us!" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
