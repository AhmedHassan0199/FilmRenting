const mongoose = require('mongoose');
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
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = Films = mongoose.model('film', filmScehema);
