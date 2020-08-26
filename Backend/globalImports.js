var port = 5000;
var MongoURI = "mongodb://localhost:27017/LoginCredentials";
process.env.SECRET_KEY = "secret";
module.exports = {
  port: port,
  MongoURI: MongoURI,
};
