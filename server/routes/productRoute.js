import express from "express";
import {
  productList,
  productById,
  changeStock,
  addProduct,
} from "../controller/productController.js";
import authSeller from "../midllewares/authSeller.js";
import  upload  from "../config/multer.js";

 
const productRouter = express.Router();

productRouter.post("/add",authSeller , addProduct);
productRouter.get("/list", productList);
productRouter.get("/:id", productById);
productRouter.post("/stock",authSeller ,changeStock);

export default productRouter;
  