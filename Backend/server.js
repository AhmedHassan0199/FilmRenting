var express = require("express");
var cors = require("cors");
var boydParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
var Imports = require("./globalImports");

var port = Imports.port;
console.log(Imports.MongoURI);
const MongoURI = Imports.MongoURI;
app.use(bodyParser.json());
app.use(cors());
app.use(boydParser.urlencoded({ extended: false }));

//const MongoURI='mongodb+srv://AdminAdmin:2151999619@cluster0.z8tgy.mongodb.net/LoginCredentials?retryWrites=true&w=majority'

mongoose
  .connect(MongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
  });

var Users = require("./Users");

app.use("/users", Users);

app.listen(port, () => {
  console.log("server is running on port : " + port);
});
