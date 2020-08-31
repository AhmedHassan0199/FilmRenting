const {
  ALREADY_EXIST,
  BAD_REQUEST,
  AUTHORIZATION_ERROR,
  GOOD_REQUEST,
} = require("../utils/httpCodes");
const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const joiAssert = require("joi-assert");
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
module.exports.verifyUser = (req, res) => {
  var Decoded = jwt.verify(req.headers["authorization"], keys.jwtSecretKey);

  User.findOne({
    _id: Decoded._id,
  })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.send("User doesnt exist");
      }
    })
    .catch((err) => {
      res.send("error " + err);
    });
};
