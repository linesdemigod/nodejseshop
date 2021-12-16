const path = require("path");

const express = require("express");

//routes from the products controller
const {
  getProducts,
  getCart,
  postCart,
  getOrders,
  getProductDetails,
  getIndex,
  getCheckout,
  getProduct,
} = require("../controllers/shops");

//const rootDir = require('../util/path');
const router = express.Router();

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/products/:productId", getProduct); //tell not to look for a route but:productId can be anything

router.get("/cart", getCart);

router.post("/cart", postCart); //handle the post request at the product details.

router.get("/orders", getOrders);

router.get("/checkout", getCheckout);

router.get("/product-list", getProductDetails);

module.exports = router;
