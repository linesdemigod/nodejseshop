const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

//const rootDir = require('./util/path');

const adminRoutes = require("./routes/admin"); //import admin routes
const shopRoutes = require("./routes/shop");
const { get404 } = require("./controllers/errors");

//express app
const app = express();

//use templating engine
app.set("view engine", "ejs");
app.set("views", "views");

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

//access files statically
app.use(express.static(path.join(__dirname, "public"))); //access css, images, js and other files

app.use("/admin", adminRoutes); //use the admin router
app.use(shopRoutes); //use the shop router

//404 pages
app.use(get404);

//server
app.listen(3000);
