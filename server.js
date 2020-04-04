// Importing Packages
var http = require("http");
var express = require("express");
var fs = require("fs");
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
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// API Routes
app.get("/api/notes", function (req, res) {
  return res.json(dbNotes);
});

app.post("/api/notes", function (req, res) {
  var note = req.body;
  dbNotes.push(note);
  dbNotes.forEach((item, i) => {
    item.id = i;
  });
  res.json(note);
});

app.delete("/api/notes/:id", function (req, res) {
  console.log(`Delete route hit. req.params.id = ${req.params.id}`);
  var indexOfNote = dbNotes.findIndex((index) => index.id === req.params.id);
  dbNotes.splice(indexOfNote, 1);
  res.json(dbNotes);
});

// Setup Server Listening
app.listen(PORT, function () {
  console.log(`App listening on: http://localhost:${PORT}`);
});
