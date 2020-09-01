const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScehema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 15,
  },
});

module.exports = User = mongoose.model('user', userScehema);
