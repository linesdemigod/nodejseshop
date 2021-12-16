const Product = require("../models/product"); //import from the model

//render the add admin product
const getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

const postAddProduct = (req, res, next) => {
  //variable to get the responses from the data input by the admin
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(null, title, imageUrl, description, price); //instance of the Product class in the model and pass these as argument
  product.save();
  res.redirect("/"); //redirect to the shop
};

const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; //edit the query
  if (!editMode) {
    return res.redirect("/");
  }

  // Fetch the data
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    // Render the edit page
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

//this update the products
const postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updateTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  //update the product by calling the save method in the product class
  const updatedProduct = new Product(
    prodId,
    updateTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice
  );
  updatedProduct.save(); //save the product
  res.redirect("/admin/products"); //after saving rediirect to admin product
};

//fetch data from the database
const getProduct = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.getAddProduct = getAddProduct;
exports.getProduct = getProduct;
exports.postAddProduct = postAddProduct;
exports.getEditProduct = getEditProduct;
exports.postEditProduct = postEditProduct;
