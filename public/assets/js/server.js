// Importing Packages
var http = require("http");
var express = require("express");
var path = require("path");

// Setting up Express App and Dynamic Heroku PORT
var app = express();

// Setting up dynamic PORT or Initial Port
var PORT = process.env.PORT || 8080;

// Data Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data
// Data goes here

// HTML Routes
// module.exports = function(app) {
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "../../notes.html"));
});
// };

app.listen(PORT, function() {
  console.log(`App listening on PORT: ${PORT}`);
});
