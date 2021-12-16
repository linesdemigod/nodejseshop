const path = require("path");
const express = require("express");

//root dir
const rootDir = require("../util/path");
const {
  getAddProduct,
  postAddProduct,
  getProduct,
  getEditProduct,
  postEditProduct,
} = require("../controllers/admins");

//express router
const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", getAddProduct);

// /admin/productS => GET
router.get("/products", getProduct);

// /admin/add-product => POST
router.post("/add-product", postAddProduct);

// /admin/edit-product => GET
router.get("/edit-product/:productId", getEditProduct);

// /admin/edit-product => POST
router.post("/edit-product", postEditProduct);

module.exports = router; // export the route
