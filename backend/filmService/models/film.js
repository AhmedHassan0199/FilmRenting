const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const Schema = mongoose.Schema;

const filmScehema = new Schema({
  filmTitle: {
    type: String,
  },
  price: {
    type: Number,
  },
  genre: {
    type: String,
  },
  initialRelease: {
    type: Date,
  },
  createdBy: {
    type: ObjectID,
  },
});

module.exports = Films = mongoose.model("filmData", filmScehema);
