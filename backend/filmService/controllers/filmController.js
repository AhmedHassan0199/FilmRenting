const {
  ALREADY_EXIST,
  BAD_REQUEST,
  AUTHORIZATION_ERROR,
  GOOD_REQUEST,
} = require("../utils/httpCodes");
const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const Film = require("../models/film");
const User = require("../../userService/models/user");

module.exports.addFilm = (req, res) => {
  console.log("dola");

  const filmData = {
    filmTitle: req.body.filmTitle,
    price: req.body.price,
    genre: req.body.genre,
    initialRelease: req.body.initialRelease,
  };
  const userFound = User.findOne({ filmTitle: filmTitle });
  console.log("userFound", userFound);
  const Validations = joi.object({
    filmTitle: joi.string().required(),
    price: joi.number().required(),
    genre: joi.string().required(),
    initialRelease: joi.date(),
    createdBy: joi.objectId().required(),
  });
  const valid = Validations.validate(filmData);
  console.log(valid);
  if (valid) {
    Film.create(filmData)
      .then((film) => {
        res.status(GOOD_REQUEST).json({ status: film.filmTitle + "Is added" });
      })
      .catch((err) => {
        console.log(err);
        res.status(BAD_REQUEST).json({ error: "Something went wrong" });
      });
  } else {
    res.status(BAD_REQUEST).json({ error: "Something went wrong" });
  }
};
module.exports.getFilms = (req, res) => {
  const films = Film.find({}).then((x) => {
    if (x.length > 0) {
      res.status(GOOD_REQUEST).json(x);
    } else {
      res.status(BAD_REQUEST).json({ error: "Something went wrong" });
    }
  });
};
