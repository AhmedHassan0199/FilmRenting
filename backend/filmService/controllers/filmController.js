const {
  ALREADY_EXIST,
  BAD_REQUEST,
  AUTHORIZATION_ERROR,
  GOOD_REQUEST,
} = require("../utils/httpCodes");
const keys = require("../utils/keys");
const Film = require("../models/film");

module.exports.addFilm = (req, res) => {
  const filmData = {
    filmTitle: req.body.filmTitle,
    price: req.body.price,
    genre: req.body.genre,
    initialRelease: req.body.initialRelease,
    createdBy: req.body.createdBy,
  };
  Film.create(filmData)
    .then((film) => {
      res.status(GOOD_REQUEST).json({ status: film.filmTitle + "Is added" });
    })
    .catch((err) => {
      res.status(BAD_REQUEST).json({ error: "Something went wrong" });
    });
};
module.exports.Fun2 = (req, res) => {};
