const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const connection = require("./database/database");
const bodyParser = require("body-parser");
const Article = require("./articles/Article");
const Category = require("./categories/Category");

const port = process.env.PORT || 3000;

// View Engine
app.set("view engine", "ejs");
// Static
app.use(express.static("public"));
// Body parser para dados codificados como URL
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", categoriesController);
app.use("/", articlesController);

// Database
connection
  .authenticate()
  .then(() => {
    console.log("Connected successfully!");
  })
  .catch((error) => {
    console.log("Error: " + error);
  });

app.get("/", function (req, res) {
  Article.findAll({
    order: [["id", "DESC"]],
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", { articles: articles, categories: categories });
    });
  });
});

app.get("/:slug", (req, res) => {
  let slug = req.params.slug;
  Article.findOne({
    where: { slug: slug },
  })
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then((categories) => {
          res.render("article", { articles: articles, categories: categories });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  let slug = req.params.slug;
  Category.findOne({
    where: { slug: slug},
    include: [{model: Article}]
  }).then((category) => {
    if (category != undefined) {

      Category.findAll().then(categories => {
        res.render("index", { articles: category.articles, categories: categories});
      });

    }else {
      res.redirect("/")
    }
  }).catch ((err) => {
    res.redirect("/")
  });
});

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
