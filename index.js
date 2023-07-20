const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

// View Engine
app.set('view engine', 'ejs');

// Static
app.use(express.static("public"));

// Body parser para dados codificados como URL
app.use(bodyParser.urlencoded({ extended: true }));

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