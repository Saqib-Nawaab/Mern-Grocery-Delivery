import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URl)
    .then(() => console.log(" DB is connected"))
    .catch((error) => console.error("Connection error:", error));
};

export default connectDB;
