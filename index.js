const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connection = require("./database/database");

// View Engine
app.set('view engine', 'ejs');

// Static
app.use(express.static("public"));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.listen(3030, () => {
  console.log("Server is running");
})