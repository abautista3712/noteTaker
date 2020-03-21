// Importing Packages
var http = require("http");
var fs = require("fs");

// Setting up Express App and Dynamic Heroku PORT
var app = express();

// Setting up dynamic PORT or Initial Port
var PORT = process.event.PORT || 8080;

// Data Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data
// Data goes here

// Routing
