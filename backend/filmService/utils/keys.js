const bodyParser = require("body-parser");
module.exports = {
  port: process.env.PORT || 5001,
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/FilmRenting",
  jwtSecretKey: process.env.JWT_SECRET_KEY || "secret",
  jwtExpiresIn: 1500,
  bodyParser: bodyParser.urlencoded({ extended: false }),
  bodyParserJSON: bodyParser.json(),
};
