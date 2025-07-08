import express from "express";
import {
  logoutUser,
  registerUser,
  checkAuth,
  loginUser,
  sendRestOtp,
  verifyOtp,
  resetPassword,
} from "../controller/userController.js";
import authUser from "../midllewares/authUser.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/logout", authUser, logoutUser);
userRoutes.get("/is-auth", authUser, checkAuth);
userRoutes.post("/send-rest-otp", sendRestOtp);
userRoutes.post("/verify-otp", verifyOtp);
userRoutes.post("/reset-password", resetPassword);

export default userRoutes;
