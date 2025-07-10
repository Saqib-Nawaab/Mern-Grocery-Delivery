import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDb from "./config/DB.js";
import userRoutes from "./routes/userRoute.js";
import sellerRoutes from "./routes/sellerRoute.js";
import connectCloudinary from "./config/Cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import addressRoutes from "./routes/addressRoute.js";
import orderRoutes from "./routes/orderRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true , origin:["https://mern-grocery-delivery-client.vercel.app"]}));

connectDb();
connectCloudinary();

app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRoute);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(port, () => {
  console.log(`Server started at: http://localhost:${port}`);
});
