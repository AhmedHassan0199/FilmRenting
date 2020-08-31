const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { port, mongoURI, bodyParser, bodyParserJSON } = require("./utils/keys");

const app = express();

app.use(bodyParserJSON);
app.use(cors());
app.use(helmet());
app.use(bodyParser);

//const MongoURI='mongodb+srv://AdminAdmin:2151999619@cluster0.z8tgy.mongodb.net/LoginCredentials?retryWrites=true&w=majority'

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
  });

const filmRoutes = require("./routes/filmRoutes");

app.use("/films", filmRoutes);

app.listen(port, () => {
  console.log("server is running on port : " + port);
});
