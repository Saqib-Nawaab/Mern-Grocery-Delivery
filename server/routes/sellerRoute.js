  import express from "express";
  import {
    sellerLogin,
    sellerAuth,
    sellerLogout,
  } from "../controller/sellerController.js";
  import authSeller from "../midllewares/authSeller.js";

  const sellerRoutes = express.Router();

  sellerRoutes.post("/login" ,sellerLogin);
  sellerRoutes.post("/logout",sellerLogout);
  sellerRoutes.get("/is-auth", sellerAuth );

  export default sellerRoutes;
  