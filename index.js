const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const connection = require("./database/database");
const bodyParser = require("body-parser");
const Article  = require("./articles/Article");
const Category = require("./categories/Category");

const port = process.env.PORT || 3000;

// View Engine
app.set('view engine', 'ejs');
// Static
app.use(express.static("public"));
// Body parser para dados codificados como URL
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", categoriesController);
app.use("/", articlesController);

// Database
connection.authenticate()
  .then(() => {
    console.log("Connected successfully!");
  }).catch((error) => {
    console.log("Error: " + error);
  });

app.get("/", function(req, res){
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});