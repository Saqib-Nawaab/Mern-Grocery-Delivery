import mongoose from "mongoose";
import express from "express";
import authUser from "../midllewares/authUser.js";
import updateCart from "../controller/cartController.js";


const cartRoute = express.Router();

cartRoute.post("/update", authUser, updateCart);


export default cartRoute; 