const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose);
const Schema = mongoose.Schema;

const filmScehema = new Schema({
  filmTitle: {
    type: String,
  },
  price: {
    type: Float,
  },
  genre: {
    type: String,
  },
  initialRelease: {
    type: Date,
  },
  createdBy: {
    type: String,
  },
});

module.exports = Films = mongoose.model("filmData", filmScehema);
