const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const Schema = mongoose.Schema;

const filmScehema = new Schema({
  filmTitle: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  initialRelease: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: ObjectID,
    required: true,
  },
});

module.exports = Films = mongoose.model("filmData", filmScehema);
