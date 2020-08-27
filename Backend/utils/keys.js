module.exports = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.PORT || 'mongodb://localhost:27017/LoginCredentials',
  jwtSecretKey: process.env.JWT_SECRET_KEY || 'secret',
};
