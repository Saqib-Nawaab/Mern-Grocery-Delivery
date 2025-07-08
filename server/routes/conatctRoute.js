import express from "express";
import { contactUs } from "../controller/conatcController.js";

const conatctRoutes = express.Router();

conatctRoutes.post("/", contactUs);

export default conatctRoutes;
