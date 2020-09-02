module.exports = {
  port: process.env.PORT || 5001,
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/FilmRenting",
  jwtSecretKey: process.env.JWT_SECRET_KEY || "secret",
  jwtExpiresIn: "1d",
  USER_SERVICE_ENDPOINT:
    process.env.USER_SERVICE_ENDPOINT || "http://localhost:5000",
};
