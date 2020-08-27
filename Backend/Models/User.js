const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userScehema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
});

module.exports = User = mongoose.model("usersData", userScehema);
