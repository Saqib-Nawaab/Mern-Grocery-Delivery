import express from "express";
import {
  getAllOrders,
  getOrders,
  placeOrderCOD,
  // placeOrderStripe,
} from "../controller/orderController.js";
import authSeller from "../midllewares/authSeller.js";

import authUser from "../midllewares/authUser.js";

const orderRoutes = express.Router();

orderRoutes.post("/cod", authUser, placeOrderCOD);
// orderRoutes.post("/stripe", authUser, placeOrderStripe);
orderRoutes.get("/user/:userId", authUser, getOrders);
orderRoutes.get("/all", authSeller, getAllOrders);

export default orderRoutes;
