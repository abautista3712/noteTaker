// Importing Packages
// var http = require("http");
var express = require("express");
// var fs = require("fs");
var path = require("path");

// Setting up Express App and Dynamic Heroku PORT
var app = express();

// Setting up dynamic PORT or Initial Port
var PORT = process.env.PORT || 8080;

// Data Parsing
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data
var dbNotes = require("./db/db");

// HTML Routes
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// API Routes
app.get("/api/notes", function(req, res) {
  return res.json(dbNotes);
});

app.post("/api/notes", function(req, res) {
  var newEntry = req.body;
  console.log(newEntry);
  dbNotes.push(newEntry);
  res.json({ testKey: testValue });
  res.end();
});

// Setup Server Listening
app.listen(PORT, function() {
  console.log(`App listening on: http://localhost:${PORT}`);
});
