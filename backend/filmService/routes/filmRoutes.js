const express = require("express");
const { jwtSecretKey } = require("../utils/keys");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
const User = require("../../userService/models/user");
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecretKey;
const films = express.Router();

const filmController = require("../controllers/filmController");
const passport = require("passport");

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    console.log("PAYLOAD:");
    console.log(jwt_payload);
    User.findOne({ _id: jwt_payload.id }, function (err, user) {
      console.log("ERROR : " + err);
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

films.post(
  "/addFilm",
  passport.authenticate("jwt", { sessions: false }),
  filmController.addFilm
);
films.post(
  "/filmList",
  passport.authenticate("jwt", { sessions: false }),
  filmController.getFilms
);

module.exports = films;
