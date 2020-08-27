const express = require("express");
const boydParser = require("body-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { port, mongoURI } = require("./utils/keys");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(boydParser.urlencoded({ extended: false }));

//const MongoURI='mongodb+srv://AdminAdmin:2151999619@cluster0.z8tgy.mongodb.net/LoginCredentials?retryWrites=true&w=majority'

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
  });

const userRoutes = require("./Users");

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log("server is running on port : " + port);
});
