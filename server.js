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
  var note = req.body;
  dbNotes.push(note);
  dbNotes.forEach((item, i) => {
    item.id = i + 1;
  });
  res.json(note);
});

app.delete("/api/notes/:id", function(req, res) {
  var id = dbNotes[req.params.id];
  console.log(req.params.id);
  // // console.log(dbNotes[]);
  for (var a = 0; a < dbNotes.length; a++) {
    // console.log(dbNotes[1]);
    if (dbNotes[a] === id) {
      // console.log(dbNotes[a]);
      return res.json(false);
    }
  }
  return res.json(false);
});

// Setup Server Listening
app.listen(PORT, function() {
  console.log(`App listening on: http://localhost:${PORT}`);
});
