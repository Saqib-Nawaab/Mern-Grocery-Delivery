import express from "express";
import authUser from "../midllewares/authUser.js";
import {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
} from "../controller/addressController.js";

const addressRoutes = express.Router();

addressRoutes.post("/add", authUser, addAddress);
addressRoutes.get("/list", authUser, getAddress);
addressRoutes.put("/update", authUser, updateAddress);
addressRoutes.delete("/delete", deleteAddress);

export default addressRoutes;
