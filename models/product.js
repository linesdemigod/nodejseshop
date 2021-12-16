const fs = require("fs");
const path = require("path");
const pathHelper = require("../util/path");

//path for file
const filePath = path.join(pathHelper, "data", "products.json");

//function to get product in the products.json in the data folder
const getProductsFromFile = (calback) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      return calback([]);
    }
    calback(JSON.parse(fileContent));
  });
};

//class of product
class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  //the products
  save() {
    getProductsFromFile((products) => {
      //
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        //update existing products
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this; //this refer to the updated products
        fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString(); //generate random id for each product added
        products.push(this);
        fs.writeFile(filePath, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
    //fs.readFile(filePath, (err, fileContent) => {});
  }

  //fetch all the data
  static fetchAll(calback) {
    getProductsFromFile(calback);
  }

  //fetch data by id
  static findById(id, calback) {
    getProductsFromFile((products) => {
      const product = products.find((prods) => prods.id === id);
      calback(product);
    });
  }
}

module.exports = Product;
