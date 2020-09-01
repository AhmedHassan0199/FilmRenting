module.exports = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/FilmRenting",
  jwtSecretKey: process.env.JWT_SECRET_KEY || "secret",
  jwtExpiresIn: 1500,
};
