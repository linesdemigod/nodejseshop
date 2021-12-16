const Product = require("../models/product"); //import from the model
const Cart = require("../models/cart"); //import from the model

//get all products
const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All products",
      path: "/products",
    });
  });
};

//get a single product
const getProduct = (req, res, next) => {
  const prodId = req.params.productId; //use params to get parameter of the url and extract the id
  //call the method in the Product class
  Product.findById(prodId, (product) => {
    console.log(product);
    res.render("shop/product-detail", {
      pageTitle: product.title,
      path: "/products",
      product: product,
    });
  });
};

//this is the index route
const getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

const getCart = (req, res, next) => {
  res.render("shop/cart", { pageTitle: "Your cart", path: "/cart" });
};

//handle the forms in the product details
const postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

const getOrders = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Your Orders", path: "/orders" });
};

const getProductDetails = (req, res, next) => {
  res.render("shop/product-detail", {
    pageTitle: "Product",
    path: "/products",
  });
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", { path: "/checkout", pageTitle: "Checkout" });
};

exports.getProducts = getProducts;
exports.getProduct = getProduct;
exports.getIndex = getIndex;
exports.getCart = getCart;
exports.postCart = postCart;
exports.getOrders = getOrders;
exports.getProductDetails = getProductDetails;
exports.getCheckout = getCheckout;
